import {sendMessage} from "../helpers/response.js";
import {msgTypes} from "../helpers/types.js";
import {Dialog} from "../models/dialogModel.js";
import {User} from "../models/userModel.js";
import {populatedFields} from "../helpers/publicFields.js";
import {errorLog} from "../helpers/index.js";


class DialogController {
    async create(ws, data) {
        try {
            console.log('dialog', data)
            const {members} = data?.body

            if (members?.length < 2) {
                return sendMessage(ws, {
                    type: msgTypes.RESPONSE_STATUS,
                    body: ''
                })
            }

            const dialog = await Dialog.create(members)

            members.map(async member => {
                const user = await User.findById(member)

                if (user) {
                    user.dialogs.push(dialog._id)
                    user.save()
                }
            })

        } catch (e) {
            errorLog({title: 'dialogController CREATE', error: e})
        }
    }

    async get(ws, data) {
        try {
            const {userId} = ws
            const dialogs = await Dialog.find({
                members: {$in: userId}
            }).populate(
                populatedFields.MEMBERS.path,
                populatedFields.MEMBERS.fields
            )

            if (!dialogs?.length) return

            return sendMessage(ws, {
                type: msgTypes.GET_DIALOGS,
                body: dialogs
            })
        } catch (e) {
            errorLog({title: 'dialogController GET', error: e})
        }
    }

    async delete(ws, data) {
        try {

        } catch (e) {
            errorLog({title: 'dialogController DELETE', error: e})
        }
    }
}

export default new DialogController()