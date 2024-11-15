

async function getUserData() {
    const token = localStorage.getItem("kinde_token");
    if (!token) {
      throw new Error("Authentication token not found. Please log in.");
    }
  
    const response = await fetch("https://rangers.kinde.com/api", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      return {
        twitterUsername: data.twitter_username,
        twitterFollowers: data.twitter_followers_count,
        twitterFollowing: data.twitter_following_count,
        twitterProfilePicture: data.twitter_profile_picture,
      };
    } else {
      const errorText = await response.text();
      throw new Error(`Failed to fetch user data: ${response.status} ${errorText}`);
    }
  }

  export default getUserData