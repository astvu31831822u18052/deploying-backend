const express = require('express');
const mongoose = require('mongoose');
const booyParser = require('body-parser');
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(booyParser.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/blog')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log("MongoDB connection error: ", err));

app.use('/api/posts', postRoutes);

app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})