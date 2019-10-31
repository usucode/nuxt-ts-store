import { MutationTree, ActionTree, ActionContext } from 'vuex'
import { Context as AppContext } from '@nuxt/types'
import { RootState, Person, Todo } from '~/types'
import localRandomData from '~/static/random-data.json'

export const state = (): RootState => ({
  people: [],
  todos: [],
})

export const mutations: MutationTree<RootState> = {
  setPeople(state: RootState, people: Person[]): void {
    state.people = people
  },
  setTodos(state: RootState, todos: Todo[]): void {
    state.todos = todos
  },
  doneTodos(state: RootState, id: number): void {
    state.todos.map(todo => {
      if (todo.id === id) todo.done = !todo.done
      return todo
    })
  },
}

export interface Actions<S, R> extends ActionTree<S, R> {
  addTodo(context: ActionContext<S, R>, todo: Todo): void
  doneTodo(context: ActionContext<S, R>, id: number): void
}

export const actions: Actions<RootState, RootState> = {
  addTodo({ commit, state }, todo) {
    const newTodos = state.todos.concat(todo)
    commit('setTodos', newTodos)
  },
  doneTodo({ commit, state }, id) {
    const newTodos = state.todos.map(todo => {
      if (todo.id === id) todo.done = !todo.done
      return todo.done
    })
    commit('setTodos', newTodos)
  },
}

// interface Actions<S, R> extends ActionTree<S, R> {
//   nuxtServerInit(
//     actionContext: ActionContext<S, R>,
//     appContext: AppContext
//   ): void
// }

// export const actions: Actions<RootState, RootState> = {
//   async nuxtServerInit({ commit }, context) {
//     let people: Person[] = []

//     // If you serve the site statically with `nuxt generate`, you can't use HTTP requests for local
//     people = context.isStatic
//       ? localRandomData
//       : await context.app.$axios.$get('./random-data.json')

//     commit('setPeople', people.slice(0, 10))
//   },
// }
