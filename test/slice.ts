import {create, UseBoundStore, StoreApi} from "zustand"
import {StoreArgs} from "../src"

function Store1(...args: StoreArgs<typeof Store1>) {
  const [set] = args
  return {
    x: 1,
    setX: (x: number) => set({x}),
  }
}

function Store2(...args: StoreArgs<typeof Store2>) {
  const [set] = args
  return {
    y: 1,
    setY: (y: number) => set({y}),
  }
}

interface CombinedState {
  x: number
  y: number
  setX: (x: number) => void
  setY: (y: number) => void
}

function Combined(...args: StoreArgs<typeof Combined>) {
  const state1 = Store1(...args)
  const state2 = Store2(...args)
  return {...state1, ...state2}
}

export const useStore: UseBoundStore<StoreApi<CombinedState>> = create(Combined)
