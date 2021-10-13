import React from 'react';
import  {BrowserRouter,Route} from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import { useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
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
import SearchScreen from './screens/SearchScreen';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductCreateScreen from './screens/ProductCreateScreen';


function App() {

  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;

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
            <Route path="/product/edit/:id" component={ProductEditScreen} exact></Route>          
            <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>          
            <AdminRoute path="/userlist" component={UserListScreen} exact></AdminRoute>          
            <AdminRoute path="/user/:id/edit" component={UserEditScreen} exact></AdminRoute>          
            <SellerRoute path="/productlist/seller" component={ProductListScreen} exact></SellerRoute>          
            <SellerRoute path="/orderlist/seller" component={OrderListScreen} exact></SellerRoute>   
            <Route path="/seller/:id" component={SellerScreen} exact></Route>
            <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
            <Route path="/search/category/:category" component={SearchScreen} exact></Route>
            <PrivateRoute path="/map" component={MapScreen} exact></PrivateRoute>
            <AdminRoute path="/dashboard" component={DashboardScreen} exact></AdminRoute>          
            <AdminRoute path="/support" component={SupportScreen} exact></AdminRoute>          
            <Route path="/productcreate" component={ProductCreateScreen} exact></Route>          

          </div>
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo}></ChatBox>}
          
          <div className="footer">
            <Footer/>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
