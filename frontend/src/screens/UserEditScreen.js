import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUser } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen(props) {
    const userId = props.match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isSeller, setIsSeller] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error,user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = userUpdate

    const dispatch = useDispatch()
    useEffect(() => {
        if(successUpdate){
            dispatch({
                type:USER_UPDATE_RESET
            })
            props.history.push('/userList')
        }
        if(!user){
            dispatch(detailsUser(userId));
        }else{
            setName(user.name);
            setEmail(user.email)
            setIsSeller(user.isSeller)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch,props.history, user, userId, successUpdate])

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(updateUser({_id:userId, name, email, isSeller, isAdmin}))

    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <h1>Edit User{name}</h1>
                <div>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
                    {loading? <LoadingBox></LoadingBox> :
                     error? <MessageBox variant="danger">{error}</MessageBox> :
                     (
                         <>
                         <div>
                             <label htmlFor="name">Name</label>
                             <input type="text" id="name" placeholder="Enter name" value={name} onChange={(e)=> setName(e.target.value)} />
                         </div>
                         <div>
                             <label htmlFor="email">Email</label>
                             <input type="email" id="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                         </div>
                         <div>
                             <label htmlFor="isSeller">Is Seller</label>
                             <input type="checkbox" id="isSeller" checked={isSeller} onChange={(e)=> setIsSeller(e.target.checked)} />
                         </div>
                         <div>
                             <label htmlFor="isAdmin">Is Admin</label>
                             <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e)=> setIsAdmin(e.target.checked)} />
                         </div>
                         <div>
                             <button className="primary" type="submit">Update</button>
                         </div>
                         </>
                     )
                    }
                </div>
            </form>
        </div>
    )
}

export default UserEditScreen
