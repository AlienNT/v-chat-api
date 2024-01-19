import {errorResponse, successResponse} from "../helpers/response.js";
import {User} from "../models/userModel.js";
import {msgTypes} from "../helpers/types.js";
import {clients} from "../index.js";
import TokenService from "../services/tokenService.js";
import TokenController from "./tokenController.js";
import {errorLog} from "../helpers/index.js";

class AuthController {
    async login(ws, data) {
        try {
            const {login, password} = data?.body

            const user = await User.findOne({
                login, password
            })

            if (!user) return

            const {refreshToken} = TokenService.create()
            const savedToken = await TokenController.create(ws, {
                userId: user?._id,
                token: refreshToken

            })

            if (savedToken) {
                user.tokens.push(savedToken?._id)
                user.save()
            }

            successResponse(ws, {
                type: msgTypes.LOGIN,
                body: user,
                tokens: {
                    refreshToken: savedToken?.value
                }
            })
            clients[ws.id].token = savedToken?.value

        } catch (e) {
            errorLog({title: 'authController LOGIN', error: e})
        }
    }

    async logout(ws, data) {
        try {

        } catch (e) {
            errorLog({title: 'authController LOGOUT', error: e})
        }
    }

    async registration(ws, data) {
        try {
            const {login, password} = data?.body

            const user = await User.findOne({
                login
            })

            if (user) {
                return errorResponse(ws, {
                    type: msgTypes.REGISTRATION,
                    message: 'user already exist'
                })
            }

            const newUser = await User.create({
                ...data?.body,
                name: login,
                password,
            })

            if (newUser) {
                successResponse(ws, {
                    type: msgTypes.REGISTRATION,
                    body: newUser,
                })
            }
        } catch (e) {
            errorLog({title: 'authController REGISTRATION', error: e})
        }
    }
}

export default new AuthController()