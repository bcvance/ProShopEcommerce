import React, { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Message } from '../components/Message'
import { addToCart } from '../actions/cartActions'

function CartScreen() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const qty = Number(searchParams.get('qty'));

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log('cartItems:',cartItems)

    useEffect(() => {
        if(id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])
  return (
    <div>
        Cart
    </div>
  )
}

export default CartScreen