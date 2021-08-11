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
import Footer from './components/Footer';
import Header from './components/Header';


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
      <div className="App">
        <div className="main_header">
            <Header/>          
        </div>
        <div className="main">
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

          </div>
        {/* <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo}></ChatBox>}
          <div>All right reserved</div> {' '}
        </footer> */}
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo}></ChatBox>}
          <div className="footer">
            <Footer/>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
