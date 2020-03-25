
export default function (state = [], action) {
    switch (action.type) {
        case 'PLAYER_JOINED':
        case 'PLAYER_LEFT':
            const us = action.table;
            return us;
        default:
    }

    return state;
}