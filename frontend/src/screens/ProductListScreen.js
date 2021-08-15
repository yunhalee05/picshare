import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router';
import { listProducts,deleteProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_DELETE_RESET} from '../constants/productConstants';
import {Link} from 'react-router-dom'

function ProductListScreen(props) {
    const {pageNumber=1} = useParams();

    const sellerMode = props.match.path.indexOf('/seller') >=0;

    const productList = useSelector(state=>state.productList);
    const {loading, error, products, page, pages}= productList;

    const dispatch = useDispatch()

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete}  = productDelete

    const deleteHandler = (product)=>{
        if(window.confirm('Are you sure to delete?')){
            dispatch(deleteProduct(product._id));
        }
    }
    
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    useEffect(() => {
        if(successDelete){
            dispatch({type:PRODUCT_DELETE_RESET})
        }
        dispatch(listProducts({pageNumber, seller:sellerMode? userInfo._id :''}))
    }, [ dispatch, props.history, successDelete,sellerMode, pageNumber])

    const createHandler=() =>{
        props.history.push('/productcreate')
    }

    return (
        <div className="list">
            <div className="listtitle">PRODUCTS</div>
            <div className="create-button">
                <button  type="button" onClick={createHandler}>Create Product</button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete &&<MessageBox variant='danger'>{errorDelete}</MessageBox>}
            {loading? <LoadingBox></LoadingBox>:
            error? <MessageBox variant='danger' >{error}</MessageBox>:
            <>
            <table className="table">
                <thead>
                    <tr>
                        <th className="hidden">ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th className="hidden">BRAND</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>(
                        <tr key = {product._id}>
                            <td className="hidden">{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td className="hidden">{product.brand}</td>
                            <td>
                                <button type="button" onClick={()=>props.history.push(`/product/edit/${product._id}`)}>
                                    EDIT
                                </button>
                                <button type="button" onClick={()=>deleteHandler(product)}>DELETE</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="row center pagination">
                {
                    [...Array(pages).keys()].map((x)=>(
                        <Link to={`/productlist/pageNumber/${x+1}`} className={x + 1 === page ? 'active' : ''} key = {x+1} >{x+1}</Link>
                    ))
                }
            </div>
            </>
            }
        </div>
    )
}

export default ProductListScreen
