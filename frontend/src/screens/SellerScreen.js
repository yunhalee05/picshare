import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { detailsUser } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import SearchProduct from '../components/SearchProduct';

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
        <div className="seller-screen">
            <div className="seller-info-container">
                {loading? <LoadingBox></LoadingBox> :
                 error? <MessageBox variant='danger'>{error}</MessageBox> :
                 (
                     <>
                     <div className="seller-info-logo">
                        <img  src={user.seller.logo} alt="" />
                        <div className="seller-info-name">{user.seller.name.toUpperCase()}</div>
                     </div>

                     <div className="seller-info-information" style={{display:"flex", justifyContent:"flex-end"}}>
                        <Rating rating = {user.seller.rating} numReviews = {user.seller.numReviews}></Rating>
                     </div>

                     <div className="seller-info-information">
                        <label>Description : </label>
                        <span>{user.seller.description}</span>
                     </div>

                     <div className="seller-info-information">
                        <label >Email : </label>
                        <span >{user.email}</span>
                     </div>

                    <div className="seller-info-button">
                        <button>
                            <a href={`mailto:${user.email}`}  style={{"color":"white"}}>Contact Seller</a>
                        </button>
                    </div>
                    </>
                )}
            </div>

            <div className="seller-products">
                
                    {loadingProducts? <LoadingBox></LoadingBox> :
                    errorProducts? <MessageBox variant='danger'>{errorProducts}</MessageBox> :
                    (
                    <div className="search-products" style={{width:"100%", gridGap:"10px"}} >
                        {products.length===0 &&<MessageBox>No Product Found</MessageBox>}
                        {products.map(product=>(
                            <div className="search-product">
                                <SearchProduct key={product._id}  product = {product}/> 
                            </div>
                        ))}
                    </div>
                    )
                    }
            </div>
        </div>
    )
}

export default SellerScreen
