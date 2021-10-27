import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signin } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { GoogleLogin } from 'react-google-login';
import axios from '../../node_modules/axios/index'
import { USER_SIGNIN_SUCCESS } from '../constants/userConstants'
import {GOOGLE_CLIENT_ID, CLIENT_SECRET} from '../env'

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

    const responseSuccess = async(response) =>{
        try{
            const {tokenObj : {access_token}, profileObj : {email, name}} = response;
            const {data} = await axios.post('/api/users/socialLogin', {email, name, access_token});
            dispatch({
                type:USER_SIGNIN_SUCCESS,
                payload:data
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
        }catch(error){
            console.log(error.message)
        }
    }

    const responseError = (response) =>{
        console.log(response)
    }

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

                {console.log(GOOGLE_CLIENT_ID)}

                <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Login with GOOGLE"
                    onSuccess={responseSuccess}
                    onFailure={responseError}
                    cookiePolicy={'single_host_origin'}
                />
            </form>
        </div>

        </div>
    )
}

export default SigninScreen
