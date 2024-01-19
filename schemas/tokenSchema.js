import {Schema} from "mongoose";

export const tokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    value: {
        type: Schema.Types.String,
        required: [true, 'token is required']
    }
}, {
    timestamps: true
})