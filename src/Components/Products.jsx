import {
  SimpleGrid,
  Box,
  } from "@chakra-ui/react";
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
      {/* sort by desktop */}
      {/* <Box
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
      </Box> */}
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
      {/* <Box>
        <Pagination
          handlePage={handlePage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </Box> */}
      {/* {filter and sort mobile view} */}
      {/* <HStack
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
      </HStack> */}
    </>
  );
};

export default Products;

