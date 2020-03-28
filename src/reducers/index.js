import { combineReducers } from "redux";
import UsersReducer from './UsersReducer';
import MessagesReducer from './MessagesReducer';
import ThisUserReducer from './ThisUserReducer';
import CardsReducer from './CardsReducer';

const rootReducer = combineReducers({
    table: UsersReducer,
    messages: MessagesReducer,
    thisUser: ThisUserReducer,
    cards: CardsReducer
});

export default rootReducer;