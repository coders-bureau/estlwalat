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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
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
import { FaHeart } from "react-icons/fa";
import loading from "../Assets/loading.gif";
import { login, userloginStatus } from "../Redux/AuthReducer/Action";
import { useCart } from "./CartContext";
const auth_token = localStorage.getItem("authToken");
axios.defaults.headers.common["auth_token"] = `${auth_token}`;
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
  const { cartCount, setCartCount } = useCart();
  const mobileNumber = localStorage.getItem("MbNumber");
  const [userId, setUserID] = useState("");
  const [reviews, setReviews] = useState("");
  const pinInputRef = useRef("");
  const { id } = useParams();
  // console.log(id);
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
    img,
    images,
    price,
    // rating,
    // ratingT,
    size,
    title,
    type,
    net_weight,
    description,
    countryoforigin,
    manufacturerdetails,
    topColor,
    topFabric,
    bottomColor,
    bottomFabric,
    sleeveLength,
    pantClosure,
  } = currentProduct;
  // console.log(offer);
  const toast = useToast();
  const [similarProducts, setSimilarProducts] = useState([]);
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState("");
  const [len, setLen] = useState(4);
  const [offer1, setOffer] = useState({
    type1: "",
    value: "",
    text: "",
  });

  const [offerPrice, setOfferPrice] = useState(0);
  const [totalMRP, setTotalMRP] = useState(0);
  const [totalMRPDiscount, setTotalMRPDiscount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  // Initialize the shopping cart state as an empty array
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addToCart = (product, currentSize, quantity) => {
    // Create a new item object
    const newItem = {
      product,
      currentSize,
      quantity,
    };

    // Update the cart state by adding the new item
    setCart(newItem);
  };

  // console.log("cart", cart);
  const [addedToWish, setAddedToWish] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = React.useRef(null);
  const [loadingbuynow, setLoadingBuyNow] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  useEffect(() => {
    if (auth_token) {
      const auth_token = localStorage.getItem("authToken");
      axios.defaults.headers.common["auth_token"] = `${auth_token}`;
      dispatch(userloginStatus());
    }
    // dispatch(userloginStatus());
  }, []);
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

  // console.log(currentProduct);

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
      // console.log(currentProduct);
      currentProduct && setCurrentProduct(currentProduct);
      currentProduct && setMainImage(currentProduct.img);
      currentProduct && setLen(currentProduct.images.length);
      currentProduct && setOffer(currentProduct.offer);
      if (currentProduct) {
        setOfferPrice(currentProduct.price - currentProduct.discount);
        setTotalMRP(currentProduct.MRP);
        setTotalMRPDiscount(currentProduct.MRP - currentProduct.price);
        setCouponDiscount(0);
        setTotalAmount(currentProduct.discount);
      }
    }
  }, [id, Products.length]);

  // console.log(
  //   offerPrice,
  //   totalAmount,
  //   totalMRP,
  //   totalMRPDiscount,
  //   couponDiscount
  // );
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

  useEffect(() => {
    if (_id) {
      axios
        .get(`${process.env.REACT_APP_BASE_API}/user/reviews/${_id}`)
        .then((response) => {
          // setisLoading(false);
          // const { data } = response.data;
          // console.log(response.data);
          setReviews(response.data);
          // setRating(data.data)
        })
        .catch((error) => {
          // setisLoading(false);
          console.error("Error fetching reviews:", error);
        });
    }
  }, [_id]);

  const setsize = (size) => {
    if (size === sizeRef) {
      setSize("");
    } else {
      setSize(size);
      addToCart(currentProduct._id, size, 1);
    }
  };
  const [sizeCharts, setSizeCharts] = useState([]);
  useEffect(() => {
    // Fetch size chart data when the component mounts
    axios
      .get(`${process.env.REACT_APP_BASE_API}/sizechart/getsizechart`)
      .then((response) => {
        setSizeCharts(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching size chart data:", error);
      });
  }, []);

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

  const handleBuyNow = async () => {
    if (sizeRef) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_API}/user/addbuynow`,
          {
            productId: currentProduct._id,
            currentSize: sizeRef,
          }
        );
        // console.log(response.data); // You can handle success response here
      } catch (error) {
        console.error("Buy Now:", error);
        dispatch(login("logout"));
      }
      if (isAuth) {
        navigate("/address", {
          state: {
            totalAmount,
            totalMRP,
            totalMRPDiscount,
            // addressLine,
            offerPrice,
            couponDiscount,
            cart,
          },
        });
      }
      // axios({
      //   method: "post",
      //   url: process.env.REACT_APP_MYNTRA_API + "/cart",
      //   data: { ...currentProduct, currentSize: sizeRef },
      // })
      // axios({
      //   method: "post",
      //   url: `http://localhost:5000/user/`+userId+`/cart/`+id,
      // })
      // axios({
      //   method: "post",
      //   // url: `${process.env.REACT_APP_BASE_API}/user/cart/` + id,
      //   // data: {
      //   //   currentSize: sizeRef,
      //   // },
      //   url: `${process.env.REACT_APP_BASE_API}/user/addcart`,
      //   data: {
      //     productId: id,
      //     currentSize: sizeRef,
      //   },
      // })
      //   .then((res) => {
      //     // dispatch(getUserDetails(mobileNumber));
      //     console.log("then");
      //     navigate("/cart");
      //   })
      //   .catch((err) => {
      //     console.log("catch", err);
      //     // dispatch(getUserDetails(mobileNumber));
      //     // navigate("/address");
      //   });
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
      setLoadingBuyNow(true);
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
          setCartCount(cartCount+1);
          // dispatch(getUserDetails(mobileNumber));
          setAddedToBag(true);
          // console.log(res);
          setLoadingBuyNow(false);

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
          setLoadingBuyNow(false);

          console.error(err);
          toast({
            title: "Error in adding",
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
    setLoadingBuyNow(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_API}/user/wishlist/${_id}`,
    })
      .then((res) => {
        setLoadingBuyNow(false);

        dispatch(getUserDetails(mobileNumber));
        setAddedToWish(true);
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
        setAddedToWish(true);
        setLoadingBuyNow(false);
        if (err.response && err.response.status === 401) {
          // Token expired, navigate to the login page
          toast({
            duration: 1500,
            status: "warning",
            title: "Login session expired",
            isClosable: true,
            variant: "top-accent",
            position: "top-right",
          });

          navigate("/login", {
            state: `/store`,
            replace: true,
          });
        } else if (err.response && err.response.status === 400) {
          // Product already in wishlist
          toast({
            duration: 1500,
            status: "warning",
            title: "Product already in wishlist",
            isClosable: true,
            variant: "top-accent",
            position: "top-right",
          });
        } else {
          // Handle other errors here
          console.error(err);
          // Display a generic error message
          toast({
            duration: 1500,
            status: "error",
            title: "An error occurred",
            isClosable: true,
            variant: "top-accent",
            position: "top-right",
          });
        }
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
      {loadingbuynow ? (
        <>
          <Box
            w={"100%"}
            h={"100%"}
            zIndex={10000}
            justifyContent={"center"}
            alignItems={"center"}
            // display={"flex"}
            // bgColor={"rgba(0, 0, 0, 0.5)"}
            opacity={"0.5"}
            // borderRadius={100}
            // boxShadow={
            //   "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
            // }
            backgroundColor={"white"}
            position={"fixed"}
            // top={{ lg: "50%", md: "50%", base: "40%" }}
            // left={{ lg: "50%", md: "50%", base: "50%" }}
            // transform={"translate(-50% , -50%)"}
          >
            <LoadingPage />
          </Box>{" "}
        </>
      ) : (
        <></>
      )}
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
            lg: "30% 50%",
            md: "30% 50%",
            base: "100%",
          }}
          gap={{ lg: "80px", md: "80px", base: "10px" }}
          w="full"
        >
          {/* ..........Image............. */}

          <Box>
            <SimpleGrid columns={1} pb={6}>
              <Box style={style.style} w="full">
                <Image
                  _hover={style.hover}
                  // src={process.env.REACT_APP_BASE_API + "/" + mainImage}
                  src={mainImage}
                  w="full"
                  boxSize={{ lg: "32vw", md: "35vw", base: "105vw" }}
                  objectFit="contain"
                />
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={len + 1} spacing={2}>
              <Box style={style.style} w="full">
                <Image
                  onClick={() => setMainImage(img)}
                  _hover={style.hover}
                  // src={process.env.REACT_APP_BASE_API + "/" + img}
                  src={img}
                  w="full"
                />
              </Box>
              {images?.map((img, i) => {
                return (
                  <Box
                    style={style.style}
                    w="full"
                    display="flex"
                    justifyContent="center" // Center horizontally
                    alignItems="center"
                    key={i}
                  >
                    <Image
                      onClick={() => setMainImage(img)}
                      _hover={style.hover}
                      // src={process.env.REACT_APP_BASE_API + "/" + img}
                      src={img}
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
                  fontSize="20px"
                  // size="lg"
                >
                  {" "}
                  {title}{" "}
                </Heading>
                <Heading
                  fontWeight={300}
                  as={"h2"}
                  color="#535665"
                  fontSize="14px"
                  // size="lg"
                >
                  {brand}{" "}
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
                      // size="lg"
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
                        // size="lg"
                      >
                        {" "}
                        MRP
                      </Heading>
                      <Heading
                        fontWeight={300}
                        as={"h2"}
                        color="#535665"
                        fontSize="20px"
                        // size="lg"
                        textDecoration={"line-through"}
                      >
                        {" "}
                        ₹{MRP}{" "}
                      </Heading>
                      <Heading
                        fontWeight={300}
                        as={"h2"}
                        color={"#ff915c"}
                        fontSize="20px"
                        // size="lg"
                      >
                        {" ("}
                        {/* {offer1.text} OFF{" "} */}
                        {Math.round(((MRP - price) / MRP) * 100)}% OFF
                        {") "}
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
                  {/* <Text fontWeight={500} color="#ff3e6c">
                    SIZE CHART &#62;
                  </Text> */}
                  {/* <Text
                    cursor={"pointer"}
                    fontWeight={500}
                    color="#ff3e6c"
                    onClick={onOpen}
                  >
                    SIZE CHART &#62;
                  </Text> */}

                  <Modal
                    size={{ md: "xl", base: "full" }}
                    finalFocusRef={btnRef}
                    scrollBehavior={"inside"}
                    isOpen={isOpen}
                    onClose={onClose}
                    isCentered
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader mt={{ md: "0px", base: "100px" }}>
                        Size Chart
                      </ModalHeader>
                      <ModalCloseButton />
                      {sizeCharts.length === 0 ? (
                        <p>Loading size chart data...</p>
                      ) : (
                        <ModalBody>
                          {sizeCharts
                            .filter((sizeChart) => sizeChart.name === category)
                            .map((sizeChart) => (
                              <div key={sizeChart._id}>
                                <h3>{sizeChart.name}</h3>
                                <Image
                                  src={
                                    process.env.REACT_APP_BASE_API +
                                    "/" +
                                    sizeChart.sizeReferenceImage
                                  }
                                  alt={sizeChart.name}
                                />
                                <Image
                                  src={
                                    process.env.REACT_APP_BASE_API +
                                    "/" +
                                    sizeChart.sizeChartImageCm
                                  }
                                  alt={sizeChart.name}
                                />
                                <Image
                                  src={
                                    process.env.REACT_APP_BASE_API +
                                    "/" +
                                    sizeChart.sizeChartImageInch
                                  }
                                  alt={sizeChart.name}
                                />
                                {sizeCharts.filter(
                                  (sizeChart) => sizeChart.name === category
                                ).length === 0 && <p>No Size Reference</p>}
                              </div>
                            ))}
                        </ModalBody>
                      )}

                      <Button
                        ml={"45%"}
                        w={"70px"}
                        p={"5px"}
                        mt={"10px"}
                        mb={"15px"}
                        onClick={onClose}
                      >
                        Close
                      </Button>
                    </ModalContent>
                  </Modal>
                </HStack>

                <SimpleGrid
                  columns={{ lg: "7", md: "4", base: "3  " }}
                  spacing={"10px"}
                >
                  {size?.map((el, i) => {
                    return (
                      <Box
                        key={i + toString(i)}
                        onClick={() => setsize(el)}
                        // borderRadius={"full"}
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

                <HStack my={"10px"} wrap={"wrap"}>
                  <Button
                    onClick={() =>
                      isAuth
                        ? handleSendWishlist()
                        : navigate("/login", {
                            state: `/single_product/${id}`,
                            replace: true,
                          })
                    }
                    color={"#000"}
                    border={0}
                    leftIcon={
                      addedToWish ? (
                        <Icon as={FaHeart} fill={"#ff3e6f"} fontSize={"4xl"} />
                      ) : (
                        <Icon
                          as={CiHeart}
                          _hover={{ fill: "#ff3e6c" }}
                          fontSize="5xl"
                        />
                      )
                    }
                    // colorScheme="cyan"
                    _hover={{ bgColor: "white" }}
                    variant={"outline"}
                  ></Button>
                  <Button
                    fontSize="16px"
                    display={{ lg: "flex", md: "flex", base: "none" }}
                    ml={"0px"}
                    mr={{ lg: "20px", base: "0px" }}
                    onClick={() =>
                      isAuth
                        ? handleBuyNow()
                        : navigate("/login", {
                            state: `/single_product/${id}`,
                            replace: true,
                          })
                    }
                    color={"#fff"}
                    borderRadius={5}
                    border={"2px"}
                    p="22px 64px"
                    bg="#ff3e6c"
                    _hover={{
                      backgroundColor: "#b32b4b",
                    }}
                    variant={"solid"}
                  >
                    BUY NOW
                  </Button>
                  <Button
                    onClick={() =>
                      isAuth
                        ? handleSendCart()
                        : navigate("/login", {
                            state: `/single_product/${id}`,
                            replace: true,
                          })
                    }
                    display={{ lg: "flex", md: "flex", base: "none" }}
                    textColor={"#ff3e6c"}
                    borderRadius={5}
                    border={"2px"}
                    borderColor={"#ff3e6c"}
                    p="22px 44px"
                    leftIcon={<BsHandbag />}
                    bg="#fff"
                    variant={"outline"}
                    fontSize={"16px"}
                  >
                    ADD TO BAG
                  </Button>
                </HStack>
              </VStack>

              {/* <VStack align="flex-start" w="full" spacing={"20px"}>
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
              </VStack> */}
              <VStack
                fontSize={"14px"}
                align="flex-start"
                w="full"
                spacing={"20px"}
              >
                {/* <hr /> */}

                <HStack>
                  <Text fontWeight={"700"} color="#282c3f">
                    PRODUCT DESCRIPTION
                  </Text>
                </HStack>
                <Box>
                  {title && (
                    <Text fontSize={"14px"}>
                      <b>Name - </b> {title}
                    </Text>
                  )}
                  {description && (
                    <Text fontSize={"14px"}>
                      <b>Description - </b>
                      {description}
                    </Text>
                  )}
                  {sleeveLength && sleeveLength.length > 0 && (
                    <div>
                      <strong>Sleeve Length:</strong> {sleeveLength.join(", ")}
                    </div>
                  )}
                  {pantClosure && pantClosure.length > 0 && (
                    <div>
                      <strong>Pant Closure:</strong> {pantClosure.join(", ")}
                    </div>
                  )}
                  {topColor && (
                    <Text fontSize={"14px"}>
                      <b>Top Color - </b>
                      {topColor ? topColor : "N/A"}
                    </Text>
                  )}{" "}
                  {topFabric && (
                    <Text fontSize={"14px"}>
                      <b>Top Fabric - </b>
                      {topFabric ? topFabric : "N/A"}
                    </Text>
                  )}{" "}
                  {bottomColor && (
                    <Text fontSize={"14px"}>
                      <b>Bottom Color - </b>
                      {bottomColor ? bottomColor : "N/A"}
                    </Text>
                  )}{" "}
                  {bottomFabric && (
                    <Text fontSize={"14px"}>
                      <b>Bottom Fabric - </b>
                      {bottomFabric ? bottomFabric : "N/A"}
                    </Text>
                  )}{" "}
                  {manufacturerdetails && (
                    <Text fontSize={"14px"}>
                      <b>Manufacturer Details - </b>
                      {manufacturerdetails ? manufacturerdetails : "N/A"}
                    </Text>
                  )}
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
                : navigate("/login", {
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
            _hover={{ bgColor: "#c73054" }}

            variant={"solid"}
          >
            BUY NOW
          </Button>
          <Button
            onClick={() =>
              isAuth
                ? handleSendCart()
                : navigate("/login", {
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
              similarProducts.length >= 4
                ? 4
                : similarProducts.length <= 3
                ? 3
                : similarProducts.length,
            md: "3",
            base: "2",
          }}
          spacingX={{ lg: "40px", md: "40px", base: "10px" }}
          spacingY="30px"
          w="100%"
        >
          {similarProducts?.map((el) => {
            return (
              <Box border={"1px solid #f7f5fa"} key={el._id}>
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
