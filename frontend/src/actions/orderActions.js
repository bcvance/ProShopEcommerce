import { 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL,
    ORDER_CREATE_FAIL_400, 

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL_400,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL_400,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL_400,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,
} from'../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `http://127.0.0.1:8000/api/orders/${id}/`
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        if (response.ok) {
            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: data
            })
        }
        else {
            dispatch({
                type: ORDER_DETAILS_FAIL_400,
                payload: data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `http://127.0.0.1:8000/api/orders/add/`
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        if (response.ok) {


            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data
            })

            dispatch({
                type: CART_CLEAR_ITEMS,
                payload: data
            })
            localStorage.removeItem('cartItems')
        }
        else {
            dispatch({
                type: ORDER_CREATE_FAIL_400,
                payload: data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `http://127.0.0.1:8000/api/orders/${id}/pay/`
        let response = await fetch(url, {
            method: 'PUT',
            data: JSON.stringify(paymentResult),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        if (response.ok) {
            dispatch({
                type: ORDER_PAY_SUCCESS,
                payload: data
            })
        }
        else {
            dispatch({
                type: ORDER_PAY_FAIL_400,
                payload: data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const listMyOrders = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `http://127.0.0.1:8000/api/orders/myorders/`
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        if (response.ok) {
            dispatch({
                type: ORDER_LIST_MY_SUCCESS,
                payload: data
            })
        }
        else {
            dispatch({
                type: ORDER_LIST_MY_FAIL_400,
                payload: data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}