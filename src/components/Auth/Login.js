import React from 'react'
import './Login.css'
//Below we import useAuth from our AuthContext in order to access the Login() function
//useAuth is the function we want to import anytime we need currentUser, login(), or logout()
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Container, Card} from 'react-bootstrap'

export default function Login() {
  
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleAuth() {
    await login()

    return navigate('/')
  }

  return (
    <div className="login">
      <article className="welcome mb-5 p-5 text-dark">
        <h1 className="text-center">Welcome to the ToDo App</h1>
      </article>
      <Container>
        <Card className='m-2 border-dark text-center '>
          <Card.Header className='bg-dark'>
            <h2>Login in</h2>
          </Card.Header>
          <Card.Body>
            <h3>Login with  Githhub for full fucntionality!</h3>
            <button className="btn btn-success" onClick={() => handleAuth()}>
              Login W/ Github
            </button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
