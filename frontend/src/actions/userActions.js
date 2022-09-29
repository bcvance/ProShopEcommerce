import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_FAIL_400,
    USER_LOGOUT 
} from '../constants/userConstants'

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