import React, { useEffect, useState } from 'react';
import  {BrowserRouter,Route} from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories, listProductsCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';
import { GrInbox } from "react-icons/gr";
import { FaRegHandPointRight } from "react-icons/fa";

function App() {

  const cart = useSelector(state=> state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)


  const dispatch = useDispatch()
  const signoutHandler = () =>{
    dispatch(signout());
  }
  


  const productCategoryList = useSelector(state => state.productCategoryList)
  const {loading:loadingCategories, error:errorCategories, categories} = productCategoryList

  useEffect(() => {
    dispatch(listProductCategories())
  }, [dispatch])

  return (
    <BrowserRouter >
    <div className="grid-container">
          <header className="row">
            <div>
              <button type="button" className="open-sidebar" onClick={()=>setSidebarIsOpen(true)}>
                <GrInbox className="sidbar-icon"/>
              </button>
              <Link className="brand" to="/">PICSHARE</Link>
            </div>
            <div>
              <Route render = {({history})=>( <SearchBox history={history}></SearchBox>)}></Route>
            </div>
            <div>
              <Link to="/cart">CART
              {cartItems.length>0 &&(
                <span className="badge">{cartItems.length}</span>
              )}
              </Link>
              {
                userInfo ?
                  (
                    <div className="dropdown">
                    <Link to="#">{userInfo.name.toUpperCase()} <i className="fa fa-caret-down"></i> </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to = "/profile">User Profile</Link>
                      </li>
                      <li>
                        <Link to = "/orderhistory">Order History</Link>
                      </li>
                      <li>
                      <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                      </li>
                    </ul>
                    </div>
                  )
                  :
                  (<Link to="/signin">Sign In</Link>)
              }
              {
                userInfo && userInfo.isSeller && (
                  <div className="dropdown">
                    <Link to="#seller">SELLER {' '}<i className="fa fa-caret-down"></i> </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to = "/productlist/seller">Products</Link>
                      </li>
                      <li>
                        <Link to = "/orderlist/seller">Orders</Link>
                      </li>
                    </ul>
                  </div>
                )
              }
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">ADMIN {' '}<i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to = "/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to = "/productlist">Products</Link>
                    </li>
                    <li>
                      <Link to = "/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to = "/userlist">Users</Link>
                    </li>
                    <li>
                      <Link to = "/support">Support</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </header>
          <aside className={sidebarIsOpen? 'open': ''}>
                <ul className="categories">
                  <li>
                    <div style={{"WebkitTextStroke":" 2px black", "color":"white"}}> <br/>CATEGORY
                    <button type="button" className="close-sidebar" onClick={()=>setSidebarIsOpen(false)}>
                        <FaRegHandPointRight size="28" />
                      </button>
                    </div>
                  </li>
                  {loadingCategories? <LoadingBox></LoadingBox> :
                    errorCategories? <MessageBox variant='danger'>{errorCategories}</MessageBox> :
                    (
                        <ul>
                            {categories.map(c=>
                                (
                                    <li key = {c}>
                                        <Link to ={`/search/category/${c}`} onClick={()=>setSidebarIsOpen(false)}  className="categories_category">{c}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    )}
                </ul>
          </aside>
          <main>
              <Route path="/" component={HomeScreen} exact></Route>
              <Route path="/product/:id" component={ProductScreen} exact></Route>
              <Route path="/cart/:id?" component={CartScreen} exact></Route>
              <Route path="/signin" component={SigninScreen} exact></Route>
              <Route path="/register" component={RegisterScreen} exact></Route>
              <Route path="/shipping" component={ShippingAddressScreen} exact></Route>
              <Route path="/payment" component={PaymentMethodScreen} exact></Route>
              <Route path="/placeorder" component={PlaceOrderScreen} exact></Route>
              <Route path="/order/:id" component={OrderScreen} exact></Route>
              <Route path="/orderhistory" component={OrderHistoryScreen} exact></Route>
              <PrivateRoute path="/profile" component={ProfileScreen} exact></PrivateRoute>
              <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
              <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductListScreen} exact></AdminRoute>
              <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>          
              <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>          
              <AdminRoute path="/userlist" component={UserListScreen} exact></AdminRoute>          
              <AdminRoute path="/user/:id/edit" component={UserEditScreen} exact></AdminRoute>          
              <SellerRoute path="/productlist/seller" component={ProductListScreen} exact></SellerRoute>          
              <SellerRoute path="/orderlist/seller" component={OrderListScreen} exact></SellerRoute>   
              <Route path="/seller/:id" component={SellerScreen} exact></Route>
              <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
              <Route path="/search/category/:category" component={SearchScreen} exact></Route>
              <Route path="/search/category/:category/name/:name" component={SearchScreen} exact></Route>
              <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber" component={SearchScreen} exact></Route>
              <PrivateRoute path="/map" component={MapScreen} exact></PrivateRoute>
              <AdminRoute path="/dashboard" component={DashboardScreen} exact></AdminRoute>          
              <AdminRoute path="/support" component={SupportScreen} exact></AdminRoute>          

            </main>
          <footer className="row center">
            {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo}></ChatBox>}
            <div>All right reserved</div> {' '}
          </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
