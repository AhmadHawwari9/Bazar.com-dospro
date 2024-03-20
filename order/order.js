const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3002;

app.use(express.json());

const CATALOG_SERVICE_URL = 'http://catalog-service:3001';

// Purchase route
app.post('/purchase/:itemNumber', async (req, res) => {
    try {
        const { itemNumber } = req.params;
        const bookInfo = await axios.get(`${CATALOG_SERVICE_URL}/info/${itemNumber}`);
        let book = bookInfo.data;
        if (book.quantity > 0) {
            book.quantity--;
            await axios.put(`${CATALOG_SERVICE_URL}/update/${itemNumber}?quantity=${book.quantity}`);
            res.json({ message: `You bought "${book.title}".` });
        } else {
            res.status(400).json({ error: 'Out of stock' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Order server is running on port ${PORT}`);
});
