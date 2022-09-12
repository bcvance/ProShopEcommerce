import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const result = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
    const data = await result.json();

    dispatch({
        type:CART_ADD_ITEM,
        payload: {
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty:qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}