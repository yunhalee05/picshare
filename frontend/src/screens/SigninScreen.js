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
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}

        <div className="sign-in">
            <form onSubmit={submitHandler} className="auth-form">
                <div className="container">
                    <label htmlFor="email">Email</label>
                    <input type="email" id = "email" placeholder="Enter email" required onChange={e=>setemail(e.target.value)} />
                </div>
                <div className="container">
                    <label htmlFor="password">Password</label>
                    <input type="password" id = "password" placeholder="Enter password" required onChange={e=>setpassword(e.target.value)} />
                </div>

                <div className="container">
                    <button  type="submit">SIGN IN</button>
                </div>

                <div className="container">
                    New customer? {' '}
                    <Link to = {`/register?redirect=${redirect}`}>Create your Account</Link>
                </div>

            </form>
        </div>

        </div>
    )
}

export default SigninScreen
