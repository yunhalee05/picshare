import React,{useState} from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {useDispatch, useSelector} from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingAddressScreen(props) {

    const userSignin = useSelector(state=>state.userSignin)

    const{userInfo} = userSignin
    if(!userInfo){
        props.history.push('/signin')
    }

    const cart = useSelector(state =>state.cart);
    const {shippingAddress} = cart;

    const [lat, setLat] = useState(shippingAddress.lat);
    const [lng, setLng] = useState(shippingAddress.lng)


    const userAddressMap = useSelector(state => state.userAddressMap)
    const {address: addressMap} = userAddressMap

    const [fullName, setfullName] = useState(shippingAddress.fullName)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler= (e) =>{
        e.preventDefault();
        const newLat = addressMap? addressMap.lat: lat;
        const newLng = addressMap? addressMap.lng:lng;
        if(addressMap){//지도에서 선택은 한 경우
            setLat(addressMap.lat);
            setLng(addressMap.lng);
        }
        let moveOn = true;
         if(!newLat ||!newLng){//지도가 올바르게 선택되지 않았다면 
             moveOn = window.confirm(
                 'You did not set your location on map. Continue?'
             )
         }
         if(moveOn){//지도에서 올바르게 선택된경우
             dispatch(saveShippingAddress({fullName, address, city, postalCode, country, lat:newLat, lng:newLng}))//새로운 좌표로 등록해놓는다. 
             props.history.push('/payment')

         }
    }
    const chooseOnMap=() =>{
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country, lat, lng}))//지도 페이지로 가기전에 일단 현재데이터를 저장한다. 
        props.history.push('/map')
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className="shipping">
            <form onSubmit={submitHandler} className="shipping-form">
                <div className="shipping-title">
                    SHIPPING ADDRESS
                </div>
                <div className="container">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id = "fullName" placeholder="Enter fullname" value = {fullName} onChange={e=>setfullName(e.target.value)} required/>
                </div>
                <div className="container">
                    <label htmlFor="address">Address</label>
                    <input type="text" id = "address" placeholder="Enter address" value = {address} onChange={e=>setAddress(e.target.value)} required/>
                </div>
                <div className="container">
                    <label htmlFor="city">City</label>
                    <input type="text" id = "city" placeholder="Enter city" value = {city} onChange={e=>setCity(e.target.value)} required/>
                </div>
                <div className="container">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id = "postalCode" placeholder="Enter postalCode" value = {postalCode} onChange={e=>setPostalCode(e.target.value)} required/>
                </div>
                <div className="container">
                    <label htmlFor="country">Country</label>
                    <input type="text" id = "country" placeholder="Enter country" value = {country} onChange={e=>setCountry(e.target.value)} required/>
                </div>
                <div className="location-container">
                    <label htmlFor="chooseOnMap">Location</label>
                    <button  className="location-button" type="button" onClick={chooseOnMap}>Choose On Map</button>
                </div>
                <div className="container">
                    <button type = "submit">Continue</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default ShippingAddressScreen
