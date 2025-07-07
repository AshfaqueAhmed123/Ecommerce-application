import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const MONGODB_URI = process.env.MONGODB_URI;

const CORS_ORIGIN = process.env.CORS_ORIGIN;

export {
    PORT,
    DB_NAME,
    MONGODB_URI,
    CORS_ORIGIN
}