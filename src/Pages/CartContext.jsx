// CartContext.js
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_API}/user/cart/itemscount`,
    })
      .then((res) => {
        console.log(res.data.totalItemsInCart);
        setCartCount(res.data.totalItemsInCart);
      })
      .catch((err) => {
        console.error(err);
      });

    // You can fetch the cart count from your backend here
    // For now, let's assume you fetched it as `initialCartCount`
    // Replace this with the actual count

    // setCartCount(initialCartCount);
  }, []);



  return (
    <CartContext.Provider value={{ cartCount,setCartCount  }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
