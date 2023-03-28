import {create, UseBoundStore, StoreApi} from "zustand"
import {GetState, SetState, Store} from "../src"

interface MyStoreState {
  count: number
  increment: () => void
  setCount: (count: number) => void
}

function MyStore(
  set: SetState<typeof MyStore>,
  get: GetState<typeof MyStore>,
  store: Store<typeof MyStore>,
) {
  const state: MyStoreState = get()
  const unsubscribe = store.subscribe((state: MyStoreState) => state)
  return {
    count: 1,
    increment: () => set(({count}) => ({count: count + 1})),
    setCount: (count: number) => set({count}),
  }
}

export const useStore: UseBoundStore<StoreApi<MyStoreState>> = create(MyStore)
