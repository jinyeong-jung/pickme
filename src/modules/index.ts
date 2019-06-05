import { combineReducers } from "redux";
import championReducer from "./champion";
import matchReducer from "./match";

const rootReducer = combineReducers({
  championReducer,
  matchReducer
});

export default rootReducer;
