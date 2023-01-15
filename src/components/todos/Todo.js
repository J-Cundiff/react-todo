import React, { useState, useEffect } from 'react'
import './Todo.css'
import axios from 'axios'
import { Container } from 'react-bootstrap';
import SingleTodo from './SingleTodo'
import FilterCat from './FilterCat'
import { useAuth } from '../../context/AuthContext'
import TodoCreate from './TodoCreate';


export default function Todos() {
  const [todos, setTodos] = useState([]);

  const { currentUser } = useAuth()
  const [showCreate, setShowCreate] = useState(false);

  const [filter, setFilter] = useState(0);

  const getTodos = () => {
    axios.get(`https://localhost:7298/api/ToDos`).then(response => {
      console.log(response)
      setTodos(response.data)
    })
  }

  useEffect(() => {
    getTodos()
  }, []);

  return (
    <section className='todo'>
      <article className="dashboard p-5">
        <h1 className='text-center'>ToDo Dashboard</h1>
      </article>
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="createContainer p-2 mb-3 text-center col-md-6 offset-3">
            <button className="btn btn-info" onClick={() => setShowCreate(!showCreate)}>
              {!showCreate ? 'Create New ToDo' : 'Close Form'}
            </button>
          <div>
            {showCreate &&  
              <TodoCreate getTodos={getTodos} setShowCreate={setShowCreate} />
            }
          </div>
        </div>

      }
      <FilterCat setFilter={setFilter} />
      <Container>
        <article className="todoGallery row justify-content-center">
          {filter === 0 ? todos.map(x => 
            <SingleTodo key={x.toDoId} todo={x} getTodos={getTodos}/>

          ) :
          todos.filter(x => x.categoryId === filter).map(x => 
            <SingleTodo key={x.toDoId} todo={x} getTodos={getTodos}/>
          )}
          {filter !== 0 && todos.filter(x => x.categoryId === filter).length === 0 &&
            <h2 className='alert alert-warning text-dark'>
              There are no results for this category.
            </h2>

          }
        </article> 
      </Container>
    </section>
  )
}
