import {Schema} from "mongoose";

export const dialogSchema = new Schema({
    members: [
        {
            type: Schema.Types.ObjectId, ref: 'User'
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId, ref: 'Message'
        }
    ],
    type: {
        type: Schema.Types.String,
        default: 'dialog'
    }
}, {
    timestamps: true
})