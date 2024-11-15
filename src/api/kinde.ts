async function getUserData() {
  const token = localStorage.getItem("kinde_token");
  if (!token) {
    throw new Error("Authentication token not found. Please log in.");
  }
  const response = await fetch("https://rangers.kinde.com/api/v1/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch user data: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  return {
    twitterUsername: data.identity?.provider_metadata?.screen_name || "N/A",
    twitterFollowers: data.identity?.provider_metadata?.followers_count || 0,
    twitterFollowing: data.identity?.provider_metadata?.following_count || 0,
    twitterProfilePicture: data.identity?.provider_metadata?.profile_image_url || "",
  };
}

export default getUserData;
