const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

let catalog = [
    { id: 1, title: "How to get a good grade in DOS in 40 minutes a day", quantity: 10, price: 20 },
    { id: 2, title: "RPCs for Noobs", quantity: 5, price: 30 },
    { id: 3, title: "Xen and the Art of Surviving Undergraduate School", quantity: 15, price: 25 },
    { id: 4, title: "Cooking for the Impatient Undergrad", quantity: 8, price: 35 }
];

app.use(express.json());

app.get('/search', (req, res) => {
    const simplifiedCatalog = catalog.map(item => ({ id: item.id, title: item.title }));
    res.json(simplifiedCatalog);
});

app.get('/search/:query', (req, res) => {
    const { query } = req.params;
    if (/^\d+$/.test(query)) {
        // Search by ID
        const searchId = parseInt(query);
        const book = catalog.find(book => book.id === searchId);
        if (book) {
            res.json({ id: book.id, title: book.title });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } else if (query.toLowerCase() === 'distributed systems') {
        // Search for books related to distributed systems
        const result = catalog.filter(book => book.id === 1 || book.id === 2);
        res.json(result.map(book => ({ id: book.id, title: book.title })));
    } else if (query.toLowerCase() === 'undergraduate school') {
        // Search for books related to undergraduate school
        const result = catalog.filter(book => book.id === 3 || book.id === 4);
        res.json(result.map(book => ({ id: book.id, title: book.title })));
    } else {
        // Search by title
        const searchTitle = query.toLowerCase();
        const result = catalog.filter(book => book.title.toLowerCase().includes(searchTitle));
        res.json(result.map(book => ({ id: book.id, title: book.title })));
    }
});

app.get('/info/:itemNumber', (req, res) => {
    const itemNumber = parseInt(req.params.itemNumber);
    const book = catalog.find(book => book.id === itemNumber);
    if (book) {
        res.json({ title: book.title, quantity: book.quantity, price: book.price });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});



// Endpoint to update item cost or quantity
app.put('/update/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    const quantity = req.query.quantity;

    const bookIndex = catalog.findIndex(book => book.id === parseInt(itemId));
    if (bookIndex !== -1) {
        catalog[bookIndex].quantity = quantity;
        res.json({ message: 'Item updated successfully' });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

app.listen(port, () => {
    console.log(`Catalog server microservice listening at http://localhost:${port}`);
});