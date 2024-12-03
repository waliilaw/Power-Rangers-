import './First.css';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect, useState } from "react";
import { Second } from './Second';
import FaceIcon from '@mui/icons-material/Face';
import { Footer } from './Feet/Footer';
// import Three from './Three';

function First() {
  const { login, logout, user , isAuthenticated } = useKindeAuth();
  const [rangerImage, setRangerImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

// Login Logout logic is here brother

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  function profile(){alert("Login first")}

// Fetching part from kinde is here 

async function fetchRangerImage(identifier: string){

  if (!identifier) return; 
  const serverUrl = process.env.REACT_APP_SERVER_URL 
  const response = await fetch(`${serverUrl}/ranger/${identifier}`);
  const data = await response.json();
  setRangerImage(data.rangerImageUrl);

};
// On user login, fetch the ranger image

useEffect(() => {
  if (user) {
    const identifier = user?.email || user?.id;
    if (identifier) {
      fetchRangerImage(identifier);
    } else {
      console.error("No valid identifier found");}}}, [user]);

// Loading Image is asta gif 
  
if (isLoading) {
    return (
      <div className="loading-container">
        <img src="/asta.gif" alt="Loading..." />
      </div>
    );
  }
 
  return (
    <>
      <div className="header">
        <FaceIcon className="face-icon" onClick={profile} />
      </div>

      <div className="container">
        {user ? (
          <div className="user-info">
            <h2>Welcome, {user?.given_name || user?.email}</h2> {/* Username */}
            {user?.picture && (
              <img src={user.picture} alt="Profile" width="100" height="100" className="profile-pic" />
            )}
          </div>
        ) : (
          <Second onLogin={Login} onLogout={Logout} />
        )}

        {/* Show Ranger Image if available */}
        {rangerImage && <img src={rangerImage} alt="Ranger" />}

        <Footer />
      </div>

      {user && (
        <Second onLogin={Login} onLogout={Logout} />
      )}

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
    </>
  )}

export default First
