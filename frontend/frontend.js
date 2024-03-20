const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

const CATALOG_SERVICE_URL = 'http://catalog-service:3001';
const ORDER_SERVICE_URL = 'http://order-service:3002';

// Search route
app.get('/search/:query', async (req, res) => {
    try {
        const { query } = req.params;
        const response = await axios.get(`${CATALOG_SERVICE_URL}/search/${query}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Search operation to get all catalog items
app.get('/search', async (req, res) => {
    try {
        const response = await axios.get(`${CATALOG_SERVICE_URL}/search`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Info route
app.get('/info/:itemNumber', async (req, res) => {
    try {
        const { itemNumber } = req.params;
        const response = await axios.get(`${CATALOG_SERVICE_URL}/info/${itemNumber}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Purchase route
app.post('/purchase/:itemNumber', async (req, res) => {
    try {
        const { itemNumber } = req.params;
        const response = await axios.post(`${ORDER_SERVICE_URL}/purchase/${itemNumber}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Front-end server running on port ${PORT}`);
});