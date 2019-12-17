import {
    FETCH_ITEM,
    FETCH_ITEMS,
    CREATE_ITEM,
    EDIT_ITEM,
    DELETE_ITEM,
    API_ERROR
} from '../actions/types';
import _ from 'loadsh';

export default (state = {},action) => {

    switch(action.type){
        case FETCH_ITEMS:
            return {...state,..._.mapKeys(action.payload,"_id")};
        case FETCH_ITEM:
            return {...state,[action.payload._id]:action.payload};
        case CREATE_ITEM:
            return {...state,[action.payload._id]:action.payload};
        case EDIT_ITEM:
            return {...state,[action.payload._id]:action.payload};
        case DELETE_ITEM:
            return _.omit(state,action.payload);
        case API_ERROR:
            return {...state,error:action.payload};
        default:
            return state;
    }


}