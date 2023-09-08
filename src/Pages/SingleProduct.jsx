import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Icon,
  InputGroup,
  Input,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Footer from "../Components/Footer";
import { getProducts, getProductsData } from "../Redux/AppReducer/Action";
import { BsHandbag, BsTruck } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import SingleProductCom from "../Components/SingleProductCom";
import LoadingPage from "../Pages/LoadingPage";
import PageNotFound from "../Pages/PageNotFound";
import Review from "../Components/Review";
import Navbar from "../Components/Navbar";
import { getUserDetails } from "../Redux/UserReducer/Action";

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
  const mobileNumber = localStorage.getItem("MbNumber");
  const [userId, setUserID] = useState("");

  const pinInputRef = useRef("");
  const { id } = useParams();
  console.log(id);
  const [sizeRef, setSize] = useState("");
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { Products, isLoading, isError } = useSelector(
    (store) => store.AppReducer
  );
  const { user } = useSelector((store) => store.UserReducer);

  const { isAuth } = useSelector((store) => store.AuthReducer);
  const [currentProduct, setCurrentProduct] = useState({});
  const {
    _id,
    MRP,
    brand,
    category,
    offer,
    images,
    price,
    // rating,
    // ratingT,
    size,
    title,
    type,
    reviews,
  } = currentProduct;
  // console.log(offer);
  const toast = useToast();
  const [similarProducts, setSimilarProducts] = useState([]);
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState("");
  const [len, setLen] = useState(4);
  const [offer1, setOffer] = useState({
    type1 : "",
    value : "",
    text : "",
  })
  // console.log(reviews);
  // console.log(reviews[0]);

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

      // dispatch(getProducts(getProductParams));
      dispatch(getProductsData(getProductParams));
    }
  }, [Products.length, dispatch, location.search]);

  console.log(currentProduct);
  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails(mobileNumber));
    } else {
      setUserID(user._id);
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (Products) {
      const currentProduct = Products.find((item) => item._id === id);
      console.log(currentProduct);
      currentProduct && setCurrentProduct(currentProduct);
      currentProduct && setMainImage(currentProduct.img);
      currentProduct && setLen(currentProduct.images.length);
      currentProduct && setOffer(currentProduct.offer);
    }
  }, [id, Products.length]);

  useEffect(() => {
    if (Products.length !== 0) {
      const newSimilarProducts = Products?.filter((el) => {
        return category == el.category && type == el.type && el._id != id;
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

  const 
  setsize = (size) => {
    if (size === sizeRef) {
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

  const handleBuyNow = () => {
    if (sizeRef) {
      // axios({
      //   method: "post",
      //   url: process.env.REACT_APP_MYNTRA_API + "/cart",
      //   data: { ...currentProduct, currentSize: sizeRef },
      // })
      // axios({
      //   method: "post",
      //   url: `http://localhost:5000/user/`+userId+`/cart/`+id,
      // })
      axios({
        method: "post",
        // url: `${process.env.REACT_APP_BASE_API}/user/cart/` + id,
        // data: {
        //   currentSize: sizeRef,
        // },
        url: `${process.env.REACT_APP_BASE_API}/user/addcart`,
        data: {
          productId: id,
          currentSize: sizeRef,
        },
      })
        .then((res) => {
          // dispatch(getUserDetails(mobileNumber));
          console.log("then");
          navigate("/cart");
        })
        .catch((err) => {
          console.log("catch",err);
          // dispatch(getUserDetails(mobileNumber));
          // navigate("/address");
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

  const handleSendCart = () => {
    if (sizeRef) {
      // axios({
      //   method: "post",
      //   url: process.env.REACT_APP_MYNTRA_API + "/cart",
      //   data: { ...currentProduct, currentSize: sizeRef },
      // })
      axios({
        method: "post",
        // url: `${process.env.REACT_APP_BASE_API}/user/cart/` + id,
        // data: {
        //   currentSize: sizeRef,
        // },
        url: `${process.env.REACT_APP_BASE_API}/user/addcart`,
        data: {
          productId: id,
          currentSize: sizeRef,
        },
      })
        .then((res) => {
          // dispatch(getUserDetails(mobileNumber));
          console.log(res);
          toast({
            title: res.data.message,
            variant: "top-accent",
            isClosable: true,
            position: "top-right",
            status: "success",
            duration: 1500,
          });
        })
        .catch((err) => {
          // dispatch(getUserDetails());
          console.log(err);
          toast({
            title: "Error in adding.",
            variant: "top-accent",
            isClosable: true,
            position: "top-right",
            status: "success",
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
      url: `${process.env.REACT_APP_BASE_API}/user/wishlist/${_id}`,
    })
      .then((res) => {
        dispatch(getUserDetails(mobileNumber));
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

  if (isLoading)
    return (
      <>
        <LoadingPage />
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
      <Navbar />
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
      <Box w={"full"} p={{ base: "10px 30px", lg: "10px 100px" }}>
        <Grid
          templateColumns={{
            lg: "40% 50%",
            md: "40% 50%",
            sm: "100%",
            base: "100%",
          }}
          gap={8}
          w="full"
        >
          {/* ..........Image............. */}

          <Box>
            <SimpleGrid columns={1} pb={6}>
              <Box style={style.style} w="full">
                <Image
                  _hover={style.hover}
                  src={`http://localhost:5000/${mainImage}`}
                  w="full"
                />
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={len} spacing={2}>
              {images?.map((img, i) => {
                return (
                  <Box style={style.style} w="full" key={i}>
                    <Image
                      onClick={() => setMainImage(img)}
                      _hover={style.hover}
                      src={"http://localhost:5000/" + img}
                      w="full"
                    />
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>
          {/* ............................. */}
          <Box position={"sticky"} top="55px" h="max-content">
            <VStack spacing={4} textAlign="left" w={"full"}>
              <Box w="full">
                <Heading
                  fontWeight={"600"}
                  as={"h2"}
                  color="#282c3f"
                  fontSize="28px"
                  size="lg"
                >
                  {" "}
                  {title}{" "}
                </Heading>
                <Heading
                  fontWeight={300}
                  as={"h2"}
                  color="#535665"
                  fontSize="20px"
                  size="lg"
                >
                  {" "}
                  {brand}{" "}
                </Heading>
                <Heading
                  fontWeight={"600"}
                  as={"h2"}
                  color="#ff3e6c"
                  fontSize="20px"
                  size="lg"
                >
                  {" "}
                  {offer1.text}{" "}OFF{" "}
                </Heading>
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

                <HStack wrap={"wrap"}>
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
                  ></Button>
                  <Button
                    display={{ lg: "flex", md: "flex", base: "none" }}
                    ml={"0px"}
                    mr={{ lg: "20px", base: "0px" }}
                    onClick={() =>
                      isAuth
                        ? handleBuyNow()
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
                    display={{ lg: "flex", md: "flex", base: "none" }}
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
              </VStack>

              <VStack align="flex-start" w="full" spacing={"20px"}>
                <Review review={reviews} />
              </VStack>
            </VStack>
          </Box>
        </Grid>

        <HStack
          display={{ lg: "none", md: "none", base: "flex" }}
          mt={"20px"}
          gap={"1rem"}
          justifyContent={"center"}
          h="max-content"
          position={"sticky"}
          bottom={0}
        >
          <Button
            onClick={() =>
              isAuth
                ? handleBuyNow()
                : navigate("/signup", {
                    state: `/single_product/${id}`,
                    replace: true,
                  })
            }
            color={"#fff"}
            borderRadius={5}
            border={"2px"}
            p="22px 50px"
            bg="#ff3e6c"
            borderColor={"#ff3e6c"}
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
            bg="#fff"
            variant={"outline"}
          >
            ADD TO BAG
          </Button>
        </HStack>
      </Box>
      {/* ....................... */}
      <Box w={"full"} p={"50px 30px"}>
        <Text textAlign="left" my={8} fontWeight={"bold"} color="#282c3f">
          SIMILAR PRODUCTS
        </Text>

        <SimpleGrid
          columns={{
            lg:
              similarProducts.length >= 6
                ? 6
                : similarProducts.length <= 3
                ? 4
                : similarProducts.length,
            md: "3",
            base: "2",
          }}
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
