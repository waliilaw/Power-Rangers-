import { useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import SeeYourRanger from "@/components/ui/SeeYourRanger";

interface SecondProps {
  onLogin: () => void;
  onLogout: () => void;
}

export function Second({ onLogin, onLogout }: SecondProps): JSX.Element {
  const { isAuthenticated } = useKindeAuth();
  const [, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="button-container flex flex-col items-center space-y-4">
        {isAuthenticated ? (
          <div>
            <h1>Welcome back!</h1>
            <button onClick={onLogout} className="button logout-btn">
              Logout
            </button>
            <button
        onClick={() => setDrawerOpen(true)}
        className="button open-drawer"
      >
        Open Drawer
      </button>
            <SeeYourRanger />
          </div>
        ) : (
          <div>
            <h1>Please log in</h1>
            <button onClick={onLogin} className="button login-btn">
              Login
            </button>
          </div>
        )}
      </div>


    </>
  );
}