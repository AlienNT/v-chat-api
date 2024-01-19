import {msgTypes} from "./types.js";
import {stringify} from "./index.js";

export function sendMessage(ws, {
    status = 200,
    type = msgTypes.ADD_MESSAGE,
    body = ''
}) {
    ws.send(stringify({status, type, body}))
}

export function errorResponse(ws, {
    status = 400,
    type = msgTypes.ADD_MESSAGE,
    message = 'error'
}) {
    ws.send(stringify({status, type, message}))
}

export function successResponse(ws, {
    status = 200,
    message = 'success',
    type,
    body,
    tokens
}) {
    ws.send(stringify({
        status,
        message,
        type,
        body,
        tokens
    }))
}