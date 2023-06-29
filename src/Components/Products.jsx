import { Grid, SimpleGrid, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getProducts } from "../Redux/AppReducer/Action";
import SingleProductCom from "./SingleProductCom";
import SingleCard from "./SingleCard";

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initQuery = searchParams.get("q");

  const { Products, isLoading } = useSelector((store) => store.AppReducer);
  //  console.log(useSelector((store)=>store.AppReducer));
  useEffect(() => {
    if (Products.length == 0 || location || initQuery) {
      const type = searchParams.get("type");
      const category = searchParams.getAll("category");
      const brand = searchParams.getAll("brand");
      const price = searchParams.getAll("price");
      const discount = searchParams.get("discount");
      const q = searchParams.get("q");
      const getProductParams = {
        params: {
          type,
          category,
          brand,
          price_lte: price,
          discount_gte: discount,
          q,
        },
      };

      dispatch(getProducts(getProductParams));
    }
  }, [Products.length, dispatch, location.search, searchParams, initQuery]);

  return (
    <>
      <SimpleGrid
        columns={{ lg: "4", md: "3", sm: "2", base: "1" }}
        spacingX="40px"
        spacingY="30px"
        w="100%"
        p="20px"
      >
        {Products?.map((el) => {
          return <SingleProductCom key={el.id} {...el} />;
        })}
      </SimpleGrid>
      {/* {
            Products?.map((el)=>{
              return <SingleCard key={el.id} prod={el} />
            //  return <SingleProductCom key={el.id} {...el}/>
            })
          } */}
      {/* <Grid
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr) ",
        }}
        gap={"0.9rem"}
        ml={{lg: "1rem",sm: "1rem", md: "1rem", base:"1rem" }}
        mr={{lg: "1rem", sm: "1rem", md: "1rem",base:"1rem" }}
        mt={{ lg: "0rem", sm: "1rem", md: "1rem", base:"1rem" }}
      > */}

      {/* <SimpleGrid
        columns={4} 
        spacingX='40px'
         spacingY='30px'
         w="100%"
         p="20px"
        > */}
      {/* {
        Products?.map((el) => {
          return <SingleCard key={el.id} prod={el} />
          // return <Box><SingleProductCom key={el.id} {...el} /></Box>
        })
      } */}
      {/* </SimpleGrid> */}

      {/* </Grid > */}
      {/* <Grid
        gridTemplateColumns={{
          base: "repeat (1,1fr)",
          lg: "repeat(4 ,1fr) ",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
        }}
        gap={"0.9rem"}
        m={'auto'}
        mt={{ lg: "0rem", sm: "1rem", md: "1rem" }}
      >
        {
          Products?.map((el) => {
            return <SingleProductCom key={el.id} {...el} />
          })
        }
      </Grid> */}
    </>
  );
};

export default Products;
