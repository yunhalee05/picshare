import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import MessageBox from '../components/MessageBox'


function CartScreen(props) {
    const productId = props.match.params.id
    const qty = props.location.search? Number(props.location.search.split('=')[1]):1

    const cart = useSelector(state=>state.cart);
    const {cartItems, error} = cart;    

    const  dispatch = useDispatch()
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    },[dispatch, productId, qty])

    const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id));
    }

    const checkoutHandler=()=>{
        props.history.push('/signin?redirect=shipping');
    }
    return (

       <div className="cart">
            <div className="shopping-info-hidden">
                <div className="carttitle">SHOPPING CART</div>
                <div className="subtotal">
                    <span className="subtotal-name">Subtotal ({cartItems.reduce((a, c)=> a+c.qty, 0)} items): </span>
                    <span className="subtotal-value"> &nbsp; ${cartItems.reduce((a, c)=> a+ c.price*c.qty,0)} &nbsp;</span>
                </div>
                <button type="button"  onClick={checkoutHandler} disabled={cartItems.length===0}>Checkout</button>
           </div>
           <div className="cart-item" >
               {error && <MessageBox variant='danger'>{error}</MessageBox>}
               {    
                cartItems.length ===0
                ? <MessageBox>Cart is Empty. <Link to ="/">Go Shopping</Link></MessageBox>
                :
                    cartItems.map((item)=>(
                        <div key = {item.product}>
                            <div className="cart-row" >
                                <div className="cart-image">
                                    <img src={item.image} alt={item.name} />
                                </div>

                                <div className="cart-product-info">
                                    <div className="cart-info-container">
                                        <span className="cart-info-name">Product Name : </span>
                                        <span className="cart-info-value">
                                            <Link to={`/product/${item.product}`} >{item.name}</Link>
                                        </span>
                                    </div>

                                    <div className="cart-info-container">
                                        <span className="cart-info-name">Cost : </span>
                                        <span className="cart-info-value">
                                            ${item.price}
                                        </span>
                                    </div>

                                    <div className="cart-info-container">
                                        <span className="cart-info-name">Quantity : </span>
                                        <span className="cart-info-value" >
                                            <select value={item.qty} onChange={e=>dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map(
                                                    x=><option key={x+1} value={x+1}>{x+1}</option>
                                            )}
                                            </select>
                                        </span>
                                    </div>

                                </div>
                                <button type="button" onClick={()=>removeFromCartHandler(item.product)}><i class="fas fa-times"></i></button>
                            </div>
                        </div>
                    ))
                }
           </div>
           <div className="shopping-info">
                <div className="carttitle">SHOPPING CART</div>
                <div className="subtotal">
                    <span className="subtotal-name">Subtotal ({cartItems.reduce((a, c)=> a+c.qty, 0)} items): </span>
                    <span className="subtotal-value"> &nbsp; ${cartItems.reduce((a, c)=> a+ c.price*c.qty,0)} &nbsp;</span>
                </div>
                <button type="button"  onClick={checkoutHandler} disabled={cartItems.length===0}>Checkout</button>
           </div>
       </div>
    )
}

export default CartScreen
