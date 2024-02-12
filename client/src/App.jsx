import React, { useEffect, useState } from 'react'
import Home from "./pages/Home"
import ProductList from "./pages/ProductList"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Success from './pages/Success';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate, 
  Outlet
} from "react-router-dom";
import Product from "./pages/Product";
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Scroll = styled.button`
  width: 50px;
  height: 50px;
  position: fixed;
  left: 50%;
  bottom: 30px;
  z-index: 99999;
  background-color: lightgray;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: none; /* Remove borders */
  outline: none; /* Remove outline */
  background-color: red; /* Set a background color */
  color: white; /* Text color */
  cursor: pointer; /* Add a mouse pointer on hover */
  padding: 15px; /* Some padding */
  font-size: 18px; /* Increase font size */
  
  font-size: 16px;
  &:hover {
    background-color: #555; 
  }
`


const Layout = () => {
  const [scroll,setScroll] = useState(false)
  useEffect(() => {
    const handleScroll = event => {
      if(window.scrollY > 200) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    };
   
    
    
    window.addEventListener('scroll', handleScroll);
     return () => {
       window.removeEventListener('scroll', handleScroll);
     };
  },[] );
  
  return(
    <>
    
    {<Scroll onClick={()=>window.scrollTo({top:0})} style={{
      display:scroll?"block":"none"
    }}>^</Scroll>}
    <Outlet onScroll={()=>setScroll(true)}/>
    </>
 

  )
  
}
function App() {
  const user = useSelector((state) => state.user.currentUser);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
      {
      path: "/",
      element: <Home/>,
      },
    {
      path: "/products/:category",
      element: <ProductList />
    },
    {
      path: "/product/:id",
      element: <Product />
    },
    {
      path: "/cart",
      element: <Cart  />
    },
    {
      path: "/success",
      element: <Success  />
    },
    {
      path: "/login",
      element: user? <Navigate to="/"  />:<Login />
    },
    {
      path: "/register",
      element: user?<Navigate to="/"  />:<Register  />
    },
  ],
}

  ]);
  return (
    <RouterProvider router={router}/>
     
  )
}


export default App
