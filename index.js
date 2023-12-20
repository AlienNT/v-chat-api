import Express from 'express'
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config/index.js";

dotenv.config()

const App = new Express()
const {DB_URL, PORT} = config

App
    .use(bodyParser.json({limit: '20mb'}))
    .use(cookieParser)
    .use(cors)

async function start() {
    try {
        await mongoose.connect(DB_URL)

        App.listen(PORT, () => {
            console.log('server started in port: ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

await start()