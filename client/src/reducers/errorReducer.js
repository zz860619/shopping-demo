import{FOUND_ERROR,ERASE_ERROR} from '../actions/types';


export default (state=null,action) => {
    switch(action.type){
        case FOUND_ERROR:
            return action.payload;
        case ERASE_ERROR:
            return null;
        default:
            return state;
    }
}