import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);

export function connectDb(): void {
    mongoClient.connect();
    db = mongoClient.db("fitness_foods");
    console.log("Connected to MongoDB");
}

export async function disconnectDB(): Promise<void> {
    await mongoClient.close();
}

export default db;