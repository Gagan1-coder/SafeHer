const admin = require('../firebase/index');
const { v4: uuidv4 } = require('crypto').randomUUID ? { v4: () => require('crypto').randomUUID() } : { v4: () => Date.now().toString(36) + Math.random().toString(36).slice(2) };

// In-memory fallback store when Firebase/Firestore is not configured
const memoryStore = new Map();
let firestoreAvailable = null; // null = untested, true/false = known

async function checkFirestore() {
  if (firestoreAvailable !== null) return firestoreAvailable;
  try {
    const db = admin.firestore();
    await db.collection('_health').limit(1).get();
    firestoreAvailable = true;
    console.log('✅ Firestore connected successfully.');
  } catch (err) {
    firestoreAvailable = false;
    console.warn('⚠️  Firestore not available (no credentials). Using in-memory store as fallback.');
  }
  return firestoreAvailable;
}

function getDb() {
  return admin.firestore();
}

const User = {
  getAllUsers: async () => {
    if (!(await checkFirestore())) {
      return Array.from(memoryStore.values());
    }
    const usersSnapshot = await getDb().collection('users').get();
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  },

  getUserById: async (userId) => {
    if (!(await checkFirestore())) {
      return memoryStore.get(userId) || null;
    }
    const userDoc = await getDb().collection('users').doc(userId).get();
    if (!userDoc.exists) return null;
    return { id: userDoc.id, ...userDoc.data() };
  },

  getUserByEmail: async (email) => {
    if (!(await checkFirestore())) {
      return Array.from(memoryStore.values()).filter(u => u.email === email);
    }
    const snapshot = await getDb().collection('users').where('email', '==', email).get();
    const users = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  },

  createUser: async (userData) => {
    if (!(await checkFirestore())) {
      const id = require('crypto').randomUUID ? require('crypto').randomUUID() : Date.now().toString(36);
      const newUser = { id, ...userData, createdAt: userData.createdAt || new Date().toISOString() };
      memoryStore.set(id, newUser);
      console.log(`[In-Memory] User created: ${userData.email}`);
      return newUser;
    }
    const newUserRef = await getDb().collection('users').add(userData);
    const newUserDoc = await newUserRef.get();
    return { id: newUserRef.id, ...newUserDoc.data() };
  },

  updateUserById: async (userId, userData) => {
    if (!(await checkFirestore())) {
      const existing = memoryStore.get(userId) || {};
      const updated = { ...existing, ...userData, id: userId };
      memoryStore.set(userId, updated);
      return updated;
    }
    await getDb().collection('users').doc(userId).set(userData, { merge: true });
    const updatedUserDoc = await getDb().collection('users').doc(userId).get();
    return { id: updatedUserDoc.id, ...updatedUserDoc.data() };
  },

  deleteUserById: async (userId) => {
    if (!(await checkFirestore())) {
      memoryStore.delete(userId);
      return;
    }
    await getDb().collection('users').doc(userId).delete();
  },
};

module.exports = User;
