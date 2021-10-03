import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, listUsers } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_DETAILS_RESET } from '../constants/userConstants'

function UserListScreen(props) {
    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList
    const dispatch = useDispatch()

    const userDelete = useSelector(state => state.userDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = userDelete

    useEffect(() => {
        dispatch(listUsers())
        dispatch({
            type:USER_DETAILS_RESET
        })
    }, [dispatch, successDelete])

    const deleteHandler = (user)=>{
        if(window.confirm('Are you sure to delete?')){
            dispatch(deleteUser(user._id))
        }
    }
    return (
        <div className="list">
            <div className="listtitle">USERS</div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant='success'>User Deleted Successfully</MessageBox>}
            {
                loading? <LoadingBox></LoadingBox>:
                error? <MessageBox variant='danger'>{error}</MessageBox> :
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="hidden">ID</th>
                                <th>NAME</th>
                                <th className="hidden">EMAIL</th>
                                <th>IS SELLER</th>
                                <th>IS ADMIN</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user=>(
                                    <tr key = {user._id}>
                                        <td className="hidden">{user._id}</td>
                                        <td>{user.name}</td>
                                        <td className="hidden">{user.email}</td>
                                        <td>{user.isSeller? 'YES': 'NO'}</td>
                                        <td>{user.isAdmin? 'YES': 'NO'}</td>
                                        <td>
                                            <button type = "button" onClick={()=>props.history.push(`/user/${user._id}/edit`)} >Edit</button>
                                            <button type = "button" onClick ={()=>deleteHandler(user)}  >Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
                {/* <nav aria-label="Pagination">
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
                </nav> */}
        </div>
    )
}

export default UserListScreen
