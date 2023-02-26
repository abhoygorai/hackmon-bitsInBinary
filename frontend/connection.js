const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/hackathon");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;