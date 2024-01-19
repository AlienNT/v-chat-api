import {Schema} from "mongoose";

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: [true, 'sender is required']
    },
    dialog: {
        type: Schema.Types.ObjectId, ref: 'Dialog',
        required: [true, 'dialog id is required']
    },
    type: {
        type: Schema.Types.String,
        default: 'text'
    },
    delivered: {
        type: Schema.Types.Boolean,
        default: false
    },
    read: {
        type: Schema.Types.Boolean,
        default: false
    },
    message: {
        type: Schema.Types.String
    },
    files: {
        type: Schema.Types.String
    }
}, {
    timestamps: true
})

export default messageSchema