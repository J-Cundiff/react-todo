import React from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'



import Todo from './components/todos/Todo'
import Categories from './components/categories/Categories'
import Login from './components/Auth/Login'
import Navigation from './components/Navigation'
import AuthProvider from './context/AuthContext'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'



export default function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<ProtectedRoute><Todo /></ProtectedRoute>} />
            <Route path='/todo' element={<ProtectedRoute><Todo /></ProtectedRoute>} />
            <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  )
}

