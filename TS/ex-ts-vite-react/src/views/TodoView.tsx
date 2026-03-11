import { useTodoData } from '../hooks/useTodoData'
import ItemList from '../components/ItemList'
import AddItem from '../components/AddItem'
import FilterItem from '../components/FilterItem'

export default function TodoView() {
    const {
        // todos,
        deleteTodo,
        toggleTodo,
        addTodo,
        filterTodos,
        filter,
        setFilter
    } = useTodoData()

  return (
    <div>
      <h1>TodoView</h1>
      <AddItem onAdd={addTodo}>添加事项</AddItem>
      <ItemList todos={filterTodos()} onDel={deleteTodo} onToggle={toggleTodo}>
        <h2>代办列表</h2>
      </ItemList>
      <FilterItem filter={filter} setFilter={setFilter}></FilterItem>
    </div>
  )
}
