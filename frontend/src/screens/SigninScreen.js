import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signin } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'


function SigninScreen(props) {
    const dispatch = useDispatch()

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const redirect = props.location.search? props.location.search.split('=')[1]:'/';

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo, loading, error} = userSignin;
  
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email, password));

    }
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])

    return (
        <div>
            <form onSubmit={submitHandler} className="form">
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id = "email" placeholder="Enter email" required onChange={e=>setemail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id = "password" placeholder="Enter password" required onChange={e=>setpassword(e.target.value)} />
                </div>
                <div>
                    <label ></label>
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label ></label>
                    <div>
                        New customer? {' '}
                        <Link to = {`/register?redirect=${redirect}`}>Create your Account</Link>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default SigninScreen
