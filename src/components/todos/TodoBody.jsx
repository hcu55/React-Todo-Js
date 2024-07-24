import React from 'react'
import TodoItem from './TodoItem';

const TodoBody = ( {todos} ) => {
    return (
        <ul className='px-0 my-8'>
            {/* li태그를 todos 배열의 요소만큼 렌더링 */}
            {todos.map(todo => <TodoItem todo={todo} key={todo.id}  />)}
        </ul>
    )
}

export default TodoBody