import {
  Box,
  Divider,
  HStack,
  SimpleGrid,
  VStack,
  Text,
  Button,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Center,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import OtherNavbar from "../Components/OtherNavbar";
import axios from "axios";
import SingleCartProduct from "../Components/SingleCartProduct";
import SingleSimilarProduct from "../Components/SingleSimilarProduct";
import AddressModal from "../Components/AddressModal";
import { PaymentDetains1, PaymentDetains2 } from "../Components/PaymentDetains";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "./LoadingPage";
import PageNotFound from "./PageNotFound";
import { getUserDetails } from "../Redux/UserReducer/Action";
import Navbar from "../Components/Navbar";

const Cart = () => {
  const mobileNumber = localStorage.getItem("MbNumber");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [addressD, setAddress] = useState({});
  // const { name, mobileNo, pinCode, area, town, city, state } = addressD;
  const [offerPrice, setOfferPrice] = useState(0);
  const [totalMRP, setTotalMRP] = useState(0);
  const [totalMRPDiscount, setTotalMRPDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(
    totalMRP - totalMRPDiscount - offerPrice
  );  
  const navigate = useNavigate();
  const Products = useSelector((store) => store.AppReducer.Products);
  const [similerProducts, setSimilarProducts] = useState([]);
  const toast = useToast();
  const { user } = useSelector((store) => store.UserReducer);
  const [userId, setUserID] = useState("");
  const dispatch = useDispatch();
  const addressLine = "";

  console.log(cartProducts);
  useEffect(() => {
    getCartProd();
  }, []);

  const getCartProd = () => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_API}/user/cart/items`,
    })
      .then((res) => {
        setIsLoading(false);
        setCartProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   if (!user) {
  //     dispatch(getUserDetails());
  //     setIsLoading(false);
  //   } else {
  //     // dispatch(getUserDetails(mobileNumber));
  //     // setCartProducts(user.cart);
  //     // setAddress(user.address[0])
  //     setUserID(user._id);
  //     setIsLoading(false);
  //   }
  //   // handleCartProducts();
  // }, [cartProducts.length, user, dispatch]);

  // const handleCartProducts = () => {
  //   dispatch(getUserDetails(mobileNumber));

  //   // axios({
  //   //   method: "get",
  //   //   url: process.env.REACT_APP_MYNTRA_API + "/cart",
  //   // })
  //   //   .then(({ data }) => setCartProducts(data))
  //   //   .then(setIsLoading(false));
  // };

  // const handleAddCart = (el) => {
  //   toast({
  //     title: "Please wait",
  //     description: "We are adding your product in cart",
  //     status: "loading",
  //     duration: 500,
  //     isClosable: true,
  //     position: "top",
  //   });

  //   axios({
  //     // url: process.env.REACT_APP_MYNTRA_API + "/cart",
  //     url: `${process.env.REACT_APP_BASE_API}/user/cart/`+el._id,
  //     method: "post",
  //     data: el,
  //   })
  //     .then((res) => {
  //       dispatch(getUserDetails(mobileNumber));
  //       handleCartProducts();
  //       toast({
  //         title: "Product added in the cart.",
  //         description: el.title,
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //         position: "top",
  //       });
  //     })
  //     .catch((err) => {
  //       toast({
  //         title: "Product already present in the cart.",
  //         description: "Title: " + el.title,
  //         status: "warning",
  //         duration: 3000,
  //         isClosable: true,
  //         position: "top",
  //       });
  //     });
  // };

  // useEffect(() => {
  //   let obj = {};
  //   for (let el of cartProducts) {
  //     if (!obj[el.category]) {
  //       obj[el.category] = el.category;
  //     }
  //     if (!obj[el.id]) {
  //       obj[el.id] = el.id;
  //     }
  //   }

  // if (similerProducts.length === 0) {
  //   const newArr = Products.filter((el) => {
  //     return obj[el.category] && !obj[el.id];
  //   });
  //   setSimilarProducts(newArr);
  // }

  //   axios({
  //     url: process.env.REACT_APP_MYNTRA_API + "/Products",
  //   }).then((res) => {
  //     const newArr = res.data?.filter((el) => {
  //       return obj[el.category] && !obj[el.id];
  //     });

  //     setSimilarProducts(newArr);
  //   });
  // }, [cartProducts.length, Products.length]);

  if (isLoading) {
    return (
      <Box height={"200px"}>
        <LoadingPage />
      </Box>
    );
  }
  return (
    <>
      {/* <Navbar /> */}
      <VStack justify={"center"}>
        <OtherNavbar />

        {/* {cartProducts.length === 0 ? ( */}
        {cartProducts.length == 0 ? (
          <Box>
            <Center>
              <VStack>
                <Image
                  w={{ lg: "100px", md: "100px", base: "50px" }}
                  src="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp"
                />
                <Text
                  fontWeight={700}
                  fontSize={{ lg: "20px", md: "20px", base: "10px" }}
                  color={"424553"}
                >
                  Hey, it feels so light!
                </Text>
                <Text
                  fontSize={{ lg: "14px", md: "14px", base: "10px" }}
                  pb="20px"
                  fontWeight={400}
                  color="#7e818c"
                >
                  There is nothing in your bag. Let's add some items.
                </Text>
                <Button
                  onClick={() => navigate("/wishlist")}
                  colorScheme={"pink"}
                  variant="outline"
                  borderRadius={"2px"}
                  fontSize={{ lg: "13px", md: "13px", base: "12px" }}
                >
                  ADD ITEM FROM WISHLIST
                </Button>
              </VStack>
            </Center>
          </Box>
        ) : (
          <Box>
            <HStack
              px={{ lg: "200px", md: "100px", base: "5px" }}
              // alignItems="flex-start"
            >
              {/* ................................. */}
              <Box w={{ lg: "65%", md: "65%", base: "100%" }}>
                <VStack>
                  <Box
                    w="full"
                    border={"1px solid #ebebed"}
                    p={4}
                    borderRadius={"7px"}
                  >
                    <HStack justify={"space-between"} w={"full"}>
                      <Text fontWeight={500}>
                        {" "}
                        {/* Cart: {cart.length} Item */}
                      </Text>
                    </HStack>
                  </Box>

                  <Box w={"full"}>
                    <VStack
                      w={"full"}
                      // mt={8}
                    >
                      {cartProducts?.map((item, i) => {
                        return (
                          <SingleCartProduct
                            key={item._id}
                            {...item}
                            {...item.product}
                            cartId={item._id}
                            userId={userId}
                            setTotalMRP={setTotalMRP}
                            setTotalAmount={setTotalAmount}
                            setTotalMRPDiscount={setTotalMRPDiscount}
                            setOfferPrice={setOfferPrice}
                            getCartProd={getCartProd}
                            // handleCartProducts={handleCartProducts}
                          />
                        );
                      })}

                      <Box
                        display={{
                          lg: "none",
                          md: "none",
                          base: "inline-block",
                        }}
                        w={"full"}
                        marginTop={[8, 8, 0]}
                      >
                        <PaymentDetains1
                          totalMRP={totalMRP}
                          totalMRPDiscount={totalMRPDiscount}
                          offerPrice={offerPrice}
                        />
                        {/* .......................... */}
                        <Divider borderWidth="2px" borderColor="gray.200" />
                        <PaymentDetains2
                          totalAmount={totalAmount}
                          totalMRP={totalMRP}
                          totalMRPDiscount={totalMRPDiscount}
                          addressLine={addressLine}
                          offerPrice={offerPrice}
                          // redirect={addressD.pinCode ? "/address" : undefined}
                          redirect={"/address"}
                        />
                      </Box>
                    </VStack>
                  </Box>

                  {/* <Box></Box> */}
                </VStack>
              </Box>

              {/* ................................... */}
              <Box
                display={{ md: "inline-block", base: "none" }}
                w={{ lg: "35%", md: "35%", base: "0%" }}
              >
                <VStack w={"full"}>
                  {/* .......................... */}

                  <PaymentDetains1
                    totalMRP={totalMRP}
                    totalMRPDiscount={totalMRPDiscount}
                    offerPrice={offerPrice}
                  />
                  {/* .......................... */}
                  <PaymentDetains2
                    totalAmount={totalAmount}
                    totalMRP={totalMRP}
                    totalMRPDiscount={totalMRPDiscount}
                    offerPrice={offerPrice}
                    // redirect={addressD.pinCode ? "/address" : undefined}
                    redirect={"/address"}
                  />
                </VStack>
              </Box>
            </HStack>

            {/* <Box
              w="full"
              px={{ lg: "200px", md: "100px", base: "20px" }}
              mt={"70px"}
              textAlign={"left"}
            >
              <Box bgColor={"#fff6f8"} p={2}>
                <Divider borderColor={"black"} />
                <Text p={2} color={"#282c3f"} fontWeight="bold">
                  You may also like
                </Text>
                <SimpleGrid
                  w="full"
                  columns={{ lg: 4, md: 3, base: 2 }}
                  spacing={"20px"}
                >
                  {similerProducts?.map((el) => {
                    return (
                      <Box key={el.id} bgColor={"#fff"}>
                        <SingleSimilarProduct
                          el={el}
                          // handleAddCart={handleAddCart}
                        />
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </Box>
            </Box> */}
          </Box>
        )}
        <HStack
          zIndex={1001}
          bgColor={"#ffffff"}
          w={"100%"}
          display={{ lg: "none", md: "none", base: "flex" }}
          // m={"10px"}
          gap={"1rem"}
          justifyContent={"right"}
          h="max-content"
          position={"sticky"}
          bottom={0}
        >
          <Button
            mx={5}
            my={2}
            color={"#fff"}
            borderRadius={3}
            border={"2px"}
            // p="22px 53px"
            w={"100%"}
            bg="#ff3e6c"
            borderColor={"#ff3e6c"}
            variant={"solid"}
            _hover={{ bgColor: "#ff3e6c" }}
            onClick={() =>
              navigate("/address", {
                state: {
                  totalAmount,
                  totalMRP,
                  totalMRPDiscount,
                  addressLine,
                  offerPrice,
                },
              })
            }
          >
            PLACE ORDER
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default Cart;
