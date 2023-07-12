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
import Address from '../Pages/Address'
import PrivacyPolicy from '../Pages/PrivacyPolicy'
import FAQ from '../Pages/FAQ'
import TermsAndConditions from '../Pages/TermsAndConditions'
import TermsOfUse from '../Pages/TermsOfUse'
import Shipping from '../Pages/Shipping'
import Return from '../Pages/Return'
import Cancellation from '../Pages/Cancellation'

export const MainRoutes = () => {
  return (<>
    <Navbar />
      <Routes>
             <Route path="/" element={<Home/>} />
             <Route path='/signup' element={<Signup/>} />
             <Route path='/otp' element={<Otp/>} />
             <Route path="/store" element={<Store/>} />
             <Route path='/single_product/:id' element={<SingleProduct/>} />
             <Route path='/wishlist' element={<PrivateRoute><Wishlist/></PrivateRoute>} />
             <Route path='/cart' element={<PrivateRoute><Cart/></PrivateRoute>}/>
             <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
             <Route path='/address' element={<PrivateRoute><Address/></PrivateRoute>}/>
             <Route path="/privacypolicy" element={<PrivacyPolicy />} />
             <Route path="/faqs" element={<FAQ />} />
             <Route path="/tac" element={<TermsAndConditions />} />
             <Route path="/termsofuse" element={<TermsOfUse />} />
             <Route path="/shipping" element={<Shipping />} />
             <Route path="/return" element={<Return />} />
             <Route path="/cancellation" element={<Cancellation />} />
      </Routes>
  </>
  )
}

