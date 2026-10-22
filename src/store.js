import { combineReducers, legacy_createStore } from "redux";
import panierReducer from "./redux/reducers/panierReducers.js";
import articleReducer from "./redux/reducers/articleReducers.js";
import checkoutReducer from "./redux/reducers/checkoutReducers.js";

const rootReducer = combineReducers({
  articles: articleReducer,
  panier: panierReducer,
  checkout: checkoutReducer,
});

const store = legacy_createStore(rootReducer);
export default store