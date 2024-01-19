export function userFields (fields) {
    const {name, lastName, username, description, avatar, lastVisit} = fields

    return {name, lastName, username, description, avatar, lastVisit}
}

export function messageSenderFields (fields) {
    const {name, lastName, username, avatar} = fields

    return {name, lastName, username, avatar}
}
export function profileFields (fields) {
    return {

    }
}

export const populatedFields = {
    USER: {
        path: 'user',
        fields: ['login', 'name', 'username', 'avatar', 'lastName']
    },
    SENDER: {
        path: 'sender',
        fields: ['name', 'lastName', 'avatar', 'username']
    },
    MESSAGES: {
        path: 'messages'
    },
    MEMBERS: {
        path: 'members',
        fields: ['name', 'lastName', 'avatar', 'username']
    },
}