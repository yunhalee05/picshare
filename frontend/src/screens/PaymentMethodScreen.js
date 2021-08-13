import React, {useState} from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {useDispatch, useSelector} from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions';

function PaymentMethodScreen(props) {

    const cart = useSelector(state=>state.cart);
    const {shippingAddress} = cart;
    if(!shippingAddress.address){
        props.history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState("PayPal")
    const dispatch = useDispatch();


    const onSubmitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');

    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="payment">
            <form onSubmit={onSubmitHandler} className="payment-form">
                <div className="payment-title">
                    PAYMENT METHOD
                </div>
                <div className="container">

                        <input type="radio" id="paypal" value="Paypal" name="paymentMethod" required checked onChange= {e=>setPaymentMethod(e.target.value)} />
                        <label htmlFor="paypal">PayPal</label>
                </div>
                <div className="container">
                        <input type="radio" id="stripe" value="Stripe" name="paymentMethod" required onChange= {e=>setPaymentMethod(e.target.value)} />
                        <label htmlFor="stripe">Stripe</label>
                </div>
                <div className="container">
                    <button  type="submit">Continue</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default PaymentMethodScreen
