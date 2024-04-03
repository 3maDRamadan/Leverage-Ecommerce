import HandleCart from "./handleCart";

import { combineReducers } from "redux";

const rooReducers = combineReducers({
  handleCart : HandleCart
})

export default rooReducers