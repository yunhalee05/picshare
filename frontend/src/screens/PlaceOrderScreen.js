import React ,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import {Link} from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

function PlaceOrderScreen(props) {
    const cart = useSelector(state=>state.cart);
    if(!cart.paymentMethod){
        props.history.push('/payment');
    }

    const orderCreate  = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2))

    cart.itemsPrice = toPrice(cart.cartItems.reduce((a,c)=> a+c.qty*c.price,0))    

    cart.shippingPrice = cart.itemsPrice >100 ? toPrice(0):toPrice(10);
    cart.taxPrice = toPrice(0.15*cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice+cart.taxPrice;
    
    const dispatch = useDispatch()
    const placeOrderHandler= () =>{
        dispatch(createOrder({...cart, orderItems:cart.cartItems}))
    }

    useEffect(() => {
        if(success){
            props.history.push(`/order/${order._id}`)
            dispatch({
                type:ORDER_CREATE_RESET
            })
        }
    }, [success, dispatch, order, props.history])

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="order">
                <div className="tape-container"><div className="tape"></div></div>
                <div className="order-card">
                    <div className="order-card-body">
                        <div className="order-id-container">
                            PLACE ORDER 
                        </div>
                        <div className="order-card-info">
                            <div className="order-card-title">
                                &nbsp;-SHIPPING
                            </div>
                            <div className="order-card-container">
                                <div className="order-card-value">
                                    {cart.shippingAddress.fullName}
                                </div>
                                <div className="order-card-value">
                                    {cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                                </div>
                            </div>
                        </div>
                        <div className="order-card-info">
                            <div className="order-card-title">
                                &nbsp;-PAYMENT
                            </div>
                            <div className="order-card-container">
                                <div className="order-card-value">
                                    {cart.paymentMethod}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="order-item">
                    {cart.cartItems.map(item=>(
                        <div key = {item.product}>
                            <div className="order-row">
                                <div className="order-image">
                                    <img src={item.image} alt={item.name}/>
                                </div>
                                <div className="order-product-info">
                                    <div className="order-info-container">
                                        {/* <span className="cart-info-name">Product Name : </span> */}
                                        <span className="cart-info-value">
                                            <Link to={`/product/${item.product}`} >{item.name}</Link>
                                        </span>
                                    </div>
                                    <div className="order-info-container">
                                        {/* <span className="cart-info-name">Product Name : </span> */}
                                        <span className="cart-info-value">
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>

                <div className="order-info">
                    <div className="ordertitle">ORDER SUMMARY</div>
                        <div className="subtotal">
                            <span className="subtotal-name">Items</span>
                            <span className="subtotal-value">${cart.itemsPrice.toFixed(2)}</span>
                        </div>
                        <div className="subtotal">
                            <span className="subtotal-name">Shipping</span>
                            <span>${cart.shippingPrice.toFixed(2)}</span>
                        </div>
                        <div className="subtotal">
                            <span className="subtotal-name">Tax</span>
                            <span>${cart.taxPrice.toFixed(2)}</span>
                        </div>
                        <div className="subtotal">
                            <span className="subtotal-name">Order Total</span>
                            <span>${cart.totalPrice.toFixed(2)}</span>
                        </div>
                        <button type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length===0}>Place Order</button>
                        {
                                loading && <LoadingBox ></LoadingBox>
                            }
                            {
                                error && <MessageBox variant = 'danger'>{error}</MessageBox>
                            }
                    </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen
