import { SimpleGrid, Box, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleProductCom from "./SingleProductCom";
import LoadingPage from "../Pages/LoadingPage";
import PageNotFound from "../Pages/PageNotFound";
import loading from "../Assets/loading.gif";

const Products = () => {
  const { Products, isLoading, isError } = useSelector(
    (store) => store.AppReducer
  );

  console.log(Products);
  if (isLoading)
    return (
  <>
      <Box
        // height={"200px"}
        borderRadius={100}
        boxShadow={
          "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
        }
        position={"fixed"}
        top={{ lg: "50%", md: "50%", base: "40%" }}
        left={{ lg: "50%", md: "50%", base: "50%" }}
        transform={"translate(-50% , -50%)"}
      >
        <Image
          w={"50px"}
          m={"auto"}
          align={"center"}
          src={loading}
          alt="loading"
        />
      </Box>
      <SimpleGrid
        w="100%"
        h={"66vh"}
        // p="0px 20px 20px 20px"
      >
       
      </SimpleGrid>
  </>
    );
  if (isError)
    return (
      <>
        <PageNotFound />
      </>
    );
  return (
    <>
      <SimpleGrid
      px={"5vw"}
        columns={{ lg: "4", md: "3", base: "2" }}
        spacingX={{ lg: "40px", md: "40px", base: "15px" }}
        spacingY={{ lg: "30px", md: "30px", base: "15px" }}
        w="100%"
        // p="0px 20px 20px 20px"
      >
        {Products?.map((el) => {
          return <SingleProductCom key={el._id} {...el} />;
        })}
      </SimpleGrid>
    </>
  );
};

export default Products;
