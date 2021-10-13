import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listProducts,deleteProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_DELETE_RESET} from '../constants/productConstants';

function ProductListScreen(props) {

    const sellerMode = props.match.path.indexOf('/seller') >=0;

    const productList = useSelector(state=>state.productList);
    const {loading, error, products, pages}= productList;


    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(9)

    const pageRange = [...Array(pages).keys()]    


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
        dispatch(listProducts({page, seller:sellerMode? userInfo._id :''}))
    }, [ dispatch, props.history, successDelete,sellerMode, page, userInfo._id])

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
            </>
            }

                <nav aria-label="Pagination">
                    <ul className="pagination">
                        <li className="page-item" style={{borderRadius:"10px 0px 0px 10px"}} onClick={()=>setPage(1)}>
                            <i className="fas fa-backward" ></i>
                        </li>
                        {
                            pageRange.map((x, index)=>(
                                <li key={index} className={`page-item ${page===x+1 && 'page_active'}`} onClick={()=>setPage(x+1)}>{x+1}</li>
                            ))
                        }
                        <li className="page-item" style={{borderRadius:"0px 10px 10px 0px"}} onClick={()=>setPage(pageRange.length)}>
                            <i className="fas fa-forward" ></i>
                        </li>
                    </ul>
                </nav>
        </div>
    )
}

export default ProductListScreen
