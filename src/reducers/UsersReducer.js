
export default function (state = [], action) {
    if (action.table != null) {
      return action.table;
    }

    return state;
}