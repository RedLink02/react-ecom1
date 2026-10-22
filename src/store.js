import { combineReducers, legacy_createStore } from "redux";
import panierReducer from "./redux/reducers/panierReducers.js";
import articleReducer from "./redux/reducers/articleReducers.js";

const rootReducer = combineReducers({
  articles: articleReducer,
  panier: panierReducer,
});

const store = legacy_createStore(rootReducer);
export default store