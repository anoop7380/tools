const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json());

// Remove.bg API Key
const API_KEY = 'NPdzHvm6mpVUCZkbUzaVUezt'; // Your Remove.bg API key

// Endpoint to remove background
app.post('/remove-background', async (req, res) => {
  const { imageUrl } = req.body;

  const formData = new FormData();
  formData.append('image_url', imageUrl);

  try {
    const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': API_KEY,
      },
      responseType: 'arraybuffer',
    });

    // Send the processed image back to the frontend
    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to remove background.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
