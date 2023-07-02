import {
  Box,
  HStack,
  Image,
  Text,
  Badge,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  VStack,
  Icon,
  useDisclosure,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Tag,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import React, { useState,useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import prodStyle from "../Styles/Products.module.css";

import Filter from "../Components/Filter";
import Footer from "../Components/Footer";
import Products from "../Components/Products";
import SampleBrand from "../Components/SampleBrand";
import Pagination from "../Components/Pagination";
import { getProductsPage } from "../Redux/AppReducer/Action";
import { store } from "../Redux/Store";

const Store = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { length } = useSelector((store) => store.AppReducer.Products);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const q = searchParams.get("q");
  const dispatch = useDispatch();
  const totalPages= 20;
  const [currentPage, setCurrentPage] = useState(1);
  // console.log(useSelector((store) => store.AppReducer.Products));
  // pagination starts here

  useEffect(() => {
    dispatch(getProductsPage(currentPage));
  }, [dispatch, currentPage]);

  const handlePage = (val) => {
    setCurrentPage((prev) => prev + val);
  };
  // pagination ends here

  return (
    <>
      <Box>
        <HStack spacing={1} w={"98%"} m={"10px auto"}>
          <Text color={"#46495a"} fontSize={"14px"}>
            Home /{" "}
          </Text>

          <Text fontWeight={500} fontSize={"14px"} color="#282c3f">
            {type} {q}
          </Text>
        </HStack>
      </Box>
      <Box>
        <HStack spacing={1} w={"98%"} m={"10px auto"}>
          <Text fontWeight={500} fontSize={"16px"} color="#282c3f">
            Total Items
          </Text>

          <Text fontSize={"16px"} fontWeight={400} color={"#878b94"}>
            - {length} items
          </Text>
        </HStack>
      </Box>
      <Box
        className={prodStyle.product_container}
        // mt={{ base: '5rem', sm: "5rem", md: "3.9rem", lg: "7.2rem" }}
      >
        <Flex
          // pl={"10px"}
          mb={"50px"}
          position={"relative"}
          // padding={"0 1rem 0.5rem 1rem"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          {/* <Box pl={"10px"}  mb={"50px"}> */}
          {/* <Filter  /> */}
          {/* <Grid gridTemplateColumns={"20% 80%"}> */}
          <Box 
          pl="10px"
            border={{ lg: "2px solid #b0a9a9" }}
            display={{
              sm: "none",
              base: "none",
              md: "inline-block",
              lg: "inline-block",
            }}
            position={"absolute"}
            w={"20%"}
            // zIndex={"100"}
            backgroundColor={"#FFF"}
          >
            <Filter />
          </Box>
          <Box
            border={"0px solid gray"}
            w={{ lg: "80%", sm: "100%", md: "80%", base: "100%" }}
            ml={{ base: 0, sm: 0, md: "30%", lg: "20%" }}
          >
            <Flex
              justifyContent={"space-between"}
              borderBottom={"2px solid gray"}
              zIndex={14}
              backgroundColor={"white"}
              mb={"1rem"}
            >
              <Box
                w={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
                m={"0.5rem"}
                display={"flex"}
                flexDirection={{
                  base: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                }}
                px={2}
                alignItems={"left"}
                justifyContent={"space-between"}
                // border={"0px solid gray"}
                // boxShadow={"sm"}
              >
                <Box width={"40%"}>
                  <Text ml={2} textAlign={"left"}>
                    <b>Sort By :</b>
                  </Text>
                  <Select
                    variant="outline"
                    placeholder="All"
                    // p={2}
                    bg={"rgb(229 231 235)"}
                    // onChange={(e) => handleChange(e)}
                  >
                    <option value="rating">Rating </option>
                    <option value="discount">Better Discount</option>
                    <option value="PriceLTH">Price:Low To High</option>
                    <option value="PriceHTL">Price:High To Low</option>
                  </Select>
                </Box>
                <Box border={"0px solid black"} width={"40%"} >
                  <Text
                    ml={2}
                    textAlign={"left"}
                    display={{
                      base: "flex",
                      sm: "flex",
                      md: "none",
                      lg: "none",
                    }}
                  >
                    <b>Filters :</b>
                  </Text>
                  <Stack
                    display={{
                      base: "flex",
                      sm: "flex",
                      md: "none",
                      lg: "none",
                    }}
                  >
                    <Accordion allowToggle>
                      <AccordionItem>
                        <h2>
                          <AccordionButton bg={"rgb(229 231 235)"}>
                            <Box as="span" flex="1" textAlign="left">
                              Filters
                            </Box>
                            <AccordionIcon/>
                          </AccordionButton>
                        </h2>
                        <AccordionPanel >
                        <Filter/>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                    {/* <SampleBrand brands={brands} handleCheck={handleCheck} /> */}
                  </Stack>
                </Box>
              </Box>
            </Flex>
            <div>
              <Products />
              {/* </Grid> */}
            </div>
            <Box>
              <Pagination
                handlePage={handlePage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </Box>
            {/* </Box> */}
            {/* </Grid> */}
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default Store;