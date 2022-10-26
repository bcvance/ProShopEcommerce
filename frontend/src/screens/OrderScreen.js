import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'



function OrderScreen() {
    let { id } = useParams()

    const orderDetails = useSelector(state => state.orderDetails)
    const  { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const  { loading:loadingPay, success:successPay } = orderPay

    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)
    
    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item)=> acc + item.price * item.qty, 0).toFixed(2)
    }

    const addPaypalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=AZ2qASGm1wl9dXNX8TFDybFtWaOtXCMHneIvr_lJB8mx-nLkwYbU9F3-HYq7IWozpmsjTOJNg8mV5qWy&currency=USD`
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        // get order deatails if we don't have order details, order details don't match 
        // order id in url params, or payment status changes
        if (!order || successPay || order._id !== Number(id)) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(id))
        }else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript()
            }else {
                setSdkReady(true)
            }
        }
    }, [order, id, dispatch, successPay])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

  return loading ? (
    // determine whether to show loader, error Message, or page content
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
        <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: {order.user.name}</strong></p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                       

                        <p>
                            <strong>Shipping: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}
                            {'  '}
                            {order.shippingAddress.postalCode},
                            {'  '}
                            {order.shippingAddress.country}

                        </p>
                        {order.deliveredAt ? (
                            <Message variant='success'>Delivered on {order.paidAt}</Message>
                        ) : (
                            <Message variant='warning'>Not yet delivered</Message>
                        )}
                    </ListGroup.Item>
                        
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidAt}</Message>
                        ) : (
                            <Message variant='warning'>Not yet paid</Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>

                        {order.orderItems.length === 0 ? <Message variant='info'>
                            Order is empty
                        </Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>

                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Items:
                                </Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Shipping
                                </Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Tax:
                                </Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Total:
                                </Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}

                                {!sdkReady ? (
                                    <Loader />
                                ) : (
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}    
                                    />
                                )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>

  )
}

export default OrderScreen