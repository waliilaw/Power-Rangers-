import { useEffect, useState } from "react";
import { PowerRangers } from "../Rangers/PowerRangers";
import { hashUsername } from "../logic/hash";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import getUserData from "../api/kinde"; 

interface TwitterUser {
  username: string;
  followers: number;
  following: number;
  profilePicture: string;
}

function First() {
  const [Ranger, setRanger] = useState<string | null>(null);
  const [twitterData, setTwitterData] = useState<TwitterUser | null>(null);
  const { login, isAuthenticated, logout } = useKindeAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserData = async () => {
        try {
          const userData = await getUserData(); // Fetch user data
          if (userData) {
            setTwitterData({
              username: userData.twitterUsername || "",
              followers: userData.twitterFollowers || 0,
              following: userData.twitterFollowing || 0,
              profilePicture: userData.twitterProfilePicture || "",
            });

            // Directly assign ranger based on the username
            const selectedRanger : any= getRanger(userData.twitterUsername || "");
            setRanger(selectedRanger);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
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
    await login();
  };

  const handleLogout = () => {
    logout();
    setRanger(null);
    setTwitterData(null);
  };

  return (
    <div className="main-container">
      <h1>Power Rangers</h1>
      {isAuthenticated ? (
        <div>
          {twitterData && (
            <div className="profile-section">
              <img src={twitterData.profilePicture} alt="Profile" />
              <h3>{twitterData.username}</h3>
              <p>Followers: {twitterData.followers}</p>
              <p>Following: {twitterData.following}</p>
            </div>
          )}
          {Ranger && <h2>Your Ranger: {Ranger}</h2>}
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Log In with Twitter</button>
      )}
    </div>
  );
}

export default First;
