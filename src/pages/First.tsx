import { useEffect, useState } from "react";
import { PowerRangers } from "../Rangers/PowerRangers";
import { hashUsername } from "../logic/hash";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import getUserData from "../api/kinde";
import { useNavigate } from "react-router-dom";

interface TwitterUser {
  username: string;
  followers: number;
  following: number;
  profilePicture: string;
}

function First() {
  const [Ranger, setRanger] = useState<string | null>(null);
  const [twitterData, setTwitterData] = useState<TwitterUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, isAuthenticated, logout } = useKindeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserData = async () => {
        setIsLoading(true);
        try {
          const userData = await getUserData();
          if (userData) {
            setTwitterData({
              username: userData.twitterUsername || "",
              followers: userData.twitterFollowers || 0,
              following: userData.twitterFollowing || 0,
              profilePicture: userData.twitterProfilePicture || "",
            });

            const selectedRanger: any = getRanger(userData.twitterUsername || "");
            setRanger(selectedRanger);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Error fetching user data. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserData();
    }
  }, [isAuthenticated]);

  function getRanger(username: string) {
    const position = hashUsername(username) % PowerRangers.length;
    return PowerRangers[position];
  }

  const handleLogin = async () => {
    try {
      await login();
      setError("");
    } catch {
      setError("Failed to log in. Please try again.");
    }
  };

  const handleLogout = () => {
    logout();
    setRanger(null);
    setTwitterData(null);
  };

  return (
    <div className="main-container">
      <button onClick={() => navigate("/2")}>Take me to page two</button>
      <h1>Power Rangers</h1>
      {isAuthenticated ? (
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {error && <p className="error">{error}</p>}
            {twitterData && (
              <div className="profile-section">
                <img
                  src={twitterData.profilePicture || "https://via.placeholder.com/150"}
                  alt="Profile"
                />
                <h3>{twitterData.username}</h3>
                <p>Followers: {twitterData.followers}</p>
                <p>Following: {twitterData.following}</p>
              </div>
            )}
            {Ranger && <h2>Your Ranger: {Ranger}</h2>}
            <button onClick={handleLogout}>Log out</button>
          </div>
        )
      ) : (
        <>
          {error && <p className="error">{error}</p>}
          <button onClick={handleLogin}>Log In with Twitter</button>
        </>
      )}
    </div>
  );
}

export default First;