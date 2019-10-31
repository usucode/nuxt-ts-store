<template>
  <div>
    <h1>TodoList</h1>
    <div class="container">
      <input v-model="todoName" type="text" />
      <button @click="addMutation">AddMutation</button>
      <button @click="addAction">AddAction</button>
    </div>
    <ul>
      <li
        v-for="(todo, i) in todos"
        :key="i"
        @click="done(todo.id)"
        :class="{ '-done': todo.done }"
      >
        {{ todo.id }} {{ todo.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'nuxt-property-decorator'
import { State, Mutation, Action } from 'vuex-class'
import { Todo } from '~/types'
@Component({})
export default class extends Vue {
  @Provide() currentId: number = 0
  @State todos!: Todo[]
  @Mutation('setTodos') setTodos: any
  @Mutation('doneTodos') doneTodos: any
  @Action('addTodo') addTodo: any
  @Action('doneTodo') doneTodo: any
  @Provide() todoName: string = ''
  private addMutation(): void {
    if (!this.todoName) return
    this.setTodos(this.todos.concat(this.todo))
    this.todoName = ''
  }
  private addAction(): void {
    if (!this.todoName) return
    this.addTodo(this.todo)
    this.todoName = ''
  }
  private done(id: number): void {
    this.doneTodos(id)
  }
  private get todo(): Todo {
    return {
      id: this.currentId++,
      name: this.todoName,
      done: false,
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
.container {
  margin: 16px auto;
  padding: 16px;
  background: lightslategray;
}
.-done {
  text-decoration: line-through;
  color: gray;
}
</style>