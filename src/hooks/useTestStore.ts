import { create } from 'zustand'

type Answers = Map<number, string>

type TestStore = {
  answers: Answers
  setAnswer: (id: number, value: string) => void
  getAnswer: (id: number) => string | null
  resetAnswers: () => void
  getResult: () => Record<string, number>
}

export const useTestStore = create<TestStore>((set, get) => ({
  answers: new Map(),

  setAnswer: (id, value) => {
    set((state) => {
      const currentValue = state.answers.get(id)
      return { answers: currentValue !== value ? new Map([...state.answers, [id, value]]) : state.answers }
    })
  },

  getAnswer: (id: number) => {
    return get().answers.get(id) ?? null
  },

  resetAnswers: () => set({ answers: new Map() }),

  getResult: () => {
    const result: Record<string, number> = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 }

    get().answers.forEach((value) => {
      if (result[value] !== undefined) {
        result[value] += 1
      }
    })

    return result
  }
}))
