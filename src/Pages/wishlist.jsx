import { Box, HStack, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import SingleWishlistProduct from "../Components/SingleWishlistProduct";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const toast = useToast();

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
    getWishlitProd();
  }, [wishlist.length, setWishlist]);

  const handleDelete = (id) => {
    axios({
      method: "delete",
      url: process.env.REACT_APP_MYNTRA_API + "/wishlist/" + id,
    })
      .then((res) => {
        getWishlitProd();
        // toast({
        //   title: "Product successfully deleted.",
        //   variant: "top-accent",
        //   isClosable: true,
        //   position: "top-right",
        //   status: "error",
        //   duration: 2000,
        // })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddCart = (el) => {
    axios({
      method: "post",
      url: process.env.REACT_APP_MYNTRA_API + "/cart",
      data: { ...el, currentSize: el.size[0] },
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
        handleDelete(el.id);
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
                key={el.id}
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
