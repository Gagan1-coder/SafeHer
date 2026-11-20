const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const { Client } = require("@googlemaps/google-maps-services-js");
const bodyParser = require('body-parser');
const { safeRouteJson } = require('./safeRoute');
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '.env') });
require("dotenv").config();
const axios = require('axios');

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;

// Root / Health check routes
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'SafeHer Backend API is running',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      safestRoute: 'POST /safest-route',
      users: 'GET/POST/PUT/DELETE /users',
      auth: 'GET /auth'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Mount user routes
app.use('/users', userRoutes);

// Mount auth routes
app.use('/auth', authRoutes);

// Google Maps API Key
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Endpoint to get safest route
app.post('/safest-route', async (req, res) => {
  try {
    // Get source and destination coordinates from the request
    const { source, destination, mode } = req.body;

    if (!source || !destination) {
      return res.status(400).json({ error: 'Source and destination are required' });
    }

    if (!API_KEY || API_KEY === 'your_key_here') {
      return res.status(503).json({
        error: 'Google Maps API key is not configured in backend/.env',
        hint: 'Set a valid GOOGLE_MAPS_API_KEY in backend/.env'
      });
    }

    // Get Routes from source to destination
    const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
      params: {
        origin: source,
        destination: destination,
        mode: mode || 'walking',
        key: API_KEY,
        alternatives: true // Request multiple routes
      }
    });

    if (response.data.status !== 'OK' || !response.data.routes || response.data.routes.length === 0) {
      return res.status(400).json({
        error: response.data.error_message || 'No route found for the given locations',
        status: response.data.status
      });
    }

    const routes = response.data.routes;
    const result = safeRouteJson(routes);
    return res.json(result);
  } catch (error) {
    console.error('Error fetching safest route:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
