import axios from 'axios';

import {
    FETCH_USER,
    FETCH_ITEM,
    FETCH_ITEMS,
    CREATE_ITEM,
    EDIT_ITEM,
    DELETE_ITEM,
    FOUND_ERROR,
    ADD_CART,
    DELETE_CART,
    SUBMIT_CART,
    FETCH_CART,
    API_ERROR,
    ERASE_ERROR,
    ERASE_CART
} 
from './types';

import history from '../history';



export const fetchUser = () => async (dispatch) => {
    const res = await axios.get("/api/current_user");
     dispatch({type:FETCH_USER,payload:res.data});
 };


export const fetchItems = () => async (dispatch) =>{
    const response = await axios.get("/api/items")

    if(response.data.error){
        dispatch({type:API_ERROR,payload:response.data.error});
    }else{
        dispatch({type:FETCH_ITEMS,payload:response.data.Founditems});
    }

};

export const fetchItem = (id) => async (dispatch) =>{
    const response = await axios.get(`/api/items/${id}`);

    if(response.data.error){
        dispatch({type:API_ERROR,payload:response.data.error});
    }else{
        dispatch({type:FETCH_ITEM,payload:response.data.item});
    }

};

export const createItem = (formValues) => async (dispatch) =>{
    const response = await axios.post("/api/items/new",formValues)
    if(response.data.error){
        dispatch({type:API_ERROR,payload:response.data.error});
    }else{
        dispatch({type:CREATE_ITEM,payload:response.data.item});
        history.push('/ItemsDashBoard')

    }

};

export const editItem = (id,formValues) => async (dispatch) =>{
    const response = await axios.patch(`/api/items/edit/${id}`,formValues);
    if(response.data.error){
        dispatch({type:API_ERROR,payload:response.data.error});
    }else{
        dispatch({type:EDIT_ITEM,payload:response.data.UpdatedItem});
        history.push('/ItemsDashBoard')

    }

};

export const deleteItem = (id) => async (dispatch) =>{
    const response = await axios.delete(`/api/items/delete/${id}`)
    if(response.data.error){
        dispatch({type:API_ERROR,payload:response.data.error});
    }else{
        dispatch({type:DELETE_ITEM,payload:id});
        history.push('/ItemsDashBoard')

    }

};


export const fetchCart = () => async(dispatch) =>{
    let data = (localStorage.getItem("cartItem")?JSON.parse(localStorage.getItem("cartItem")):{cartItem:[]});
    dispatch({type:FETCH_CART,payload:data});
}

export const addCart = (item,qty,size) => async (dispatch,getState) =>{
    let data = (localStorage.getItem("cartItem")?JSON.parse(localStorage.getItem("cartItem")):{cartItem:[]});
    const newId = (getState().cart.cartItem.length !== 0) ? getState().cart.cartItem[getState().cart.cartItem.length-1].id+1 : 1;
    const addItem = {id:newId,item,qty,size}
    data.cartItem.push(addItem);
    localStorage.setItem("cartItem",JSON.stringify(data));
    dispatch({type:ADD_CART,payload:data});
};

export const deleteCart = (cartId) => async (dispatch) =>{
    let data = (localStorage.getItem("cartItem")?JSON.parse(localStorage.getItem("cartItem")):{cartItem:[]});
    data.cartItem = data.cartItem.filter(item => item.id !== cartId);
    localStorage.setItem("cartItem",JSON.stringify(data));
    dispatch({type:DELETE_CART,payload:data});
};

export const eraseCart = ()=> async (dispatch) =>{
    localStorage.removeItem("cartItem");
    dispatch({type:ERASE_CART})

}


export const submitCart = () => async (dispatch) =>{

    //Create Order To Database
    dispatch({type:SUBMIT_CART})
};


export const foundError = (error) =>{

    return({type:FOUND_ERROR,payload:error})
}

export const eraseError = () => {
    return({type:ERASE_ERROR});
}

 
