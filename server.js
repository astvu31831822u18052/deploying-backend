// ...existing code...
require('dotenv').config();
 const express = require('express');
 const mongoose = require('mongoose');
 
 const postRoutes = require('./routes/posts');
 const categoryRoutes = require('./routes/categories');
 const cors = require('cors');
 const app = express();
 const PORT = process.env.PORT || 8000;
 
 app.use(express.json());
 app.use(cors());
 
 const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
 if (!uri) {
   console.error('Missing MONGO_URI or MONGODB_URI environment variable');
   process.exit(1);
 }
// optional: log a masked version for debugging (never print credentials)
console.log('Using Mongo URI host:', uri.replace(/^(mongodb(\+srv)?:\/\/)([^:]+:[^@]+@)?([^/]+).*/, '$1$4'));
(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
       useUnifiedTopology: true,
       serverSelectionTimeoutMS: 10000
     });
     console.log('MongoDB connected');
     
   } catch (err) {
     console.error('MongoDB connect error:', err);
     process.exit(1);
   }
 
   app.use('/api/posts', postRoutes);
   app.use('/api/categories', categoryRoutes);
 
   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
 })();