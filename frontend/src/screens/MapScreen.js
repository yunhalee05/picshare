import React, { useEffect, useState,useRef } from 'react'
import LoadingBox from '../components/LoadingBox'
import {LoadScript,GoogleMap,StandaloneSearchBox,Marker} from '@react-google-maps/api';
import axios from '../../node_modules/axios/index';
import { USER_ADDRESSS_MAP_CONFIRM } from '../constants/userConstants';
import { useDispatch } from 'react-redux';
 
const libs=['places'];
const defaultLocation = {lat:45.516, lng:-73.56};


function MapScreen(props) {

    const [googleApiKey, setGoogleApiKey] = useState('')
    const [center, setCenter] = useState(defaultLocation)//얘는 googlemap을 위해서
    const [location, setLocation] = useState(center)//얘는 Marker를 위해서

    const mapRef = useRef(null);
    const placeRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        const fetch = async ()=>{
            const res = await axios.get('/api/config/google');
            setGoogleApiKey(res.data);
            getUserCurrentLocation();
        }
        fetch();
    }, [])


    const onLoad= (map)=>{
        mapRef.current = map;
    }

    const onMarkerLoad = (marker)=>{
        markerRef.current = marker;
    }

    const onLoadPlaces = (place)=>{
        placeRef.current = place
    }

    const onIdle = ()=>{
        setLocation({lat:mapRef.current.center.lat(), lng:mapRef.current.center.lng()})
    }

    const onPlacesChanged =()=>{
        const place = placeRef.current.getPlaces()[0].geometry.location;        
            setCenter({lat:place.lat(), lng:place.lng()})
            setLocation({lat:place.lat(), lng:place.lng()})

    }

    const dispatch = useDispatch()

    const onConfirm = ()=>{
        const places = placeRef.current.getPlaces();
        if(places && places.length ===1){
            dispatch({
                type:USER_ADDRESSS_MAP_CONFIRM,
                payload:{
                    lat:location.lat,
                    lng:location.lng,
                    address:places[0].formatted_address,
                    name:places[0].name,
                    vicinity:places[0].vicinity,
                    googleAddressId:places[0].id
                }
            })
            alert('location selecte successfully')
            props.history.push('/shipping')
        }else{
            alert('Please enter your address')
        }
    }
    const getUserCurrentLocation = () => {
        if (!navigator.geolocation) {
          alert('Geolocation os not supported by this browser');
        } else {
          navigator.geolocation.getCurrentPosition((position) => {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        }
      };

    return googleApiKey ? (
        <div className="full-container">
            <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
                <GoogleMap id="sample-map" mapContainerStyle={{height:'100vh',width:'100vw' }} center={center} zoom={15} onLoad={onLoad}onIdle={onIdle} >
                    <StandaloneSearchBox onLoad={onLoadPlaces} onPlacesChanged={onPlacesChanged}>
                        <div className="map-input-box">
                            <input type="text" placeholder="Enter your address" />
                            <button onClick={onConfirm} type="button">Confirm</button>
                        </div>
                    </StandaloneSearchBox>
                    <Marker position={location} onLoad={onMarkerLoad}></Marker>
                </GoogleMap>
            </LoadScript>
        </div>
    ) : <LoadingBox></LoadingBox>
}

export default MapScreen
