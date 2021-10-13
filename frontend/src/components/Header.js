import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GrInbox } from "react-icons/gr";
import { useState } from 'react';
import {Link} from 'react-router-dom'
import { signout } from '../actions/userActions';
import { FaRegHandPointRight } from "react-icons/fa";
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import SearchBox from './SearchBox';
import {BASE_URL} from '../utils'
import {productCategory} from '../utils'




function Header() {

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    const cart = useSelector(state=> state.cart);
    const {cartItems} = cart;

    const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

    const dispatch = useDispatch()

    const signoutHandler = () =>{
        dispatch(signout());
      }

    
    return (
        <div>
            <div className="header">
                <div className="brandName">
                    <button type="button"  onClick={()=>setSidebarIsOpen(!sidebarIsOpen)}>
                        {
                            sidebarIsOpen 
                            ? <i className="fas fa-exclamation fa-2x"></i>
                            :<i className="fas fa-question fa-2x"></i>
                        }
                        <i className="fas fa-exclamation fa-3x"></i>
                    </button>
                    <Link className="brand" to="/">PICSHARE</Link>
                </div>

                <SearchBox history={BASE_URL}></SearchBox>

                <div className="header-menu">
                    <Link to="/cart">CART
                        {cartItems.length>0 &&(
                            <span className="badge">{cartItems.reduce((a,c)=>a+c.qty,0)}</span>
                        )}
                    </Link>
                    {
                        userInfo 
                        ?<div className="dropdown">
                            <Link to="#" >{userInfo.name.toUpperCase()} <i className="fa fa-caret-down"></i> </Link>
                            <ul className="dropdown-content" >
                                <li>
                                    <Link to = "/profile">PROFILE</Link>
                                </li>

                                <li>
                                    <Link to = "/orderhistory">ORDERS</Link>
                                </li>

                                <li>
                                    <Link to="#signout" onClick={signoutHandler}>SIGNOUT</Link>
                                </li>

                            </ul>
                        </div>
                        
                        :   <Link to="/signin">SIGN IN</Link>
                    }
                    {
                        userInfo && userInfo.isSeller && (
                        <div className="dropdown">
                            <Link to="#seller">SELLER {' '}<i className="fa fa-caret-down"></i> </Link>
                            <ul className="dropdown-content">
                            <li>
                                <Link to = "/productlist/seller">PRODUCTS</Link>
                            </li>
                            <li>
                                <Link to = "/orderlist/seller">ORDERS</Link>
                            </li>
                            </ul>
                        </div>
                        )
                    }
                    {
                        userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                <Link to="#admin">ADMIN {' '}<i className="fa fa-caret-down"></i></Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to = "/dashboard">DASHBOARD</Link>
                                </li>
                                <li>
                                    <Link to = "/productlist">PRODUCTS</Link>
                                </li>
                                <li>
                                    <Link to = "/orderlist">ORDERS</Link>
                                </li>
                                <li>
                                    <Link to = "/userlist">USERS</Link>
                                </li>
                                <li>
                                    <Link to = "/support">SUPPORT</Link>
                                </li>
                            </ul>
                            </div>
                        )
                    }
                </div>
        </div>
          <div className={sidebarIsOpen? 'aside open': 'aside'}>
                    <div style={{ color:"black", fontSize:"4rem", marginLeft:'2rem', marginTop:"2rem"}}> <span style={{ border:"2px solid black",padding:"1rem", borderRadius:"20px"}}>CATEGORY</span>
                    <button style={{color:"black" , background:'none', fontSize:"5vw"}} type="button" className="close-sidebar" onClick={()=>setSidebarIsOpen(false)}>
                        <FaRegHandPointRight size="28" />
                      </button>
                    </div>
                  <div className="categories">
                    <ul>
                        {productCategory.map(c=>
                            (
                                <li key = {c} className="categories_category">
                                    <Link to ={`/search/category/${c}`} onClick={()=>setSidebarIsOpen(false)}  >{c}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
          </div>
        </div>
    )
}

export default Header
