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

            <nav aria-label="Page navigation example" style={{width:'100%'}}>
                <ul class="pagination" style={{justifyContent:'center'}}>
                    <li class="page-item">
                        <a class="page-link" aria-label="Previous" onClick={e=>setPage(1)} style={{color:'black'}}>
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                    {
                        pageRange.map(x=>(
                            <li class="page-item"><a class="page-link" onClick={e=>setPage(x+1)} style={{color:'black'}}>{x+1}</a></li>
                        ))
                    }
                    <li class="page-item">
                        <a class="page-link" onClick={e=>setPage(pages)} aria-label="Next" style={{color:'black'}}>
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default OrderHistoryScreen
