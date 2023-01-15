import React, { useState, useEffect } from 'react'
import './Categories.css'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleCategory from './SingleCategory'
import { useAuth } from '../../context/AuthContext'
import CatCreate from './CatCreate'

export default function Categories() {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
      axios.get(`https://localhost:7298/api/Categories`).then(response => {
        console.log(response)
        setCategories(response.data)
      })
    }

    const { currentUser} = useAuth()

    const [ showCreate, setShowCreate ] = useState(false) 

    useEffect(() => {
      getCategories()
    }, []);

  return (
    <section className="categories">
      <article className="dashboard p-5">
        <h1 className="text-center">Categories Dashboard</h1>
      </article>

      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="p-2 mb-3 text-center">
        {showCreate ?
            <>
                <div className='catCreate col-md-6 offset-3'>
                  <button onClick={() => setShowCreate(false)} className='btn btn-warning'>Cancel</button>
                  <CatCreate getCategories={getCategories} setShowCreate={setShowCreate} />
                </div>
            </>
        :   <button className='catButton' onClick={() => setShowCreate(true)}>Create Category</button>
        }
    </div>
      }
  
      <Container className='p-2'>
          <table className="table my-3">
            <thead className="table-secondary text-uppercase">
              <tr>
                <th>Name</th>
                <th>Description</th>
                {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                    <th>Actions</th>
                }
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => 
                <SingleCategory key={cat.categoryId} category={cat} getCategories={getCategories} />

              )}
            </tbody>
          </table>
      </Container>
    </section>
  )
}
