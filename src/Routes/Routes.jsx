import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Navbar from '../Components/Navbar'
import Home from '../Pages/Home'
import Otp from '../Pages/Otp'
import RealOtp from '../Pages/RealOtp'
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
import AdminDashboard from '../Admin/AdminDashboard';
import AddProfileData from '../Pages/AddProfileData'
import ProductList from '../Pages/ProductList'
import AddProductsPage from '../Admin/AddProductsPage'
import ProductListPage from '../Admin/ProductListPage'
import EditProduct from '../Admin/EditProduct'
import Signin from '../Pages/Signin'
import Payment from '../Pages/Payment'
// import AddProductsPage from '../Admin/AddProductsPage';
// import UsersPage from "../Admin/UsersPage";
// import AdminProfilePage from "../Admin/AdminProfilePage";
import Success from '../Pages/Success'
import Order from '../Pages/Order'
import ReviewForm from '../Components/ReviewForm'
import ContactUs from '../Pages/ContactUs'

export const MainRoutes = () => {
  
  return (<>
    {/* <Navbar /> */}
      <Routes>
             <Route path="/" element={<Home/>} />
             <Route path='/signup' element={<Signup/>} />
             <Route path='/login' element={<Signin/>} />
             <Route path='/otp' element={<RealOtp/>} />
             <Route path='/profilefill' element={<AddProfileData/>} />
             <Route path="/store" element={<Store/>} />
             <Route path='/single_product/:id' element={<SingleProduct/>} />
             <Route path='/wishlist' element={<PrivateRoute><Wishlist/></PrivateRoute>} />
             <Route path='/cart' element={<PrivateRoute><Cart/></PrivateRoute>}/>
             <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
             <Route path='/address' element={<PrivateRoute><Address/></PrivateRoute>}/>
             <Route path="/payment" element={<PrivateRoute><Payment/></PrivateRoute> }></Route>
             <Route path="/success" element={<PrivateRoute><Success /></PrivateRoute>} ></Route>
             <Route path="/privacypolicy" element={<PrivacyPolicy />} />
             <Route path="/faqs" element={<FAQ />} />
             <Route path="/tac" element={<TermsAndConditions />} />
             <Route path="/termsofuse" element={<TermsOfUse />} />
             <Route path="/shipping" element={<Shipping />} />
             <Route path="/return" element={<Return />} />
             <Route path="/cancellation" element={<Cancellation />} />
             <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
             <Route path="/p" element={<ProductList />}></Route>
             <Route path="/add-products" element={<AddProductsPage />}></Route>
             <Route path="/product-list" element={<ProductListPage />}></Route>
             <Route path="/edit-product/:id" element={<EditProduct />}></Route>
             <Route path="/order" element={<Order />}></Route>
             <Route path="/write-review" element={<ReviewForm />}></Route>
             <Route path="/contact" element={<ContactUs />}></Route>




             {/* <Route path="/add-products" element={<AddProductsPage />}></Route>
             <Route path="/admin-men" element={<MensPage />}></Route>
             <Route path="/admin-women" element={<WomensPage />}></Route>
             <Route path="/admin-kids" element={<KidsPage />}></Route>
             <Route path="/admin-users" element={<UsersPage />}></Route>
             <Route path="/admin-profile" element={<AdminProfilePage />}></Route> */}
      </Routes>
  </>
  )
}

