import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen() {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [image, setImage] = useState(null)

    const [sellerName, setSellerName] = useState('')
    const [sellerLogo, setSellerLogo] = useState('')
    const [sellerDescription, setSellerDescription] = useState('')

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user}= userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success: successUpdate, error:errorUpdate, loading: loadingUpdate} = userUpdateProfile

    const dispatch = useDispatch()
    useEffect(()=>{
        if(!user){
            dispatch({
                type:USER_UPDATE_PROFILE_RESET
            })
            dispatch(detailsUser(userInfo._id));
        }else{
            setname(user.name)
            setemail(user.email)
            if(user.seller){
                setSellerName(user.seller.name)
                setSellerLogo(user.seller.logo)
                setSellerDescription(user.seller.description)
            }
        }
    },[dispatch, userInfo._id, user])

    const submitHandler = (e) =>{
        e.preventDefault();
        if(password!==confirmPassword){
            alert('Password and Confirm Password Are Not Matched')
        }else{
            const bodyFormData = new FormData();
            bodyFormData.append('image', image);
            dispatch(updateUserProfile({userId:user._id, name, email, password,sellerName, sellerLogo, sellerDescription}, bodyFormData))
        }
    }

    const profileuploadFileHandler = async(e)=>{
        const file = e.target.files[0];
        setImage(file)
    }

    return (
        <div className="profile">
            <form onSubmit={submitHandler} className="profile-form" >
                    <div className="profile-title" > 
                        USER PROFILE
                    </div>
                    {
                        loading? <LoadingBox></LoadingBox> :
                        error ? <MessageBox variant='danger'>{error}</MessageBox> :
                        <>
                        { loadingUpdate && <LoadingBox></LoadingBox>}
                        { errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
                        {successUpdate && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
                        <div className="container">
                            <label htmlFor="name">NAME</label>
                            <input id = "name" placeholder="Enter name" type="text" value = {name} onChange={e=>setname(e.target.value)}/>
                        </div>
                        <div className="container">
                            <label htmlFor="email">EMAIL</label>
                            <input id = "email" placeholder="Enter email" type="email" value = {email} onChange={e=>setemail(e.target.value)} />
                        </div>
                        <div className="container">
                            <label htmlFor="password">PASSWORD</label>
                            <input id = "password" placeholder="Enter password" type="password" onChange={e=>setpassword(e.target.value)} />
                        </div>
                        <div className="container">
                            <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
                            <input id = "confirmPassword" placeholder="Enter confirmPassword" type="password" onChange={e=>setconfirmPassword(e.target.value)} />
                        </div>
                        {
                            user.isSeller && (
                                <>
                                <div className="profile-title" >SELLER</div>
                                <div className="container">
                                    <label htmlFor="sellerName">SELLER NAME</label>
                                    <input type="text" id="sellerName" placeholder="Enter seller name" value = {sellerName} onChange={(e)=>setSellerName(e.target.value)}/>
                                </div>

                                <div className="container">
                                    <label htmlFor="sellerLogo">SELLER LOGO</label>
                                    <div className="sellerLogo_container">
                                        <div className="profile_seller_image">
                                        {
                                            image 
                                            ? <img src={URL.createObjectURL(image)} alt="" />
                                            : sellerLogo && 
                                                    <img src={sellerLogo} alt="" />
                                        }
                                        </div>
                                        <span>
                                            <i className="fas fa-camera" ></i>
                                            <input type="file" id="logoFile" label="Choose Image" onChange={profileuploadFileHandler} />
                                        </span>
                                    </div>
                                </div>

                                <div className="container">
                                    <label htmlFor="sellerDescription">SELLER DESCRIPTION</label>
                                    <input type="text" id="sellerDescription" placeholder="Enter seller Description" value = {sellerDescription} onChange={(e)=>setSellerDescription(e.target.value)}/>
                                </div>
                                </>
                            )
                        }
                        <div className="container">
                            <button className="formbutton" type="submit" >Update</button>
                        </div>
                        </>
                    }
            </form>
        </div>
    )
}

export default ProfileScreen
