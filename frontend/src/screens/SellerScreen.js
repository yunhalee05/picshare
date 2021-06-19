import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { detailsUser } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';

function SellerScreen(props) {
    const sellerId = props.match.params.id;
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const productList = useSelector(state => state.productList)
    const {loading:loadingProducts,error:errorProducts,products } = productList
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(detailsUser(sellerId))
        dispatch(listProducts({seller:sellerId}))
    }, [dispatch, sellerId])

    return (
        <div className="row top">
            <div className="col-1">
                {loading? <LoadingBox></LoadingBox> :
                 error? <MessageBox variant='danger'>{error}</MessageBox> :
                 (
                     <>
                    <div className="col-1" style={{"textAlign":"center", "marginTop":"6rem" , "padding":"4rem"}}>
                        <div className="seller-container" style={{"height":"50rem", "width":"50rem"}} >
                                <img className="seller-logo" src={user.seller.logo} alt="" />
                        </div>
                        <div style={{"transform":"translate(0, -300px)"}}>
                                <div style={{"fontSize":"10rem", "fontStyle":"italic","WebkitTextStroke":"1.5px black", "color":"white"}} to={`/seller/${user.seller._id}`}>{user.seller.name.toUpperCase()}</div>
                        </div>
                        <div className="seller-information">
                            <div className="row" style={{"marginTop":"1rem"}}>
                                <div style={{"fontSize":"4rem"}}>Seller reviews</div>
                                <Rating rating = {user.seller.rating} numReviews = {user.seller.numReviews}></Rating>
                            </div>
                            <div className="row" style={{"marginTop":"2rem"}}>
                                <div style={{"fontSize":"4rem"}}>Description</div>
                                <div>{user.seller.description}</div>
                            </div>
                            <div className="row" style={{"marginTop":"2rem"}}>
                                <div style={{"fontSize":"4rem"}}>Email</div>
                                <div>{user.email}</div>
                            </div>
                        </div>
                            <button className="primary" style={{"transform":"translate(0, -50px"}}>
                                <a href={`mailto :${user.email}`}  style={{"color":"white"}}>Contact Seller</a>
                            </button>
                     </div>
                     {/* <ul className="card card-body">
                        <li>
                            <div className="row start">
                                <div className="p-1">
                                    <img className="small" src={user.seller.logo} alt={user.seller.name} />
                                </div>
                                <div className="p-1">
                                    <h1>{user.seller.name}</h1>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Rating rating = {user.seller.rating} numReviews = {user.seller.numReviews}></Rating>
                        </li>
                        <li>
                            <a href={`mailto :${user.email}`}>Contact Seller</a>
                        </li>
                        <li>
                            {user.seller.description}
                        </li>
                     </ul> */}
                     </>
                 )
                }
            </div>
            <div className="col-3">
                 {loadingProducts? <LoadingBox></LoadingBox> :
                 errorProducts? <MessageBox variant='danger'>{errorProducts}</MessageBox> :
                 (
                     <>
                    {products.length===0 &&<MessageBox>No Product Found</MessageBox>}
                    <div className="row center">
                            {products.map(product=>(
                        <div className="col-1" style={{"alignSelf":"flex-start"}}>
                        <Product key={product._id}  product = {product}/> 
                        </div>
                        ))}
                    </div>
                    </>
                 )
                }
            </div>
        </div>
    )
}

export default SellerScreen
