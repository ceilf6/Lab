<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
        />
        <!-- 通过 enter 修饰符，当回车时 -->
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li class="todo">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>composition api demo</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li>
          <li class="todo">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>写简历</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li>
          <li class="todo">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>下午3点参加面试</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li>
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>3</strong>
          <span>items left</span>
        </span>
        <ul class="filters">
          <li><a href="#/all" class="selected">All</a></li>
          <li><a href="#/active" class="">Active</a></li>
          <li><a href="#/completed" class="">Completed</a></li>
        </ul>
        <button class="clear-completed" style="display: none">
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import { useNewTodo, useTodoList } from "./compositions";

export default {
  setup() {
    const { todoRef } = useTodoList();
    return {
      // todoRef: todoList.todoRef,
      todoRef,
      ...useNewTodo(todoRef),
    };
  },
};
</script>

<style></style>
