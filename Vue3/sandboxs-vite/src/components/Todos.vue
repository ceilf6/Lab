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
        <!-- checkbox 是设置了背景图 ⭕️ ，然后设置了本体完全透明（点击仍是本体处理 -->
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{ completed: todo.completed }"
            v-for="todo in filteredTodoRef"
            :key="todo.id"
          >
            <!-- li 自带类样式 completed -->
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label>{{ todo.title }}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li>
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ remainingRef }}</strong>
          <span>item{{ remainingRef === 1 ? "" : "s" }} left</span>
          <!-- 小细节，是否复数 s -->
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: filterRef === 'all' }"> All </a>
          </li>
          <li>
            <a href="#/active" :class="{ selected: filterRef === 'active' }">
              Active
            </a>
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: filterRef === 'completed' }"
            >
              Completed
            </a>
          </li>
        </ul>
        <!-- 是否显示 clear 取决于 是否有完成任务，变化频繁用 v-show -->
        <button class="clear-completed" v-show="completedRef > 0">
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import { useNewTodo, useTodoList, useFilter } from "../compositions";

export default {
  setup() {
    const { todoRef } = useTodoList();
    return {
      // todoRef: todoList.todoRef,
      todoRef,
      ...useNewTodo(todoRef),
      ...useFilter(todoRef),
    };
  },
};
</script>

<style></style>
