import {Schema} from "mongoose";

const userSchema = new Schema({
    login: {
        type: Schema.Types.String,
        required: [true, 'login is required'],
        unique: [true, 'login must be unique'],
        index: true
    },
    password: {
        type: Schema.Types.String,
        required: [true, 'password is required']
    },
    name: {
        type: Schema.Types.String
    },
    lastName: {
        type: Schema.Types.String
    },
    avatar: {
        type: Schema.Types.String
    },
    username: {
        type: Schema.Types.String,
        unique: [true, 'username must be unique'],
        required: false,
        default: null
    },
    settings: {
        type: Schema.Types.ObjectId,
        ref: 'Settings'
    },
    dialogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Dialog'
        }
    ],
    tokens: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Token'
        }
    ]
}, {
    timestamps: true
})

export default userSchema