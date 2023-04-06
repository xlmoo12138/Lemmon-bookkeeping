import { create } from 'zustand'
import type { FormError } from '../lib/validate'
import { time } from '../lib/time'

type Data = Item

type CreateItem = {
  data: Partial<Data>
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  setError: (error: Partial<FormError<Data>>) => void
}
export const useCreateItemStore = create<CreateItem>((set, get) => {
  return {
    data: {
      kind: 'expenses',
      tag_ids: [],
      happen_at: time().format(),
      amount: 0
    },
    error: {
      data: [],
      tag_ids: [],
      happen_at: [],
      amount: []
    },
    setData: (data: Partial<Data>) => {
      set(state => (
        {
          ...state,
          data: {
            ...state.data,
            ...data
          }
        }
      ))
    },
    setError: (error: Partial<FormError<Data>>) => {
      set(state => (
        {
          ...state,
          error: {
            ...error
          }
        }
      ))
    }
  }
})
