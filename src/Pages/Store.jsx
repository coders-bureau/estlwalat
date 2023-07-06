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
  Button,
  RadioGroup,
  Radio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import prodStyle from "../Styles/Products.module.css";

import Filter from "../Components/Filter";
import Footer from "../Components/Footer";
import Products from "../Components/Products";
import SampleBrand from "../Components/SampleBrand";
import Pagination from "../Components/Pagination";
import { getProductsPage } from "../Redux/AppReducer/Action";
import { store } from "../Redux/Store";
import Navbar from "../Components/Navbar";
import { MdFilterListAlt } from "react-icons/md";
import { TbArrowsSort } from "react-icons/tb";

const Store = () => {
  const {
    isOpen: isOpenSort,
    onOpen: onOpenSort,
    onClose: onCloseSort,
  } = useDisclosure();
  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useDisclosure();

  const btnRef = React.useRef(null);
  const navigate = useNavigate();
  const { length } = useSelector((store) => store.AppReducer.Products);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const q = searchParams.get("q");

  const [isSortBoxOpen, setIsSortBoxOpen] = useState(false);
  const [isFilterBoxOpen, setIFiltersBoxOpen] = useState(false);

  const [sValue, setSValue] = useState("");

  const handleSortButtonClick = () => {
    setIsSortBoxOpen(true);
  };

  const handleSortCloseBox = () => {
    setIsSortBoxOpen(false);
  };

  const handleFilterButtonClick = () => {
    setIFiltersBoxOpen(true);
  };

  const handleFilterCloseBox = () => {
    setIFiltersBoxOpen(false);
  };

  const handleChange = (e) => {
    setSValue(e);
    handleSortCloseBox();
  };

  console.log(sValue);
  return (
    <>
      {/* <Navbar/> */}
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
          <Box
            // border={"2px solid #b0a9a9"}
            display={{
              base: "none",
              md: "inline-block",
              lg: "inline-block",
            }}
          >
            <Filter />
          </Box>

          <Box>
            <Box
              display={{
                base: "none",
                md: "flex",
                lg: "flex",
              }}
            >
              <Text py={"2"} mx={2} textAlign={"left"}>
                <b>Sort By : </b>
              </Text>
              <Select
                // px={2}
                width={400}
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
            <Products />
            <HStack
              zIndex={1001}
              bgColor={"#ffffff"}
              display={{ lg: "none", md: "none", base: "flex" }}
              m={"10px"}
              gap={"1rem"}
              justifyContent={"center"}
              h="max-content"
              // w={"100%"}
              // p={{
              //   base: "5px",
              //   sm: "5px",
              //   md: "0px",
              //   lg: "0px",
              // }}
              position={"sticky"}
              bottom={0}
            >
              {/* <Button
                // ml={"0px"}
                // mr={{ lg: "20px", base: "0px" }}
                // onClick={() =>
                //   isAuth
                //     ? handleSendCart()
                //     : navigate("/signup", {
                //         state: `/single_product/${id}`,
                //         replace: true,
                //       })
                // }
                leftIcon={<TbArrowsSort />}
                color={"#fff"}
                borderRadius={5}
                border={"2px"}
                p="22px 53px"
                bg="#ff3e6c"
                borderColor={"#ff3e6c"}
                variant={"solid"}
              >
                Sort
              </Button> */}
              <Button
                ref={btnRef}
                onClick={onOpenSort}
                leftIcon={<TbArrowsSort />}
                color={"#fff"}
                borderRadius={5}
                border={"2px"}
                p="22px 53px"
                bg="#ff3e6c"
                borderColor={"#ff3e6c"}
                variant={"solid"}
                // onClick={handleSortButtonClick}
              >
                Sort
              </Button>
              <Modal
                size={"full"}
                onClose={onCloseSort}
                finalFocusRef={btnRef}
                isOpen={isOpenSort}
                scrollBehavior={"inside"}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader pt={"200px"}>Sort by:</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <RadioGroup
                      // pt={"100px"}
                      onChange={handleChange}
                      value={sValue}
                      colorScheme="pink"
                      // color={"#ff3e6c"}
                      size={"lg"}
                    >
                      <VStack alignItems={"flex-start"} spacing={1}>
                        <Radio value="rating">Rating </Radio>
                        <Radio value="discount">Better Discount</Radio>
                        <Radio value="PriceLTH">Price:Low To High</Radio>
                        <Radio value="PriceHTL">Price:High To Low</Radio>
                      </VStack>
                    </RadioGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onCloseSort}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              {isSortBoxOpen && (
                <Box
                  position="fixed"
                  // top="0"
                  // left="0"
                  bottom="0"
                  width="100%"
                  height="70%"
                  backgroundColor={"#ffffff"}
                  // backgroundColor="rgba(0, 0, 0, 0.5)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  zIndex="9999"
                >
                  <div>
                    {/* Contents of the overlay box */}
                    {/* <h2>Overlay Box</h2> */}
                    {/* <Filter /> */}
                    <RadioGroup
                      onChange={handleChange}
                      value={sValue}
                      colorScheme={"pink"}
                      size={"sm"}
                    >
                      <VStack alignItems={"flex-start"} spacing={1}>
                        <Radio value="Men">Men</Radio>
                        <Radio value="Women">Women</Radio>
                        <Radio value="Kids">Kids</Radio>
                      </VStack>
                    </RadioGroup>
                    <br />
                    <Button onClick={handleSortCloseBox}>Close</Button>
                  </div>
                </Box>
              )}
              {isFilterBoxOpen && (
                <Box
                  position="fixed"
                  // top="110px"
                  // left="0"
                  bottom="0"
                  width="100%"
                  height="80%"
                  backgroundColor={"#ffffff"}
                  // backgroundColor="rgba(0, 0, 0, 0.5)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  zIndex="9999"
                  overflow={"auto"}
                >
                  {/* <div> */}
                  {/* Contents of the overlay box */}
                  {/* <h2>Overlay Box</h2> */}
                  <Filter />
                  <Button onClick={handleFilterCloseBox}>Close</Button>

                  {/* <br /> */}
                  {/* </div> */}
                </Box>
              )}
              {/* Rest of your component code */}

              <Button
                ref={btnRef}
                onClick={onOpenFilter}
                // onClick={() =>
                //   isAuth
                //     ? handleSendCart()
                //     : navigate("/signup", {
                //         state: `/single_product/${id}`,
                //         replace: true,
                //       })
                // }
                // fontSize={{ lg: "20px", md: "20px", base: "10px" }}

                textColor={"#ff3e6c"}
                borderRadius={5}
                border={"2px"}
                borderColor={"#ff3e6c"}
                p="22px 50px"
                leftIcon={<MdFilterListAlt />}
                bg="#fff"
                variant={"outline"}
                // onClick={handleFilterButtonClick}
              >
                Filter
              </Button>
              <Modal
                size={"full"}
                onClose={onCloseFilter}
                finalFocusRef={btnRef}
                isOpen={isOpenFilter}
                scrollBehavior={"inside"}
              >
                <ModalOverlay />
                <ModalContent>
                  {/* <ModalHeader>Modal Title</ModalHeader> */}
                  <ModalCloseButton />
                  <ModalBody pt="120px">
                    <Filter />
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onCloseFilter}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </HStack>
          </Box>
        </Grid>
      </Box>

      {/* <Box
        className={prodStyle.product_container}
        // mt={{ base: '5rem', sm: "5rem", md: "3.9rem", lg: "7.2rem" }}
      >
        <Flex
          mb={"50px"}
          position={"relative"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
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
                  md: "row",
                  lg: "row",
                }}
                px={2}
                alignItems={"left"}
                justifyContent={"space-between"}
                // border={"0px solid gray"}
                // boxShadow={"sm"}
              >
                <Box width={"90%"}>
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
                <Box border={"0px solid black"} width={"90%"}>
                  <Text
                    ml={2}
                    textAlign={"left"}
                    display={{
                      base: "flex",
                      md: "none",
                      lg: "none",
                    }}
                  >
                    <b>Filters :</b>
                  </Text>
                  <Stack
                    display={{
                      base: "flex",
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
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel>
                          <Filter />
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Stack>
                </Box>
              </Box>
            </Flex>
            <div>
              <Products />
            </div>
          </Box>
        </Flex>
      </Box> */}
      <Footer />
    </>
  );
};

export default Store;
