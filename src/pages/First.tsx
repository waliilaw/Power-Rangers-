import SeeYourRanger from '@/components/ui/SeeYourRanger';
import './First.css';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useState } from "react";

function First() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login, logout } = useKindeAuth();

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const Login = async () => {
    setIsLoading(true);
    try {
      await login();
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const Logout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <img src="/asta.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="container">
      <button
        onClick={() => setDrawerOpen(true)}
        className="open-drawer-btn"
      >
        Open Drawer
      </button>

      {/* Drawer overlay */}
      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}></div>
      )}

      {/* Drawer content */}
      <div className={`drawer-content ${isDrawerOpen ? "drawer-open" : ""}`}>
        <h2>Drawer Content</h2>
        <p>This is the content inside the drawer.</p>
        <button 
          onClick={() => setDrawerOpen(false)} 
          className="close-drawer-btn"
        >
          Close Drawer
        </button>
      </div>

      {isAuthenticated ? (
        <div>
          <h1>Welcome back!</h1>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please log in</h1>
          <button onClick={Login}>Login</button>
        </div>
      )}

      <SeeYourRanger />
    </div>
  );
}

export default First;