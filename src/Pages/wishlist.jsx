import { Box, HStack, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import SingleWishlistProduct from "../Components/SingleWishlistProduct";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../Redux/UserReducer/Action";

const Wishlist = () => {
  const mobileNumber = localStorage.getItem("MbNumber");
  const {user} = useSelector((store) => store.UserReducer);
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);
  const toast = useToast();
  const [userId,setUserID] =useState("");
  
  const getWishlitProd = () => {
    
    axios({
      method: "get",
      url: process.env.REACT_APP_MYNTRA_API + "/wishlist",
    })
      .then((res) => setWishlist(res.data))
      .catch((err) => {
        console.log(err);
      });
    
  };

  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails(mobileNumber));
    } else {
      console.log(wishlist);
      // dispatch(getUserDetails(mobileNumber));
      setWishlist(user.wishlist);
      setUserID(user._id)
      console.log(wishlist);
    }
    // getWishlitProd();
      // dispatch(getUserDetails(mobileNumber));
  }, [wishlist.length,user,setWishlist,dispatch]);

  const handleDelete = (id) => {
    axios({
      method: "delete",
      // url: process.env.REACT_APP_MYNTRA_API + "/wishlist/" + id,
      url: "http://localhost:5000/user/"+userId+"/wishlist/"+ id,
    })
      .then((res) => {
        dispatch(getUserDetails(mobileNumber));
        // getWishlitProd();
        toast({
          title: "Product removed from wishlist",
          variant: "top-accent",
          isClosable: true,
          position: "top-right",
          status: "error",
          duration: 2000,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddCart = (el) => {
    // axios({
    //   method: "post",
    //   url: process.env.REACT_APP_MYNTRA_API + "/cart",
    //   data: { ...el, currentSize: el.size[0] },
    // })
    axios({
      method: "post",
      url: `http://localhost:5000/user/`+userId+`/cart/`+el._id,
    })
      .then((res) => {
        toast({
          title: "Product successfully added in cart",
          variant: "top-accent",
          isClosable: true,
          position: "top-right",
          status: "success",
          duration: 1500,
        });
        handleDelete(el._id);
      })
      .catch((err) => {
        handleDelete(el.id);
        toast({
          title: "Product already present in cart",
          variant: "top-accent",
          isClosable: true,
          position: "top-right",
          status: "error",
          duration: 1500,
        });
      });
  };
  return (
    <>
      {/* .................. */}
    <Navbar />
      <Box
        w={"full"}
        p={{ lg: "50px 50px", md: "40px 40px", base: "20px 20px" }}
      >
        <HStack textAlign={"center"} spacing={"5px"}>
          <Text fontSize={"18px"} fontWeight={500} color={"#282c3f"}>
            {" "}
            Wishlist
          </Text>
          <Text fontSize={"17px"} fontWeight={400} color={"#b2b4b9"}>
            {"( "}
            {wishlist.length} items{" )"}
          </Text>
        </HStack>
        <SimpleGrid
          columns={{ lg: "5", md: "3", base: "2" }}
          gap={{ lg: "50px", md: "30px", base: "10px" }}
          mt={0}
          mb={8}
        >
          {wishlist?.map((el) => {
            return (
              <SingleWishlistProduct
                key={el._id}
                el={el}
                handleAddCart={handleAddCart}
                handleDelete={handleDelete}
              />
            );
          })}
        </SimpleGrid>
      </Box>

      <Footer />
    </>
  );
};

export default Wishlist;
