import React , {useEffect} from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import TopProduct from '../components/TopProduct'
import HomeProduct from '../components/HomeProduct'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useDispatch, useSelector} from 'react-redux'
import { getProducts, listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import {Link} from 'react-router-dom'



function HomeScreen() {
    const dispatch = useDispatch();
    
    const productList = useSelector(state=>state.productList);
    const {loading, error, products} = productList;

    const userTopSellersList = useSelector(state => state.userTopSellersList)
    const{loading:loadingSellers, error:errorSellers, users:sellers} = userTopSellersList

    useEffect(() => {
        dispatch(getProducts());
        dispatch(listTopSellers());
        }, [dispatch])

    return (
        <div className="home">
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {   !error && !loading &&  
                products.length!==0 &&
                <>
                    <TopProduct products={products}/> 
                    <div className="maintopic" >
                        <p>PICSHARE always with you 🌼 PICSHARE always with you 🌼 PICSHARE always with you 🌼 PICSHARE always with you 🌼</p>
                    </div> 
                    <div className="homeproducts_card_container" >
                        {
                            products.map((product,index)=>(
                                <HomeProduct key={product._id}  product = {product}/> 
                        ))}
                    </div> 
                      
                </>                
            }

            {
                !loading && !error &&
                products.length ===0 &&
                <>
                    <div className="maintopic" >'PICSHARE always with you'</div>
                    <MessageBox>No Product Found</MessageBox>
                </>

            }
        </div>
    )
}

export default HomeScreen
