import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const params = [thunk];
if(process.env.NODE_ENV === "development"){
  params.push(logger)
}

const store = createStore(reducer, applyMiddleware(...params));


export default store;