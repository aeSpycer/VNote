import mongoose from 'mongoose';

import 'dotenv/config';

export const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(">>> DB is connected");

    } catch (error) { console.log(error); }

}
