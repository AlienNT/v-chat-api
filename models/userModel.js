import {model} from "mongoose";
import userSchema from "../schemas/userSchema.js";

export const User = model('User', userSchema)