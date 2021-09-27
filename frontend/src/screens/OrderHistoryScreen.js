import React, {useEffect} from 'react'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { listOrderMine } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

function OrderHistoryScreen(props) {
    const orderMineList = useSelector(state => state.orderMineList)
    const {loading, error, orders, pages} = orderMineList

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(9)

    const pageRange = [...Array(pages).keys()]  

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine({page, limit}));

    }, [dispatch, page, limit])

    return (
        <div className="list">
            <div className="listtitle" style={{"marginBottom":"12rem"}}>ORDER HISTORY</div>
            {
                loading? (<LoadingBox></LoadingBox>) :
                error? (<MessageBox variant= 'danger'>{error}</MessageBox>) :
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="hidden">ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {   orders &&
                            orders.map((order) => (                                
                                <tr key={order._id}>
                                    <td className="hidden">{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                    <td>{order.isDelivered? order.deliveredAt.substring(0,10): "No"}</td>
                                    <td>
                                        <button className="small" type="button" onClick={()=>{props.history.push(`/order/${order._id}`);}}>Details</button>
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
                        <li className="page-item" style={{borderRadius:"0px 10px 10px 0px"}} onClick={()=>setPage(pages)}>
                            <i className="fas fa-forward" ></i>
                        </li>
                    </ul>
                </nav>
        </div>
    )
}

export default OrderHistoryScreen
