import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  StackDivider,
  Text,
  VStack,
  Icon,
  InputGroup,
  Input,
  InputRightElement,
  Toast,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { getProducts, getSProducts } from "../Redux/AppReducer/Action";
import { BsHandbag, BsTruck } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import SingleProductCom from "../Components/SingleProductCom";

const style = {
  hover: {
    transform: "scale(110%)",
    transition: "transform 1s, filter .20s ease-in-out",
    transformOrigin: "center center",
    filter: "brightness(95%)",
  },

  style: {
    overflow: "hidden",
  },
};

const SingleProduct = () => {
  const dispatch = useDispatch();
  const pinInputRef = useRef("");
  const { id } = useParams();
  const [sizeRef, setSize] = useState("");
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { Products, isLoading } = useSelector((store) => store.AppReducer);
  const { isAuth } = useSelector((store) => store.AuthReducer);
  const [currentProduct, setCurrentProduct] = useState({});
  const {
    MRP,
    brand,
    category,
    discount,
    images,
    price,
    rating,
    ratingT,
    size,
    title,
    type,
  } = currentProduct;
  const toast = useToast();
  const [similarProducts, setSimilarProducts] = useState([]);
  const navigate = useNavigate();
  const [mainImage,setMainImage] =useState("");
  const [len,setLen] = useState(4);

  useEffect(() => {
    if (Products.length === 0) {
      const type = searchParams.get("type");
      const category = searchParams.getAll("category");
      const brand = searchParams.getAll("brand");
      const price = searchParams.getAll("price");
      const discount = searchParams.get("discount");
      const getProductParams = {
        params: {
          type,
          category,
          brand,
          price,
          discount,
        },
      };

      dispatch(getProducts(getProductParams));
    }
  }, [Products.length, dispatch, location.search]);

  useEffect(() => {
    if (Products) {
      const currentProduct = Products.find((item) => item.id === +id);
      currentProduct && setCurrentProduct(currentProduct);
      currentProduct && setMainImage(currentProduct.images[0]);
      currentProduct && setLen(currentProduct.images.length);
    }
  }, [id, Products.length,]);

  useEffect(() => {
    if (Products.length !== 0) {
      const newSimilarProducts = Products?.filter((el) => {
        return category == el.category && type == el.type && el.id != +id;
      });

      setSimilarProducts(newSimilarProducts);
    }
  }, [
    location.search,
    id,
    Products.length,
    similarProducts.length,
    currentProduct,
    setSimilarProducts,
  ]);

  const setsize = (size) => {
    if (size == sizeRef) {
      setSize("");
    } else {
      setSize(size);
    }
  };

  const handlePin = () => {
    const string = +pinInputRef.current.value;
    const checkPin =
      pinInputRef.current.value == string &&
      pinInputRef.current.value.length == 6;

    toast({
      title: checkPin
        ? "Congrats,we are available on this place"
        : "Unfortunately we do not ship to your pincode",
      variant: "solid",
      isClosable: true,
      position: "top",
      status: checkPin ? "success" : "error",
      duration: 1500,
    });
  };

  const handleSendCart = () => {
    if (sizeRef) {
      axios({
        method: "post",
        url: process.env.REACT_APP_MYNTRA_API + "/cart",
        data: { ...currentProduct, currentSize: sizeRef },
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
        })
        .catch((err) => {
          toast({
            title: "Product already present in cart",
            variant: "top-accent",
            isClosable: true,
            position: "top-right",
            status: "error",
            duration: 1500,
          });
        });
    } else {
      toast({
        title: "Please select size",
        variant: "solid",
        isClosable: true,
        position: "top",
        status: "info",
        duration: 1500,
      });
    }
  };

  const handleSendWishlist = () => {
    axios({
      method: "post",
      url: process.env.REACT_APP_MYNTRA_API + "/wishlist",
      data: { ...currentProduct, currentSize: sizeRef },
    })
      .then((res) => {
        toast({
          title: "Product successfully added in wishlist",
          variant: "top-accent",
          isClosable: true,
          position: "top-right",
          status: "success",
          duration: 1500,
        });
      })
      .catch((err) => {
        toast({
          title: "Product already present in wishlist",
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
      {/* <Navbar/> */}
      {/* ....................... */}
      <Box>
        <HStack spacing={1} w={"98%"} m={"10px auto"}>
          <Text color={"#46495a"} fontSize={"14px"}>
            Home /{" "}
          </Text>

          <Text fontWeight={500} fontSize={"14px"} color="#282c3f">
            {type} {"/"}
          </Text>
          <Text fontWeight={500} fontSize={"14px"} color="#ff3e6c">
             {brand}
          </Text>
        </HStack>
      </Box>
      <Box w={"full"} p={{base:"10px 30px", lg:"10px 100px"}}>
        <Grid templateColumns={{lg:"40% 50%",md:"40% 50%",sm:"100%",base:"100%"}} gap={8} w="full">
          <Box>
            <SimpleGrid columns={1} pb={6}>
              <Box style={style.style} w="full">
                <Image _hover={style.hover} src={mainImage} w="full" />
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={len} spacing={2}>
              {images?.map((img, i) => {
                return (
                  <Box style={style.style} w="full" key={i}>
                    <Image onClick={()=> setMainImage(img)}  _hover={style.hover} src={img} w="full" />
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>
          {/* ............................. */}
          <Box position={"sticky"} top="0px" h="max-content">
            <VStack
              spacing={4}
              textAlign="left"
              w={"full"}
              // divider={<StackDivider borderColor="gray.200" />}
            >
              <Box w="full">
                <Heading
                  fontWeight={"600"}
                  as={"h2"}
                  color="#282c3f"
                  fontSize="28px"
                  size="lg"
                >
                  {" "}
                  {brand}{" "}
                </Heading>
                <Heading
                  fontWeight={300}
                  as={"h2"}
                  color="#535665"
                  fontSize="20px"
                  size="lg"
                >
                  {" "}
                  {title}{" "}
                </Heading>
                <Heading
                      fontWeight={"600"}
                      as={"h2"}
                      color="#ff3e6c"
                      fontSize="20px"
                      size="lg"
                    >
                      {" "}
                      {discount}% OFF{" "}
                    </Heading>
                {/* <Box w={"full"} mt="15px">
                  <HStack
                    w="max-content"
                    cursor={"pointer"}
                    transition={".5s all"}
                    spacing={"2px"}
                    border={"1px solid #e0e0e0"}
                    borderRadius="3px"
                    padding={"2px 4px"}
                    _hover={{ borderColor: "#282c3f" }}
                  >
                    <HStack spacing={1}>
                      {Math.floor(rating) === rating ? (
                        <Text fontWeight={"bold"}>{rating}.0</Text>
                      ) : (
                        <Text fontWeight={"bold"}>{rating}</Text>
                      )}
                      <Text color="#72bfbc">&#9733;</Text>
                    </HStack>
                    <HStack spacing={1}>
                      <Text color="#e0e0e0" fontWeight={"bold"}>
                        |
                      </Text>
                      <Text fontWeight={300} color="#535766">
                        {" "}
                        {ratingT} Ratings
                      </Text>
                    </HStack>
                  </HStack>
                </Box> */}
              </Box>
              {/* .................... */}

              <VStack align="flex-start" w="full" spacing={"20px"}>
                <VStack align="flex-start" w="full">
                  <HStack spacing={2}>
                    <Heading
                      fontWeight={"600"}
                      as={"h2"}
                      color="#282c3f"
                      fontSize="20px"
                      size="lg"
                    >
                      {" "}
                      ₹{price}{" "}
                    </Heading>
                    <HStack spacing={1}>
                      <Heading
                        fontWeight={300}
                        as={"h2"}
                        color="#535665"
                        fontSize="20px"
                        size="lg"
                      >
                        {" "}
                        MRP
                      </Heading>
                      <Heading
                        fontWeight={300}
                        as={"h2"}
                        color="#535665"
                        fontSize="20px"
                        size="lg"
                        textDecoration={"line-through"}
                      >
                        {" "}
                        ₹{MRP}{" "}
                      </Heading>
                    </HStack>
                    
                  </HStack>
                  <Text color={"#03a685"} fontSize="12px" fontWeight={"bold"}>
                    inclusive of all taxes
                  </Text>
                </VStack>

                <HStack fontSize="14px" justify={"space-between"} w="200px">
                  <Text fontWeight={"bold"} color="#282c3f">
                    SELECT SIZE
                  </Text>
                  <Text fontWeight={500} color="#ff3e6c">
                    SIZE CHART &#62;
                  </Text>
                </HStack>

                <SimpleGrid columns={7} spacing={"10px"}>
                  {size?.map((el, i) => {
                    return (
                      <Box
                        key={i + toString(i)}
                        onClick={() => setsize(el)}
                        borderRadius={"full"}
                        border={`1px solid ${
                          sizeRef === el ? "#ff3e6c" : "#b8b8b8cb"
                        }`}
                        cursor={"pointer"}
                        transition=".5s  all"
                        _hover={{
                          borderColor: "#ff3e6c",
                        }}
                      >
                        <Center fontSize={"14px"} fontWeight={500} p={"10px"}>
                          {el}
                        </Center>
                      </Box>
                    );
                  })}
                </SimpleGrid>

                <HStack  w={{lg:"550px",md:"400px",sm:"400px",base:"200px"}}
                >
                  
                  <Button
                    onClick={() =>
                      isAuth
                        ? handleSendWishlist()
                        : navigate("/signup", {
                            state: `/single_product/${id}`,
                            replace: true,
                          })
                    }
                    color={"#000"}
                    border={0}
                    leftIcon={<Icon as={CiHeart} fontSize="5xl" />}
                    colorScheme="cyan"
                    variant={"outline"}
                  >
                  </Button>
                  <Button ml={"0px"}
                  mr={"20px"}
                    onClick={() =>
                      isAuth
                        ? handleSendCart()
                        : navigate("/signup", {
                            state: `/single_product/${id}`,
                            replace: true,
                          })
                    }
                    color={"#fff"}
                    borderRadius={5}
                    border={"2px"}
                    p="22px 70px"
                    bg="#ff3e6c"
                    variant={"solid"}
                  >
                    BUY NOW
                  </Button>
                  <Button
                    onClick={() =>
                      isAuth
                        ? handleSendCart()
                        : navigate("/signup", {
                            state: `/single_product/${id}`,
                            replace: true,
                          })
                    }
                    
                    textColor={"#ff3e6c"}
                    borderRadius={5}
                    border={"2px"}
                    borderColor={"#ff3e6c"}
                    p="22px 50px"
                    leftIcon={<BsHandbag />}
                    bg="#fff"
                    variant={"outline"}
                  >
                    ADD TO BAG
                  </Button>
                </HStack>
              </VStack>

              <VStack align="flex-start" w="full" spacing={"20px"}>
                <HStack>
                  <Text>DELIVERY OPTIONS</Text>
                  <Icon as={BsTruck} fontSize="xl" />
                </HStack>

                <Box>
                  <InputGroup size="md">
                    <Input
                      focusBorderColor="#bdbdbd"
                      placeholder="Enter pincode"
                      ref={pinInputRef}
                      maxLength={6}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        variant={"unstyled"}
                        color="pink.600"
                        onClick={handlePin}
                      >
                        Check
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>

                {/* <VStack align="flex-start" w="full" spacing={"10px"} py="20px">
                  <Text color={"#282c3f"} fontSize="14px">
                    100% Original Products
                  </Text>
                  <Text color={"#282c3f"} fontSize="14px">
                    Pay on delivery might be available
                  </Text>
                  <Text color={"#282c3f"} fontSize="14px">
                    Easy 30 days returns and exchanges
                  </Text>
                  <Text color={"#282c3f"} fontSize="14px">
                    Try & Buy might be available
                  </Text>
                </VStack> */}
              </VStack>
            </VStack>
          </Box>
        </Grid>
      </Box>
      {/* ....................... */}
      <Box w={"full"} p={"50px 30px"}>
        <Text textAlign="left" my={8} fontWeight={"bold"} color="#282c3f">
          SIMILAR PRODUCTS
        </Text>
        <SimpleGrid 
        // columns={{lg:"4"}}
          columns={
            similarProducts.length >= 6
              ? {lg:"6",md:"3",sm:"2",base:"1"}
              : similarProducts.length <= 3
              ? {lg:"4",md:"3",sm:"2",base:"1"}
              : similarProducts.length
          }
          spacingX="40px"
          spacingY="30px"
          w="100%"
        >
          {similarProducts?.map((el) => {
            return (
              <Box border={"1px solid #f7f5fa"} key={el.id}>
                <SingleProductCom {...el} />
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
      {/* ....................... */}

      <Footer />
    </>
  );
};

export default SingleProduct;
