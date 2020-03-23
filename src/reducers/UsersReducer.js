
export default function (state = [], action) {
    switch (action.type) {
        case 'PLAYER_JOINED':
        case 'PLAYER_LEFT':
            const us = action.users && action.users.length > 0 ? action.users : [];
            return us;
        default:
    }

    return state;
}