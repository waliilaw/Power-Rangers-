import './First.css'
import { useKindeAuth } from "@kinde-oss/kinde-auth-react"
import { useEffect, useState } from "react"
import { Second } from './Second'
import FaceIcon from '@mui/icons-material/Face'
import React from 'react'

function First() {
  const { login, logout, user, isAuthenticated } = useKindeAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [ranger, setRanger] = useState<{ rangerImageUrl: string, rangerClass: string } | null>(null)

  async function Login() {
    setIsLoading(true)
    try {
      await login()
    } catch (error) {
      console.error("Login failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function Logout() {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  function profile() {
    alert("Login first")
  }

  useEffect(() => {
    async function fetchRanger() {
      if (user) {
        const userName = user?.given_name || user?.email // Identifier
        const response = await fetch(`https://redranger.up.railway.app/assign-ranger?userIdentifier=${userName}`)
        const data = await response.json()
        setRanger(data)
      }
    }
    if (user) fetchRanger()
  }, [user])

  if (isLoading) {
    return (
      <div className="loading-container">
        <img src="/asta.gif" alt="Loading..." />
      </div>
    )
  }

  return (
    <>
      <div className="header">
        <FaceIcon className="face-icon" onClick={profile} />
      </div>

      <div className="container">
        {user ? (
          <div className="user-info">
            <h2>Welcome, {user?.given_name || user?.email}</h2>
            {user?.picture && (
              <img src={user.picture} alt="Profile" width="100px" height="100px" className="profile-pic" />
            )}
            <Second onLogout={Logout} onLogin={function (): void {}} />
          </div>
        ) : (
          <Second onLogin={Login} onLogout={Logout} />
        )}
      </div>

      {!isAuthenticated && (
        <div className="content">
          <div className="up">
            <span className="up-0">R</span>
            <span className="up-2-8">A</span>
            <span className="up-3-7">N</span>
            <span className="up-4-6">G</span>
            <span className="up-5">E</span>
            <span className="up-4-6">R</span>
            <span className="up-3-7">S</span>
          </div>
          <div className="down">
            <span className="down-0">R</span>
            <span className="down-2-8">A</span>
            <span className="down-3-7">N</span>
            <span className="down-4-6">G</span>
            <span className="down-5">E</span>
            <span className="down-4-6">R</span>
            <span className="down-3-7">S</span>
          </div>
        </div>
      )}

      <div>
        {ranger && isAuthenticated && !isLoading && (
          <div>
            <img
              src={ranger.rangerImageUrl}
              alt={`Ranger from ${ranger.rangerClass}`}
              style={{ width: "500px", height: "500px" }}
            />
            <p>Your Class - {ranger.rangerClass}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default First
