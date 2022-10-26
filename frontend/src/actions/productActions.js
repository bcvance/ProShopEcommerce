
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
    try{
        dispatch({ type:PRODUCT_LIST_REQUEST })

        let url = 'http://127.0.0.1:8000/api/products';
        const response = await fetch(url);
        const  data = await response.json();

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({ type:PRODUCT_DETAILS_REQUEST })

        let url = `http://127.0.0.1:8000/api/products/${id}`;
        const response = await fetch(url);
        const  data = await response.json();

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `http://127.0.0.1:8000/api/products/delete/${id}/`
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    }catch(error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

