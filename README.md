<div align="center">
  <h2>Infer zustand store type</h2>
  <h4>This package only provides type definitions and does not interfere with zustand at runtime</h4>
</div>

---

According to zustand documentation, it's [impossible](https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md) to infer the store type implicitly.

`zustand-types` utilizes an unconventional technique to correctly infer the store type both within and outside the store function. This method works perfectly under freshly released TypeScript 5, even in strict mode.

## Installation

```bash
npm install -D zustand-types
```

```bash
yarn add -D zustand-types
```

## Most use cases

Extract a store as a named function and provide `SetState<typeof MyStore>` type. That's it!

```typescript
import {create} from "zustand"
import {SetState} from "zustand-types"

function MyStore(set: SetState<typeof MyStore>) {
  return {
    pets: [] as string[],
    // state: correctly inferred
    addPet: (pet: string) => set((state) => [...state.pets, pet]),
  }
}

// useStore: correctly inferred
export const useStore = create(MyStore)
```

## Complete type signature

In case you need two other parameters, `get` and `store`, their types are also provided.

```typescript
import {create} from "zustand"
import {SetState, GetState, Store} from "zustand-types"

function MyStore(
  set: SetState<typeof MyStore>,
  get: GetState<typeof MyStore>,
  store: Store<typeof MyStore>,
) {
  const state = get()
  const unsubscribe = store.subscribe((state) => {})
  return {
    //...
  }
}

export const useStore = create(MyStore)
```

## Slice pattern

Slice pattern is a way to [split your big store into multiple stores](https://github.com/pmndrs/zustand/blob/e489a63513509b62d33e5580d5541680dbcbffb9/docs/guides/slices-pattern.md).

`zustand-types` provides a single type `StoreArgs` that captures all three arguments .

```typescript
import {create} from "zustand"
import {StoreArgs} from "../src"

// Option A
function Store1(...args: StoreArgs<typeof Store1>) {
  const [set] = args
  return {
    x: 1,
    setX: (x: number) => set({x}),
  }
}

// Option B
function Store2(set: SetState<typeof Store2>, ...args: any[]) {
  return {
    y: 1,
    setY: (y: number) => set({y}),
  }
}

function Combined(...args: StoreArgs<typeof Combined>) {
  const state1 = Store1(...args)
  const state2 = Store2(...args)
  // Each slice state must be assigned to a variable, otherwise `Combined` return type will become implicit `any`.
  return {...state1, ...state2}
}

export const useStore = create(Combined)
```
