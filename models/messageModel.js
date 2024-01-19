import messageSchema from "../schemas/messageSchema.js";
import {model} from "mongoose";


export const Message = model('Message', messageSchema)