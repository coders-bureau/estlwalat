import {
  Text,
  Button,
  Select,
  HStack,
  VStack,
  SimpleGrid,
  Box,
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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  getProducts,
  getProductsPage,
  getProductsSorted,
} from "../Redux/AppReducer/Action";
import SingleProductCom from "./SingleProductCom";
import LoadingPage from "../Pages/LoadingPage";
import PageNotFound from "../Pages/PageNotFound";
import Pagination from "./Pagination";
import Filter from "../Components/Filter";
import { MdFilterListAlt } from "react-icons/md";
import { TbArrowsSort } from "react-icons/tb";

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initQuery = searchParams.get("q");
  const [currentPage, setCurrentPage] = useState(1);
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
  const { Products, isLoading, isError, totalPages } = useSelector(
    (store) => store.AppReducer
  );
  console.log(useSelector((store) => store.AppReducer));
  // useEffect(() => {
  //   if (Products.length == 0 || location || initQuery) {
  //     const type = searchParams.get("type");
  //     const category = searchParams.getAll("category");
  //     const brand = searchParams.getAll("brand");
  //     const price = searchParams.getAll("price");
  //     const discount = searchParams.get("discount");
  //     const q = searchParams.get("q");
  //     const getProductParams = {
  //       params: {
  //         type,
  //         category,
  //         brand,
  //         price_lte: price,
  //         discount_gte: discount,
  //         q,
  //       },
  //     };

  //     dispatch(getProductsPage(getProductParams, currentPage));
  //   }
  // }, [
  //   Products.length,
  //   dispatch,
  //   location.search,
  //   searchParams,
  //   initQuery,
  //   currentPage,
  // ]);

  const handlePage = (val) => {
    setCurrentPage((prev) => prev + val);
  };

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

  const handleChange = (e) => {
    setSValue(e);
    onCloseSort();
  };
  // sorting filter ends here

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [currentPage]);

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
  console.log(sValue);
  return (
    <>
      {/* sort by desktop */}
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
      <SimpleGrid
        columns={{ lg: "4", md: "3", base: "2" }}
        spacingX={{ lg: "40px", md: "40px", base: "15px" }}
        spacingY={{ lg: "30px", md: "30px", base: "15px" }}
        w="100%"
        p="0px 20px 20px 20px"
      >
        {Products?.map((el) => {
          return <SingleProductCom key={el.id} {...el} />;
        })}
      </SimpleGrid>
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
    </>
  );
};

export default Products;
