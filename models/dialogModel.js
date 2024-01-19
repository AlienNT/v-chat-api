import {model} from "mongoose";
import {dialogSchema} from "../schemas/dialogSchema.js";

export const Dialog = model('Dialog', dialogSchema)