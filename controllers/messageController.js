import {clients} from "../index.js";
import {successResponse} from "../helpers/response.js";
import {msgTypes} from "../helpers/types.js";
import {Message} from "../models/messageModel.js";
import {Dialog} from "../models/dialogModel.js";
import {populatedFields} from "../helpers/publicFields.js";
import {errorLog, successLog} from "../helpers/index.js";


class MessageController {
    async create(ws, data) {
        try {
            console.log('message', data)

            const {message} = data?.body
            const {dialogId} = data?.body
            const senderId = ws.userId

            const dialog = await Dialog.findById(dialogId)

            if (!dialog) return

            const newMessage = await Message.create({
                ...message,
                sender: senderId,
                dialog: dialogId
            })

            if (!newMessage) return

            if (dialog) {
                dialog.messages.push(newMessage?._id)
                dialog.save()
            }

            const messageToSend = await Message.findById(
                newMessage?._id
            ).populate(
                populatedFields.SENDER.path,
                populatedFields.SENDER.fields
            )

            successLog({title: 'messageToSend', message: messageToSend})

            const recipientsWs = Object.keys(clients).filter(key => dialog.members.filter(id => clients[key]?.userId === id))

            recipientsWs.forEach(id =>
                successResponse(clients[id], {
                    type: msgTypes.ADD_MESSAGE,
                    body: messageToSend
                })
            )

        } catch (e) {
            errorLog({title: 'messageController CREATE', error: e})
        }
    }

    async get(ws, data) {
        try {
            const {dialogId} = data?.body
            const dialog = await Dialog.findById(dialogId)
                .populate({
                    path: populatedFields.MESSAGES.path,
                    options: {
                        limit: null
                    },
                    populate: {
                        path: populatedFields.SENDER.path,
                        select: populatedFields.SENDER.fields
                    }
                }).lean()

            if (!dialog) return

            const {messages, members} = dialog

            successResponse(ws, {
                type: msgTypes.GET_MESSAGES,
                body: {messages, members, dialog: dialogId}
            })
        } catch (e) {
            errorLog({title: 'messageController GET', error: e})
        }
    }

    async delete(ws, data) {
        try {

        } catch (e) {
            errorLog({title: 'messageController DELETE', error: e})
        }
    }
}

export default new MessageController()