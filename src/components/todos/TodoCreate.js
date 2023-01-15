import React from 'react'
import TodoForm from './TodoForm'

export default function TodoCreate(props) {
  return (
    <article className="createTodo m-2 text-white justify-content-center">
        <TodoForm getTodos={props.getTodos} setShowCreate={props.setShowCreate} />
    </article>
  )
}
