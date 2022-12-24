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


app.get('/', async (req, res) => {
    res.status(200)
    res.send({
        message: 'hello from Ai'
    });
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt:`${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error){
        console.log(error)
        res.status(500).send({ error })
    }
});