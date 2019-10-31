import { Person, Todo } from '~/types'

export interface RootState {
  people: Person[]
  todos: Todo[]
}
