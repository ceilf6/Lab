import  { type Filter, filters } from '../types/todos'
import './FilterItem.css'

interface FilterItemProps {
    filter: Filter,
    setFilter(newFilter: Filter): void
}

export default function FilterItem(props: FilterItemProps) {
    const {filter,setFilter} = props

    const handleClick = (newFilter: Filter) => {
        setFilter(newFilter)
    }

  return (
    <>
    {/* <ul> */}
      {filters.map(item => {
        return (
            // <li key={item}>
                <button onClick={() => handleClick(item)} className={filter===item ?"active":''}>
                    {item}
                </button>
            // </li>
        )
      })}
    {/* </ul> */}
    </>
  )
}
