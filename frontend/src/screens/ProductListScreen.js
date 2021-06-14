import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router';
import { createProduct, listProducts,deleteProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET ,PRODUCT_DELETE_RESET} from '../constants/productConstants';
import {Link} from 'react-router-dom'

function ProductListScreen(props) {
    const {pageNumber=1} = useParams();

    const sellerMode = props.match.path.indexOf('/seller') >=0;

    const productList = useSelector(state=>state.productList);
    const {loading, error, products, page, pages}= productList;
    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct} = productCreate

    const dispatch = useDispatch()

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete}  = productDelete
    const deleteHandler = (product)=>{
        if(window.confirm('Are you sure to delete?')){
            dispatch(deleteProduct(product._id));
        }
    }

    const createHandler = ()=>{
        dispatch(createProduct());
    }

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    useEffect(() => {
        if(successCreate){
            dispatch({
                type:PRODUCT_CREATE_RESET
            })
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        if(successDelete){
            dispatch({type:PRODUCT_DELETE_RESET})
        }
        dispatch(listProducts({pageNumber, seller:sellerMode? userInfo._id :''}))
    }, [createdProduct, dispatch, props.history, successCreate, successDelete,sellerMode, pageNumber])

    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button className="primary" type="button" onClick={createHandler}>Create Product</button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete &&<MessageBox variant='danger'>{errorDelete}</MessageBox>}
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate &&<MessageBox variant='danger'>{errorCreate}</MessageBox>}
            {loading? <LoadingBox></LoadingBox>:
            error? <MessageBox variant='danger' >{error}</MessageBox>:
            <>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>(
                        <tr key = {product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <button type="button" className="small" onClick={()=>props.history.push(`/product/${product._id}/edit`)}>
                                    Edit
                                </button>
                                <button className="small" type="button" onClick={()=>deleteHandler(product)}>Delete</button>
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
