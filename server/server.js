import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, Configuration, OpenAi } from "openai";

dotenv.config();

const Configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAi(Configuration);

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', async (req, res)=>{
    res.status(200)
    res.json({message: "Hello World"});
})