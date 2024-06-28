const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/MERN', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected...');
    } catch(err) {
        console.log(err);
    }
}

module.exports = connectDB;

