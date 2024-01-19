import {Token} from "../models/tokenModel.js";
import {errorLog} from "../helpers/index.js";

class TokenController {
    async create(ws, data){
        try {
            const {token, userId} = data

            return await Token.create({
                value: token,
                user: userId
            })

        } catch (e) {
            errorLog({title: 'tokenController CREATE', error: e})
        }
    }
    async delete(ws, data){
        try {

        } catch (e) {
            errorLog({title: 'tokenController DELETE', error: e})
        }
    }
}
export default new TokenController()