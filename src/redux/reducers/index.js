import loggedReducer from './isLogged'
import { combineReducers } from "redux"

const allReducers = combineReducers({
    isLoggedIn: loggedReducer
});

export default allReducers;