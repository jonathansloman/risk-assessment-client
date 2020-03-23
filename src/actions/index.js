export function userJoined(users) {
    return {
        type: 'PLAYER_JOINED',
        users: users
    }
}

export function userJoinedAck(thisUser) {
    return {
        type: 'PLAYER_JOINED_ACK',
        thisUser: thisUser
    }
}

export function userLeft(users) {
    return {
        type: 'PLAYER_LEFT',
        users: users
    }
}

export function messageReceived(message) {
    return {
        type: 'TEXT_MESSAGE',
        message: message
    }
}