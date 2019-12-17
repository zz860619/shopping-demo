import { combineReducers} from 'redux';
import authReducer from './authReducer';
import itemReducer from './itemReducer';
import cartReducer from './cartReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    auth:authReducer,
    items:itemReducer,
    cart:cartReducer,
    error:errorReducer
})