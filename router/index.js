import {msgTypes} from "../helpers/types.js";
import AuthController from "../controllers/authController.js";
import DialogController from "../controllers/dialogController.js";
import MessageController from "../controllers/messageController.js";
import UserController from "../controllers/userController.js";

export async function router(ws, json, type) {
    switch (type) {
        case msgTypes.LOGIN:
            return await AuthController.login(ws, json);

        case msgTypes.LOGOUT:
            return await AuthController.logout(ws, json);

        case msgTypes.REGISTRATION:
            return await AuthController.registration(ws, json);

        case msgTypes.CREATE_DIALOG:
            return await DialogController.create(ws, json);

        case msgTypes.DELETE_DIALOG:
            return await DialogController.delete(ws, json);

        case msgTypes.GET_DIALOGS:
            return await DialogController.get(ws, json);

        case msgTypes.ADD_MESSAGE:
            return await MessageController.create(ws, json);

        case msgTypes.GET_MESSAGES:
            return await MessageController.get(ws, json);

        case msgTypes.DELETE_MESSAGE:
            return await MessageController.delete(ws, json);

        case msgTypes.GET_PROFILE:
            return await UserController.get(ws, json)
    }
}