export function userJoined(table) {
    return {
        type: 'PLAYER_JOINED',
        table: table
    }
}

export function userJoinedAck(thisUser) {
    return {
        type: 'PLAYER_JOINED_ACK',
        thisUser: thisUser
    }
}

export function userLeft(table) {
    return {
        type: 'PLAYER_LEFT',
        table: table
    }
}

export function messageReceived(message, table, cards) {
    return {
        type: 'TEXT_MESSAGE',
        table: table,
        message: message,
        cards: cards
    }
}