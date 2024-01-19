import {createUUID} from "../helpers/token.js";

class TokenService {
    create() {
        return {
            refreshToken: createUUID()
        }
    }
}

export default new TokenService()