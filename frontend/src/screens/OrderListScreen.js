import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

function OrderListScreen(props) {
    const sellerMode = props.match.path.indexOf('/seller') >=0;
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders, pages, count} = orderList

    const orderDelete = useSelector(state => state.orderDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = orderDelete

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(9)

    const pageRange = [...Array(pages).keys()]    

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type:ORDER_DELETE_RESET
        })
        dispatch(listOrders({seller: sellerMode? userInfo._id: '', page:page, limit:limit}));
    }, [dispatch,successDelete, page, limit])

    const deleteHandler= (order)=>{
        if(window.confirm('Are you sure to delete?')){
            dispatch(deleteOrder(order._id));
        }
    }

    return (
        <div className="list">
            <div className="listtitle" >ORDERS</div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
            {
                loading
                ? <LoadingBox></LoadingBox> 
                : error
                    ? <MessageBox variant= 'danger'>{error}</MessageBox>
                    :(
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="hidden">ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (                                
                                    <tr key={order._id}>
                                        <td className="hidden">{order._id}</td>
                                        <td>{order.user.name}</td> 
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                        <td>{order.isDelivered? order.deliveredAt.substring(0,10): "No"}</td>
                                        <td>
                                            <button className="small" type="button" onClick={()=>{props.history.push(`/order/${order._id}`);}}>Details</button>
                                            <button className="small" type="button" onClick={()=>deleteHandler(order)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
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


export default OrderListScreen
