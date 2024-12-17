import express = require("express")
import cors = require("cors")
import path = require("path")
import { PrismaClient } from "@prisma/client"
import { createHash } from "crypto"
import axios = require("axios")
import dotenv = require("dotenv")

dotenv.config()

// Setup
const app: express.Application = express()
const prisma = new PrismaClient()

// CORS Configuration: Allow requests from your frontend domain
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://www.redranger.me"
      : "*", // Allow all origins during development
  methods: ["GET", "POST"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
}

app.use(cors(corsOptions)) // Apply CORS with options
app.use(express.json()) // Parse JSON

// Rangers
const rangers = {
  "SPD": ["0.1.jpg", "0.2.jpg", "0.3.jpg", "0.4.jpg", "0.5.jpg"],
  "NINJA STORM": ["1.1.jpg", "1.2.jpg", "1.3.jpg", "1.4.jpg", "1.5.jpg", "1.6.jpg", "1.7.jpg"],
  "DINO THUNDER": ["2.1.jpg", "2.2.jpg", "2.3.jpg", "2.4.jpg", "2.5.jpg"],
  "MEGAFORCE": ["3.1.jpg", "3.2.jpg", "3.3.jpg", "3.4.jpg", "3.5.jpg"],
  "DINO FURY": ["4.1.jpg", "4.2.jpg", "4.3.jpg"],
  "NINJA STEEL": ["5.1.jpg", "5.2.jpg", "5.3.jpg"],
  "DINO CHARGE": ["6.1.jpg", "6.2.jpg", "6.3.jpg", "6.4.jpg", "6.5.jpg"],
  "SAMURAI": ["7.1.jpg", "7.2.jpg", "7.3.jpg", "7.4.jpg", "7.5.jpg"],
  "JUNGLE FURY": ["8.1.jpg", "8.2.jpg", "8.3.jpg", "8.4.jpg"],
  "MYSTIC FORCE": ["9.1.jpg", "9.2.jpg", "9.3.jpg", "9.4.jpg"],
}

// Function to hash user identifier and map to an image
function getHashForUser(identifier: string) {
  return createHash("md5").update(identifier).digest("hex")
}

// Function to check if user has an assigned ranger in the database
async function getAssignedRanger(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { rangerClass: true, rangerImage: true }
    })

    if (!user) {
      console.log("User not found in database")
      return null
    }

    console.log("User found: ", user)
    return user
  } catch (error) {
    console.error("Error fetching assigned ranger:", error)
    return null
  }
}

// Function to assign a ranger to the user
async function assignRanger(userId: number, userHash: string) {
  try {
    const allRangers = Object.entries(rangers).flatMap(([rangerClass, images]) =>
      images.map(image => ({ class: rangerClass, image }))
    )

    const randomIndex = parseInt(userHash.slice(0, 8), 16) % allRangers.length
    const randomRanger = allRangers[randomIndex]

    console.log("Assigning ranger:", { userId, userHash })  // Log when assigning the ranger

    await prisma.user.update({
      where: { id: userId },
      data: {
        rangerClass: randomRanger.class,
        rangerImage: randomRanger.image
      }
    })

    console.log(`Ranger assigned: ${randomRanger.class} - ${randomRanger.image}`)
    return { rangerClass: randomRanger.class, rangerImage: randomRanger.image }
  } catch (error) {
    console.error("Error assigning ranger:", error)
    throw error
  }
}

// Static
app.use("/rangers", express.static(path.join(__dirname, "public/rangers")))

// Kinde API URL
const KIND_API_URL = "https://rangers.kinde.com/api/users"

// Function to fetch user details from Kinde
interface UserDetails {
  id: number;
  [key: string]: any;
}

async function fetchUserDetailsFromKinde(userIdentifier: string): Promise<UserDetails> {
  try {
    console.log("KINDE_ACCESS_TOKEN:", process.env.KINDE_ACCESS_TOKEN);  // Log Kinde token
    console.log("NODE_ENV:", process.env.NODE_ENV);  // Log environment

    const response = await axios.get(KIND_API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.KINDE_ACCESS_TOKEN}`,
      },
      params: { userIdentifier },
    })

    return response.data as UserDetails
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user details from Kinde:", error.message)
    } else {
      console.error("Error fetching user details from Kinde:", error)
    }
    throw new Error("Failed to fetch user details from Kinde")
  }
}

// Assign Ranger API
app.get("/assign-ranger", async (req: any, res: any) => {
  try {
    const userName = req.query.userName || ""
    console.log(`Assigning ranger to user: ${userName}`)

    // Fetch user details from Kinde
    const userDetails = await fetchUserDetailsFromKinde(userName)
    console.log(`User details from Kinde API:`, userDetails)

    // Check if user exists in the database
    let user = await prisma.user.findUnique({
      where: { username: userDetails.id.toString() }
    })

    if (!user) {
      // Create new user in the database
      user = await prisma.user.create({
        data: {
          username: userDetails.id.toString(),
          imageUrl: userDetails.imageUrl,
          name: userDetails.name
        }
      })
    }

    let ranger = await getAssignedRanger(user.id)

    if (!ranger) {
      const userHash = getHashForUser(userName)
      console.log("User hash:", userHash)
      ranger = await assignRanger(user.id, userHash)
    }

    console.log("Ranger assigned:", ranger)

    if (!ranger) {
      return res.status(500).json({ message: "Failed to assign Ranger" })
    }
    const rangerImageUrl = `/rangers/${ranger.rangerImage}`
    res.json({ rangerImageUrl, rangerClass: ranger.rangerClass, username: user.username, imageUrl: user.imageUrl })
  } catch (error) {
    console.error("Error in /assign-ranger API:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    res.status(500).json({ message: "Failed to assign Ranger", error: errorMessage })
  }
})

// Listen
const port = process.env.PORT || 3012
app.listen(port, () => console.log(`Server at http://localhost:${port}`))