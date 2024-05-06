const mongoose = require('mongoose');

require('dotenv').config();

exports.connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_URI);
        console.log(">>> DB is connected");

    } catch (error) { console.log(error); }

}