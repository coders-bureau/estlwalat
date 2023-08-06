import { SimpleGrid, Box } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleProductCom from "./SingleProductCom";
import LoadingPage from "../Pages/LoadingPage";
import PageNotFound from "../Pages/PageNotFound";

const Products = () => {
  const { Products, isLoading, isError } = useSelector(
    (store) => store.AppReducer
  );

  if (isLoading)
    return (
      <Box height={"200px"}>
        <LoadingPage />
      </Box>
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
        columns={{ lg: "4", md: "3", base: "2" }}
        spacingX={{ lg: "40px", md: "40px", base: "15px" }}
        spacingY={{ lg: "30px", md: "30px", base: "15px" }}
        w="100%"
        p="0px 20px 20px 20px"
      >
        {Products?.map((el) => {
          return <SingleProductCom key={el._id} {...el} />;
        })}
      </SimpleGrid>
    </>
  );
};

export default Products;
