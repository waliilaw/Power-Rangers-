import SeeYourRanger from '@/components/ui/SeeYourRanger';
import './First.css';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useState } from "react";

function First() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login, logout } = useKindeAuth();
  const [, setDrawerOpen] = useState(false);

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
        className="button open-drawer"
      >
        Open Drawer
      </button>

      <div className="button-container flex flex-col items-center space-y-4"> {/* Flex container for vertical stacking */}
        {isAuthenticated ? (
          <div>
            <h1>Welcome back!</h1>
            <button onClick={Logout} className="button logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div>
            <h1>Please log in</h1>
            <button onClick={Login} className="button login-btn">
              Login
            </button>
          </div>
        )}
      </div>

      <SeeYourRanger />
    </div>
  );
}

export default First;
