import { createStore } from "redux";

import rooReducers from "./reducer";

const store = createStore(rooReducers)


export default store