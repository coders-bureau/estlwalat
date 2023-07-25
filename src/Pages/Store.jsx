import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Grid,
  RadioGroup,
  Radio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
} from "@chakra-ui/react";

import Filter from "../Components/Filter";
import { MdFilterListAlt } from "react-icons/md";
import { TbArrowsSort } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import Footer from "../Components/Footer";
import Products from "../Components/Products";
import { getProductsSorted } from "../Redux/AppReducer/Action";
import Pagination from "../Components/Pagination";

const Store = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const initQuery = searchParams.get("q");
  // const { length } = useSelector((store) => store.AppReducer.Products);
  console.log(useSelector((store) => store.AppReducer));
  const data = useSelector((store) => store.AppReducer);
  console.log(data);
  const type = searchParams.get("type");
  const q = searchParams.get("q");
  const [sValue, setSValue] = useState("ALL");
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
  const handleChange = (e) => {
    setSValue(e);
    onCloseSort();
  };
  // const { Products, totalPages } = useSelector(
  //   (store) => store.AppReducer
  // );
  const totalPages = data.totalPages;
  const length = data.Products.length;

  const handlePage = (val) => {
    setCurrentPage((prev) => prev + val);
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1); // Scroll to top of the page
  }, [type]);
  // sorting filter start
  useEffect(() => {
    //console.log(sValue);
    if (Products.length === 0 || location || initQuery) {
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
      dispatch(getProductsSorted(sValue, currentPage, getProductParams));
    }
  }, [
    dispatch,
    sValue,
    currentPage,
    Products.length,
    location.search,
    searchParams,
    initQuery,
  ]);
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
                width={400}
                variant="outline"
                placeholder="All"
                bg={"rgb(229 231 235)"}
                onChange={(e) => handleChange(e.target.value)}
              >
                <option value="rating">Rating </option>
                <option value="discount">Better Discount</option>
                <option value="PriceLTH">Price:Low To High</option>
                <option value="PriceHTL">Price:High To Low</option>
              </Select>
            </Box>
            {/* Products  */}
            <Products />
            <Box>
              <Pagination
                handlePage={handlePage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </Box>
            {/* {filter and sort mobile view} */}
            <HStack
              zIndex={1001}
              bgColor={"#ffffff"}
              display={{ lg: "none", md: "none", base: "flex" }}
              m={"10px"}
              gap={"1rem"}
              justifyContent={"center"}
              h="max-content"
              position={"sticky"}
              bottom={0}
            >
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
                      onChange={handleChange}
                      value={sValue}
                      colorScheme="pink"
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

              <Button
                ref={btnRef}
                onClick={onOpenFilter}
                textColor={"#ff3e6c"}
                borderRadius={5}
                border={"2px"}
                borderColor={"#ff3e6c"}
                p="22px 50px"
                leftIcon={<MdFilterListAlt />}
                bg="#fff"
                variant={"outline"}
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

      <Footer />
    </>
  );
};

export default Store;
