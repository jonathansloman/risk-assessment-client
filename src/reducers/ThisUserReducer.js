
export default function (state = null, action) {
    switch (action.type) {
        case 'PLAYER_JOINED_ACK':
            return action.thisUser;
        default:
    }

    return state;
}