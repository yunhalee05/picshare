import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { register } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'


function RegisterScreen(props) {
    const dispatch = useDispatch()

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [isSeller, setIsSeller] = useState(false)

    const redirect = props.location.search? props.location.search.split('=')[1]:'/';

    const userRegister = useSelector(state=>state.userRegister);
    const {userInfo, loading, error} = userRegister;
  
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and condfirm Password are not match')
        }
        else{
            dispatch(register(name, email, password, isSeller));
        }
    }
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])
    
    const checkHandler = () =>{
        setIsSeller(!isSeller)

    }

    return (
        <div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div className="sign-in">
            <form onSubmit={submitHandler} className="auth-form">

                <div className="container">
                    <label htmlFor="name">Name</label>
                    <input type="text" id = "name" placeholder="Enter name" required onChange={e=>setname(e.target.value)} />
                </div>
                <div className="container">
                    <label htmlFor="email">Email</label>
                    <input type="email" id = "email" placeholder="Enter email" required onChange={e=>setemail(e.target.value)} />
                </div>
                <div className="container">
                    <label htmlFor="password">Password</label>
                    <input type="password" id = "password" placeholder="Enter password" required onChange={e=>setpassword(e.target.value)} />
                </div>
                <div className="container">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id = "confirmPassword" placeholder="Enter confirmPassword" required onChange={e=>setconfirmPassword(e.target.value)} />
                </div>
                <div className="container">
                        <label htmlFor="isSeller">You want to be a Seller?</label>
                        <input type="checkbox" id="isSeller" value={isSeller} onChange= {checkHandler} />
                    </div>
                <div className="container">
                    <button  type="submit">Register</button>
                </div>
                <div className="container">
                        Already have an account? {' '}
                        <Link to = {`/signin?redirect=${redirect}`}>Sign - In</Link>
                </div>

            </form>
        </div>
                    
        </div>
    )
}

export default RegisterScreen
