import express from "express";
import path from "path";
import cors from "cors";

// Set up express app
const app = express();
app.use(cors()); // Allow cross-origin requests (for your frontend)

// Hashing function to map username to a unique number
function hashUsername(username: string): number {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// Serve static images from 'public' folder
app.use("/rangers", express.static(path.join(__dirname, "public/rangers")));

// Route to get a ranger image based on Twitter username
app.get("/ranger/:username", (req, res) => {
  const { username } = req.params;

  // Hash the username to get a unique number
  const hashedValue = hashUsername(username);

  // Map the hashed value to an index for your ranger images
  const rangerIndex = hashedValue % 10; // Assuming you have 10 ranger images

  // Construct the image URL based on the ranger index
  const rangerImageUrl = `/rangers/ranger-${rangerIndex}.png`; // Adjust based on your file names
  
  res.json({ rangerImageUrl });
});

// Use process.env.PORT for production (Heroku, AWS, etc.)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});