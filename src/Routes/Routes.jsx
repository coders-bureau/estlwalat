import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Home from '../Pages/Home'
import Otp from '../Pages/Otp'
import Signup from '../Pages/Signup'
import Store from '../Pages/Store'
import SingleProduct from '../Pages/SingleProduct'
import Wishlist from '../Pages/wishlist'
import Cart from '../Pages/Cart'
import { PrivateRoute } from './PrivateRoutes'
import Profile from '../Pages/Profile'

export const MainRoutes = () => {
  return (<>
    <Navbar></Navbar>
      <Routes>
             <Route path="/" element={<Home/>} />
             <Route path='/signup' element={<Signup/>} />
             <Route path='/otp' element={<Otp/>} />
             <Route path="/store" element={<Store/>} />
             <Route path='/single_product/:id' element={<SingleProduct/>} />
             <Route path='/wishlist' element={<PrivateRoute><Wishlist/></PrivateRoute>} />
             <Route path='/cart' element={<PrivateRoute><Cart/></PrivateRoute>}/>
             <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
             
      </Routes>
  </>
  )
}

