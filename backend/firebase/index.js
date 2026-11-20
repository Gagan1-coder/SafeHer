const buffer = require("buffer");
if (!buffer.SlowBuffer) buffer.SlowBuffer = buffer.Buffer;

const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const keyPath = path.resolve(__dirname, "../serviceAccountKey.json");

if (admin.apps.length === 0) {
  if (fs.existsSync(keyPath)) {
    const credentials = require(keyPath);
    admin.initializeApp({
      credential: admin.credential.cert(credentials),
    });
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    const credentials = require(path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS));
    admin.initializeApp({
      credential: admin.credential.cert(credentials),
    });
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      const credentials = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      admin.initializeApp({
        credential: admin.credential.cert(credentials),
      });
    } catch (e) {
      console.warn("⚠️ Could not parse FIREBASE_SERVICE_ACCOUNT JSON. Initializing with default credentials.");
      admin.initializeApp();
    }
  } else {
    console.warn("⚠️ Warning: serviceAccountKey.json not found at " + keyPath + ". Firebase Admin initialized with default credentials.");
    admin.initializeApp();
  }
}

module.exports = admin;
