import {model} from "mongoose";
import {tokenSchema} from "../schemas/tokenSchema.js";

export const Token = model('Token', tokenSchema)