import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_FAIL_400,

    USER_LOGOUT,
    
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_FAIL_400,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,
    USER_DETAILS_FAIL,
    USER_DETAILS_FAIL_400,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_FAIL_400,
    USER_UPDATE_PROFILE_RESET,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_RESET,
    USER_LIST_FAIL,
    USER_LIST_FAIL_400,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_FAIL_400,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_FAIL_400,
} from '../constants/userConstants'

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'
import { bindActionCreators } from 'redux'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        let url = 'http://127.0.0.1:8000/api/users/login/'
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({'username': email, 'password': password}),
            headers: {'Content-Type': 'application/json'}
        })
        let data = await response.json()
        if (response.ok) {


            dispatch({
                type:USER_LOGIN_SUCCESS,
                payload:data
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
        }
        else {
            dispatch({
                type: USER_LOGIN_FAIL_400,
                payload:data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: USER_LIST_RESET})
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        let url = 'http://127.0.0.1:8000/api/users/register/'
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({'name': name, 'email': email, 'password': password}),
            headers: {'Content-Type': 'application/json'}
        })
        let data = await response.json()
        if (response.ok) {


            dispatch({
                type:USER_REGISTER_SUCCESS,
                payload:data
            })

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
        }
        else {
            dispatch({
                type: USER_REGISTER_FAIL_400,
                payload:data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { 
            userLogin: { userInfo}
         } = getState()

        let url = `http://127.0.0.1:8000/api/users/${id}/`
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
                type:USER_DETAILS_SUCCESS,
                payload:data
            })
        }
        else {
            dispatch({
                type: USER_DETAILS_FAIL_400,
                payload:data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()

        let url = `http://127.0.0.1:8000/api/users/profile/update/`
        let response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        if (response.ok) {


            dispatch({
                type:USER_UPDATE_PROFILE_SUCCESS,
                payload:data
            })

            dispatch({
                type:USER_LOGIN_SUCCESS,
                payload:data
            })

            localStorage.setItem('userInfo', JSON.stringify(data))
        }
        else {
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL_400,
                payload:data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()

        let url = `http://127.0.0.1:8000/api/users/`
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
                type:USER_LIST_SUCCESS,
                payload:data
            })
        }
        else {
            dispatch({
                type: USER_LIST_FAIL_400,
                payload:data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()

        let url = `http://127.0.0.1:8000/api/users/delete/${id}/`
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        if (response.ok) {


            dispatch({
                type:USER_DELETE_SUCCESS,
                payload:data
            })
        }
        else {
            dispatch({
                type: USER_DELETE_FAIL_400,
                payload:data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()

        let url = `http://127.0.0.1:8000/api/users/update/${user._id}/`
        let response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        if (response.ok) {


            dispatch({
                type: USER_UPDATE_SUCCESS,
            })

            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: data
            })
        }
        else {
            dispatch({
                type: USER_UPDATE_FAIL_400,
                payload: data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}