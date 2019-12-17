import {ADD_CART,DELETE_CART,SUBMIT_CART, FETCH_CART,ERASE_CART} from '../actions/types';


export default function (state = {},action) {

    switch(action.type){
        case FETCH_CART:
            return action.payload;
        case ADD_CART:
            return action.payload;
        case DELETE_CART:
            return action.payload;
        case ERASE_CART:
            return {cartItem:[]};
        case SUBMIT_CART:
            return state;
        default:
            return state;
    }
}