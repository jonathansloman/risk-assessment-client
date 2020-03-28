
export default function (state = [], action) {
    if (action.cards != null) {
      return action.cards;
    }
    return state;
}