import {User} from "../models/userModel.js";
import {Token} from "../models/tokenModel.js";
import {successResponse} from "../helpers/response.js";
import {msgTypes} from "../helpers/types.js";
import {populatedFields, userFields} from "../helpers/publicFields.js";
import {errorLog} from "../helpers/index.js";

class UserController {
    async get(ws, data) {
        try {
            const {token} = data

            const tokenWithUserData = await Token.findOne({
                value: token
            }).populate(
                populatedFields.USER.path,
                populatedFields.USER.fields
            )

            if (!tokenWithUserData || !tokenWithUserData?.user) return

            return successResponse(ws, {
                type: msgTypes.GET_PROFILE,
                body: tokenWithUserData?.user
            })
        } catch (e) {
            errorLog({title: 'userController GET', error: e})
        }
    }

    async getByUsername(ws, data) {
        try {
            const {nickName} = data

            const user = await User.findOne({
                nickName
            })

            if (!user) return

            successResponse(ws, {
                type: msgTypes.GET_USER,
                body: userFields(user)
            })
        } catch (e) {
            errorLog({title: 'userController GET_BY_USERNAME', error: e})
        }
    }

    async update(ws, data) {
        try {

        } catch (e) {
            errorLog({title: 'userController UPDATE', error: e})
        }
    }
}

export default new UserController()