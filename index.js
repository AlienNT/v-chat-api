import mongoose from "mongoose";
import Express from 'express'
import dotenv from "dotenv";
import {WebSocketServer} from "ws"
import * as http from "http";

import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config/index.js";

import {Token} from "./models/tokenModel.js";
import {parse} from "./helpers/index.js";
import {createUUID} from "./helpers/token.js";
import {router} from "./router/index.js";

dotenv.config()

const App = new Express()
const {DB_URL, PORT} = config

App
    .use(bodyParser.json({limit: '20mb'}))
    .use(cookieParser)
    .use(cors)
// .use('/api')

const server = http.createServer(App)

const WS_SERVER = new WebSocketServer({server})
export const clients = {}

async function WSS_start() {
    try {
        await mongoose.connect(DB_URL)

        WS_SERVER.on('connection', async ws => {
            const id = createUUID()

            clients[id] = ws
            clients[id].id = id

            console.log('clients', Object.keys(clients))

            ws.on('message', message =>
                onMessage(ws, message))

            ws.on('error', error =>
                onError(ws, error))

            ws.on('close', () =>
                onClose(id))
        })

        server.listen(PORT, () => console.log('server started in port: ', PORT))
    } catch (e) {
        console.log(e)
    }
}


await WSS_start()

async function onMessage(ws, message) {
    const json = parse(message)
    console.log('json')

    if (!json?.type) return

    const token = await Token.findOne({
        value: json?.token
    })

    console.log('onMessage token', token)
    const user = token?.user

    console.log('onMessage user', user)

    if (user) {
        ws.userId = user
    }

    return await router(ws, json, json.type)
}

async function onError(ws, error) {
    ws.send(error)
}

async function onClose(id) {
    delete clients[id]
}