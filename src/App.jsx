import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from './pages/home/Home';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Cart from './pages/cart/Cart';
import Order from './pages/Order/Order';
import NoPage from './pages/noPage/NoPage';
import MyState from './context/data/MyState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/SignUp';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProducts from './pages/allProducts/allProducts';


function App() {
  
 

  return (
    <>
  
    
    <MyState>

    <Router>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/dashboard' element={
          <ProtectedRouteForAdmin>
            <Dashboard/>
          </ProtectedRouteForAdmin>
        }></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/order' element={
          <ProtectedRoute>
            <Order/>
          </ProtectedRoute>
        }></Route>
        <Route path='/nopage' element={<NoPage/>}></Route>
        <Route path='/allproducts' element={<AllProducts/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/productinfo/:id' element={<ProductInfo/>}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/addproduct" element={
          <ProtectedRouteForAdmin>
          <AddProduct/>
          </ProtectedRouteForAdmin>}/>
        <Route path="/updateproducts" element={<ProtectedRouteForAdmin>
          <UpdateProduct/>
        </ProtectedRouteForAdmin>} />
      
       
      </Routes>
      <ToastContainer/>
    </Router>
    </MyState>
    </>
  )
}

export default App

//user
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
  
}
 
//admin
const ProtectedRouteForAdmin =({children})=>{
  const admin = JSON.parse(localStorage.getItem('user'))
  if(admin.user.email === "gopal@gmail.com"){
    return children;
  }else{
    <Navigate to={'/login'}/>
  }
}