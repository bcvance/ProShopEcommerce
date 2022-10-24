import { 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL,
    ORDER_CREATE_FAIL_400, 
} from'../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

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