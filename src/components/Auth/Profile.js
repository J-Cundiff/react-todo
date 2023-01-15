import React from 'react'
import './Profile.css'
import { useAuth } from '../../context/AuthContext'

export default function Profile() {
    const { currentUser } = useAuth()
  return (
    <span className="profile p-2">
        Hello {!currentUser.displayName ? currentUser.email : currentUser.displayName}!
        <img src={currentUser.photoURL} alt={!currentUser.displayName ? currentUser.email : currentUser.displayName} />
    </span>
  )
}
