const express = require("express")
const path = require("path")
const cors = require("cors")
const { PrismaClient } = require('@prisma/client')
import { createHash } from "crypto"

// Setup
const app = express()
const prisma = new PrismaClient()

app.use(cors()) // Cors
app.use(express.json()) // Json

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
  return createHash('md5').update(identifier).digest('hex')
}

// Function to check if user has an assigned ranger in the database
async function getAssignedRanger(userId: number) {
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
}

// Function to assign a ranger to the user
async function assignRanger(userId: number, userHash: string) {
  const allRangers = Object.entries(rangers).flatMap(([rangerClass, images]) =>
    images.map(image => ({ class: rangerClass, image }))
  )

  const randomIndex = parseInt(userHash.slice(0, 8), 16) % allRangers.length
  const randomRanger = allRangers[randomIndex]

  // Save the assigned ranger to the database
  await prisma.user.update({
    where: { id: userId },
    data: {
      rangerClass: randomRanger.class,
      rangerImage: randomRanger.image
    }
  })

  return randomRanger
}

// Static
app.use("/rangers", express.static(path.join(__dirname, "public/rangers")))

// Assign Ranger API
app.get("/assign-ranger", async (req:any, res: any) => {
  try {
    const userIdentifier = req.query.userIdentifier || "" // Get the user's email or id from the query

    const user = await prisma.user.findUnique({
      where: { username: userIdentifier }, // Assuming username is unique identifier
    })

    if (!user) {
      console.log("User not found")
      return res.status(404).json({ message: "User not found" })
    }

    let ranger = await getAssignedRanger(user.id)

    if (!ranger) {
      const userHash = getHashForUser(userIdentifier)
      ranger = await assignRanger(user.id, userHash)
    }

    console.log("Ranger assigned:", ranger)

    const rangerImageUrl = `/rangers/${ranger.rangerImage}`
    res.json({ rangerImageUrl, rangerClass: ranger.rangerClass })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to assign Ranger" })
  }
})

// Listen
const port = process.env.PORT || 3012
app.listen(port, () => console.log(`Server at http://localhost:${port}`))