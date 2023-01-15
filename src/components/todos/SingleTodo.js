import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

//React Icons
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios';
import TodoEdit from './TodoEdit';

export default function SingleTodo(props) {
  const { currentUser } = useAuth()
  
  const [showEdit, setShowEdit] = useState(false);
  const deleteTodo = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.todo.name}?`)) {
      axios.delete(`https://localhost:7298/api/ToDos/${id}`).then(() => {
        props.getTodos()
      })
    }
  }


  return (
    <div className='singleTodo col-md-5 m-4'>
      {/* Edit/Delete Conditionally rendered */}
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div>
          <button id='editLink' onClick={() =>  setShowEdit(true)} >
            <FaEdit />
          </button>
          <button id='deleteLink' onClick={() => deleteTodo(props.todo.toDoId)}>
            <FaTrashAlt />
            <iSoTrashBinSharp />
          </button>
          {showEdit &&
            <TodoEdit 
              todo={props.todo}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getTodos={props.getTodos} />
          }
        </div>
      }
        <h3>{props.todo.name}</h3>
        <div className='notes col-md-10 offset-1'>
          <h4>Notes: </h4>
          {props.todo.description !== null ?
              <p>{props.todo.description}</p> :
              <p>No Notes Provided</p>
          }
        </div>
        <div id='complete'>
          {!props.todo.done ? 
              <p>Not Completed</p> :
              <p>Completed</p>
          }
        </div>
    </div>
  )
}
