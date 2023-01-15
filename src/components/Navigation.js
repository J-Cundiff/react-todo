import React from 'react'
import './Navigation.css'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext' 
import Logout from './Auth/Logout'

export default function Navigation() {
  
  const { currentUser } = useAuth()

  return (
    <Navbar expand='md' variant='dark' bg='dark' className='p-3'>
        <Navbar.Brand href='/'>ToDo App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          
            <Nav>
            {currentUser &&
              <Logout />
             }
                <Link to='/todo' className='nav-link'>ToDo</Link>
                <Link to='/categories' className='nav-link'>Categories</Link>

                {!currentUser &&

                  <Link to='/login' className='nav-link'>Login</Link>

                }

 
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

