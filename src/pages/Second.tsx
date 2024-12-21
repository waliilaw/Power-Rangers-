// login logout button 
import { useKindeAuth } from "@kinde-oss/kinde-auth-react"

interface SecondProps {
  onLogin: () => void
  onLogout: () => void
}

export function Second({ onLogin, onLogout }: SecondProps): JSX.Element {
  const { isAuthenticated } = useKindeAuth()

  return (
    <div className="button-container flex flex-col items-center space-y-4">
      {isAuthenticated ? (
        <div>
          <h1>Welcome Back!</h1>
          <button onClick={onLogout} className="button login-btn">
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button onClick={onLogin} className="button login-btn">
            Login
          </button>
        </div>
      )}
    </div>
  )
}
