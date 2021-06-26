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
        <>
       <div className="row top">
           <div className="col-1" >
               {error && <MessageBox variant='danger'>{error}</MessageBox>}
               {cartItems.length ===0? 
                    (<MessageBox>
                        Cart is Empty. 
                        <Link to ="/">Go Shopping</Link>
                    </MessageBox>
                    ):(
                    <ul>
                        {
                            cartItems.map(item=>(
                                <li key = {item.product}>
                                    <div className="cart-row" >
                                        <div className="col-1">
                                            <img src={item.image} alt={item.name} className="small"/>
                                        </div>
                                        <div className="col-1">
                                            <ul>
                                                <li>
                                                    <div className="row">
                                                        <div>Product Name : </div>
                                                        <Link to={`/product/${item.product}`} style={{"color":"black" ,"marginRight":"2rem"}}>{item.name}</Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="row">
                                                        <div>Cost : </div>
                                                        <div style={{"marginRight":"2rem"}}>
                                                            ${item.price}
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="row">
                                                        <div>Quantity : </div>
                                                        <div style={{"marginRight":"2rem"}}>
                                                            <select value={item.qty} onChange={e=>dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                            {[...Array(item.countInStock).keys()].map(
                                                                    (x)=>(<option key={x+1}value={x+1}>{x+1}</option>
                                                                )
                                                            )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div style={{"textAlign":"center"}}>
                                                    <div>
                                                        <button type="button" style={{"color":"white","borderRadius":"50%", "backgroundColor":"black", "padding":"10px"}} onClick={()=>removeFromCartHandler(item.product)}>Delete</button>
                                                    </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    )}
           </div>
           <div className="col-1">
               <div className="card card-body" style={{"marginTop":"6rem", "paddingTop":"0rem"}}>
                        <ul style={{"textAlign":"center"}}>
                            <li>
                                <div className="carttitle">SHOPPING CART</div>
                            </li>
                            <li style={{"fontSize":"3rem", "fontWeight":"600", "padding":"1rem" ,"marginTop":"5rem"}}>
                                <div className="row" style={{"justifyContent":"space-evenly"}}>
                                    <div>Subtotal ({cartItems.reduce((a, c)=> a+c.qty, 0)} items): </div>
                                    <div style={{"backgroundColor":"#fcba03", "fontStyle":"italic"}}> &nbsp; ${cartItems.reduce((a, c)=> a+ c.price*c.qty,0)} &nbsp;</div>
                                </div>
                            </li>
                            <li>
                                <button style={{"marginTop":"4rem"}} type="button" className="formbutton" onClick={checkoutHandler} disabled={cartItems.length===0}>Checkout</button>
                            </li>
                        </ul>
               </div>
           </div>
       </div>
       </>
    )
}

export default CartScreen
