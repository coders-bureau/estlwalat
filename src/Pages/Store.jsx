import {
  Box,
  Text,
  Grid,
} from "@chakra-ui/react";

import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Filter from "../Components/Filter";
import Footer from "../Components/Footer";
import Products from "../Components/Products";

const Store = () => {

  const { length } = useSelector((store) => store.AppReducer.Products);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const q = searchParams.get("q");

  return (
    <>
      <Box>
        <Grid
          gridTemplateColumns={"50% 50%"}
          spacing={1}
          w={"98%"}
          m={"10px auto"}
        >
          <Box textAlign={"left"}>
            <Text color={"#46495a"} fontSize={"14px"}>
              Home / {type} {q}
            </Text>
          </Box>
          <Box textAlign={"right"}>
            <Text fontWeight={500} fontSize={"14px"} color="#282c3f">
              Total Items - {length} items
            </Text>
          </Box>
        </Grid>
      </Box>
      <Box mb={"50px"}>
        <Grid
          gridTemplateColumns={{ lg: "20% 80%", md: "20% 80%", base: "100%" }}
        >
          {/* filter products */}
          <Box
            display={{
              base: "none",
              md: "inline-block",
              lg: "inline-block",
            }}
          >
            <Filter />
          </Box>

          <Box>

            {/* Products  */}
            <Products />

          </Box>
        </Grid>
      </Box>

      <Footer />
    </>
  );
};

export default Store;
