const express = require("express");
const router = express.Router();
const firebase = require("../firebase/index");
const User = require('../models/user');

// Helper function to verify and decode token
async function verifyAndDecodeToken(token) {
  const decodedToken = await firebase.auth().verifyIdToken(token);
  return decodedToken;
}

// Helper function to get user from Firebase
async function getUserFromFirebase(email) {
  try {
    const userRecord = await firebase.auth().getUserByEmail(email);
    return userRecord.toJSON();
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return null; // User doesn't exist in Firebase
    } else {
      throw error;
    }
  }
}

// Helper function to get user details from the database
async function getUserDetails(email) {
  try {
    const user = await User.getUserByEmail(email);
    return user;
  } catch (error) {
    throw error;
  }
}

// Helper function to create a user in Firebase
async function createFirebaseUser(decodedToken) {
  const { email, uid } = decodedToken;
  try {
    const userRecord = await firebase.auth().createUser({
      uid,
      email,
    });
    return userRecord.toJSON();
  } catch (error) {
    throw error;
  }
}

// Helper function to create a user in the database
async function createDatabaseUser(decodedToken) {
  const { email, uid } = decodedToken;
  try {
    const newUser = await User.createUser({ email, firebase_uid: uid });
    return newUser;
  } catch (error) {
    throw error;
  }
}

router.get("/", async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Authorization header is required (Bearer <token>)" });
    }
    const parts = req.headers.authorization.split(" ");
    if (parts.length < 2 || !parts[1]) {
      return res.status(401).json({ error: "Invalid authorization header format. Expected: Bearer <token>" });
    }
    const token = parts[1];
    const decodedToken = await verifyAndDecodeToken(token);
    // Check if the user exists in Firebase
    const firebaseUser = await getUserFromFirebase(decodedToken.email);
    if (firebaseUser) {
      // Check if user exists in database or not
      const saheliUser = await getUserDetails(decodedToken.email);
      if (saheliUser && saheliUser.length !== 0) {
        // Login
        return res.status(200).json({ saheliUser, type: "login" });
      } else {
        // Register
        await createFirebaseUser(decodedToken);
        const newUser = await createDatabaseUser(decodedToken);
        return res.status(200).json({ newUser, type: "register" });
      }
    } else {
      return res.status(404).json({ error: "User not found in Firebase" });
    }
  } catch (error) {
    console.error("Auth route error:", error.message);
    res.status(500).json({ error: "Authentication failed", details: error.message });
  }
});

module.exports = router;
