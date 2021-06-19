import React,{useEffect, useState} from 'react'
import Rating from '../components/Rating'
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createReview, detailsProduct } from '../actions/productActions';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import {FaHamburger} from "react-icons/fa";


function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails=useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails;

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')



    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {loading:loadingReviewCreate, error:errorReviewCreate, success:successReviewCreate} = productReviewCreate
   
    useEffect(() => {
        if(successReviewCreate){
            window.alert('Review Submitted Successfully')
            setRating('')
            setComment('')
            dispatch({
                type:PRODUCT_REVIEW_CREATE_RESET
            })
        }
        dispatch(detailsProduct(productId));
    }, [dispatch, productId,successReviewCreate]);

    const addToCartHandler = () =>{
        props.history.push(`/cart/${productId}?qty=${qty}`);

    }
 const submitHandler = (e) =>{
        e.preventDefault();
        if(comment && rating){
            dispatch(createReview(productId, {rating, comment, name:userInfo.name}))
        }else{
            alert('Please enter comment and rating.')
        }
    }
    return ( 
        <div>
        {loading ?(
        <LoadingBox></LoadingBox>
        ): error?(
        <MessageBox variant="danger">{error}</MessageBox>
        ): (
        <div>
            <Link to ="/" style={{"color":"white","borderRadius":"50%", "backgroundColor":"black", "padding":"10px", "marginLeft":"2rem"}}>Back to result</Link>

            <div className="row top" style={{"position":"relative"}}>
                <div className="col-2" style={{"textAlign":"center"}}>
                    <img className="large"src={product.image} alt={product.name} />
                </div>
                {/* <div className="col-1" style={{"position":"absolute", "right":"2rem"}}>
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating rating={product.rating} numReviews={product.numReviews}/>
                        </li>
                        <li>
                            Price : ${product.price}
                        </li>
                        <li>
                            Description: <p>{product.description}</p>
                        </li>
                    </ul>
                </div> */}
                <div className="col-1" style={{"textAlign":"center", "marginTop":"6rem"}}>
                    <div className="seller-container" >
                            <img className="seller-logo" src={product.seller.seller.logo} alt="" />
                    </div>
                    <div style={{"transform":"translate(0, -150px)"}}>
                            <Link style={{"fontSize":"8.5rem", "fontStyle":"italic","WebkitTextStroke":"1.5px black", "color":"white"}} to={`/seller/${product.seller._id}`}>{product.seller.seller.name.toUpperCase()}</Link>
                    </div>
                    <div style={{"padding": "0 7rem 0 7rem","transform":"translate(0, -40px)", "fontSize":"2rem"}}>
                            <ul>
                                <li>
                                    <div className="productdetail-name">{product.name}</div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Price</div>
                                        <div className="price">${product.price}</div>
                                    </div>   
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Status</div>
                                        <div className="status">{product.countInStock>0?( <span className="success">In Stock</span>) : (<span className="danger">Unavailable</span>) }</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Description</div>
                                        <div className="description">{product.description}</div>
                                    </div>
                                </li>
                                {product.countInStock > 0 && (
                                    <>
                                        <li>
                                            <div className="row">
                                                <div>Qty</div>
                                                <div>
                                                    <select value={qty} onChange={(e)=> setQty(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map(
                                                            (x)=>(<option key={x+1}value={x+1}>{x+1}</option>
                                                        )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button onClick={addToCartHandler} className="primary block">
                                                ADD TO CART
                                            </button>
                                        </li>
                                        </>
                                )}
                        </ul>
                    </div>
                </div>

            </div>
            <hr/>
            <div className="row">
                <div className="col-2">
                    <h2 id="reviews" style={{"textAlign":"center"}}></h2>
                    {product.reviews.length ===0 && <MessageBox>There is no reviews.</MessageBox> }
                    <ul>
                        {product.reviews.map(review=>(
                            <li key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating rating = {review.rating} caption=" "></Rating>
                                <p>
                                    {review.createdAt.substring(0,10)}
                                </p>
                                <p>
                                    {review.comment}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-1" style={{"padding": "1rem 2rem 4rem 2rem"}}>
                    <ul>
                        <li>
                            {userInfo? (
                                <form onSubmit={submitHandler} className="form">
                                    <div style={{"textAlign":"center", "fontSize":"5rem"}}>
                                        <FaHamburger style={{"padding":"0", "margin":"0"}}/>write a review
                                    </div>
                                    <div>
                                        <label htmlFor="rating">Rating</label>
                                        <select id="rating" value={rating} onChange={e=>setRating(e.target.value)}>
                                            <option value="">Select...</option>
                                            <option value="1">1- Poor</option>
                                            <option value="2">2- Fair</option>
                                            <option value="3">3- Good</option>
                                            <option value="4">4- Very Good</option>
                                            <option value="5">5- Excelent</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="comment">Comment</label>
                                        <textarea id="comment" value={comment} onChange={e=>setComment(e.target.value)}></textarea>
                                    </div>
                                    <div style={{"padding":"4rem"}}>
                                        <label></label>
                                        <button className="primary" type="submit">SUBMIT</button>
                                    </div>
                                    <div>
                                        {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                        {errorReviewCreate && (<MessageBox variant='danger'>{errorReviewCreate}</MessageBox>)}
                                    </div>
                                </form>
                            ): (
                                <MessageBox>Please <Link to ="/signin">Sign In</Link> to write a review.</MessageBox>
                            )}
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        )}
        </div>
    )
}

export default ProductScreen
