import { combineReducers } from 'redux';
import checkReducer from './checkReducer';
import userReducer from './userReducer';


export default combineReducers({
    checkReducer,
    userReducer
});