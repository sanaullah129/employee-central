import express, { Express } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from "body-parser";
import connectDb from './db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3090;
const MONGO_URL = process.env.MONGO_URL;

if (MONGO_URL) {
    connectDb(MONGO_URL);
} else {
    console.log("Mongo Url Not found");
}

app.use(bodyParser.json());
app.use(express.json());

app.use(cors());


app.get("/", (req, res) => {
    res.send("Your backend-server is running");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
