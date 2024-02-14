const mongoose = require("mongoose");

const URI = process.env.URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log('connection successful');
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

module.exports = connectDb;