// Database models/schemas
// This is similar to db.js in journal-api during the class
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

// const connectDB = mongoose.connect(process.env.DB_URI)
//     .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected' : "Mongoose failed to connect"))
//     .catch(err => console.error(err))

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Mongoose connected')
    } catch (err) {
        console.error('Mongoose failed to connect: ', err)
    }

}

export default ConnectDB;
