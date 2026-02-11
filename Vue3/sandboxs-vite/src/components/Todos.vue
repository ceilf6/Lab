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
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          :checked="allDoneRef"
          @input="setAllChecked($event.target.checked)"
        />
        <!-- 事件源（checkbox）的勾选状态，true/false -->
        <!-- checkbox 是设置了背景图 ⭕️ ，然后设置了本体完全透明（点击仍是本体处理 -->
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{ completed: todo.completed, editing: todo === nowEditing }"
            v-for="todo in filteredTodoRef"
            :key="todo.id"
          >
            <!-- li 自带类样式 completed 和 editing -->
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="() => handleDBLClick(todo)">{{
                todo.title
              }}</label>
              <!-- double left click -->
              <button class="destroy"></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="todo.title"
              @blue="doneEdit"
              @keyup.enter="doneEdit"
              @keyup.escape="() => cancelEdit(todo)"
            />
            <!-- 双向绑定之后，todoRef 变化 => 自动执行监控副作用 todoStorage.saveTodos -->
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
import {
  useNewTodo,
  useTodoList,
  useFilter,
  useEditTodo,
} from "../compositions";

export default {
  setup() {
    const { todoRef } = useTodoList();
    return {
      // todoRef: todoList.todoRef,
      todoRef,
      ...useNewTodo(todoRef),
      ...useFilter(todoRef),
      ...useEditTodo(todoRef),
    };
  },
};
</script>

<style></style>
