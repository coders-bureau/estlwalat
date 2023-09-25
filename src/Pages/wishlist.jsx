import { Box, HStack, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import SingleWishlistProduct from "../Components/SingleWishlistProduct";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../Redux/UserReducer/Action";
import LoadingPage from "./LoadingPage";

const Wishlist = () => {
  // const mobileNumber = localStorage.getItem("MbNumber");
  const [isLoading, setIsLoading] = useState();

  const { user } = useSelector((store) => store.UserReducer);
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);
  const toast = useToast();
  const [userId, setUserID] = useState("");

  useEffect(() => {
    getWishlitProd();
  }, []);

  const getWishlitProd = () => {
    setIsLoading(true);

    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_API}/user/wishlist/items`,
    })
      .then((res) => {
        setIsLoading(false);
        setWishlist(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   if (!user) {
  //     dispatch(getUserDetails());
  //   } else {
  //     console.log(wishlist);
  //     getWishlitProd();
  //     // dispatch(getUserDetails(mobileNumber));
  //     // setWishlist(user.wishlist);
  //     setUserID(user._id);
  //     console.log(wishlist);
  //   }
  //   // getWishlitProd();
  //   // dispatch(getUserDetails(mobileNumber));
  // }, [wishlist.length, user, setWishlist, dispatch]);

  const handleDelete = (id) => {
    setIsLoading(true);

    axios({
      method: "delete",
      // url: process.env.REACT_APP_MYNTRA_API + "/wishlist/" + id,
      url: `${process.env.REACT_APP_BASE_API}/user/wishlist/${id}`,
    })
      .then((res) => {
        dispatch(getUserDetails());
        getWishlitProd();
        // setIsLoading(false);

        // getWishlitProd();
        toast({
          title: "Product removed from wishlist",
          variant: "top-accent",
          isClosable: true,
          position: "top-right",
          status: "error",
          duration: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddCart = (el) => {
    setIsLoading(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_API}/user/addcart`,
      data: {
        productId: el._id,
        currentSize: el.size[0],
      },
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
  // if (isLoading) {
  //   return (
  //     <Box height={"200px"}>
  //       <LoadingPage />
  //     </Box>
  //   );
  // }
  return (
    <>
      {/* .................. */}
      <Navbar />

      {!isLoading ? (
        <>
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
              {wishlist.length > 0 ? (
                wishlist?.map((el) => {
                  return (
                    <SingleWishlistProduct
                      key={el._id}
                      el={el}
                      handleAddCart={handleAddCart}
                      handleDelete={handleDelete}
                    />
                  );
                })
              ) : (
                <Box mt={"20%"}>
                  <Text fontSize={"18px"} fontWeight={500} color={"#282c3f"}>
                    YOUR WISHLIST IS EMPTY
                  </Text>
                  <Text fontSize={"17px"} fontWeight={400} color={"#b2b4b9"}>
                    Add items that you like to your wishlist. Review them
                    anytime and easily move them to the bag.
                  </Text>
                </Box>
              )}
            </SimpleGrid>
          </Box>
        </>
      ) : (
        <Box height={"600px"}>
          <LoadingPage />
        </Box>
      )}

      <Footer />
    </>
  );
};

export default Wishlist;
