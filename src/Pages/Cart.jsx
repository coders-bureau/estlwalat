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
  StackDivider,
  Icon,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  FormErrorMessage,
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
import { MdOutlineLocalOffer } from "react-icons/md";
import CouponDetails from "../Components/CouponDetails";

const Cart = () => {
  const mobileNumber = localStorage.getItem("MbNumber");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [offerPrice, setOfferPrice] = useState(0);
  const [totalMRP, setTotalMRP] = useState(0);
  const [totalMRPDiscount, setTotalMRPDiscount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(
    totalMRP - totalMRPDiscount - offerPrice - couponDiscount
  );
  // console.log(totalAmount);
  const navigate = useNavigate();
  const Products = useSelector((store) => store.AppReducer.Products);
  const [similerProducts, setSimilarProducts] = useState([]);
  const toast = useToast();
  const { user } = useSelector((store) => store.UserReducer);
  const [userId, setUserID] = useState("");
  const dispatch = useDispatch();
  const addressLine = "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");
  const [cartValue, setCartValue] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  // Other code...

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle coupon code input
  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  // Function to handle coupon code submission
  const handleApplyCoupon = () => {
    // Add your coupon validation logic here
    if (couponCode === "valid_coupon") {
      // Coupon code is valid, perform your action here
      setError(""); // Clear any previous errors
      // Close the modal
      closeModal();
    } else {
      setError("Invalid coupon code. Please try again.");
    }
  };

  console.log(cartProducts);
  useEffect(() => {
    getCartProd();
    if (totalMRP - totalMRPDiscount - offerPrice > 0) {
      axios
        .post(`${process.env.REACT_APP_BASE_API}/offer/findcoupon`, {
          cartValue: totalMRP - totalMRPDiscount - offerPrice,
        })
        .then((couponResponse) => {
          const nearestCoupon = couponResponse.data.data;
          console.log(couponResponse.data);
          // Apply the coupon to the cart value
          if (nearestCoupon) {
            // You can apply the coupon logic here and set the discounted cart value
            // For example, if it's a percent coupon:
            const discountAmount = (nearestCoupon.value / 100) * totalAmount;
            const discountedCartValue = totalAmount - discountAmount;
            setCartValue(discountedCartValue);

            // Set the applied coupon for display
            setAppliedCoupon(nearestCoupon);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const loadingFun = (value) => {
    setIsLoading(value);
  };
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
              px={{ lg: "200px", md: "50px", base: "10px" }}
              divider={<StackDivider color={"#ededef"} />}
              alignItems="flex-start"
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
                        Cart: {cartProducts.length} Item
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
                            loadingFun={loadingFun}
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
                        py={"20px"}
                        // marginTop={[8, 8, 0]}
                      >
                        <VStack
                          w={"full"}
                          divider={<StackDivider borderColor="gray.200" />}
                          spacing="10px"
                        >
                          {/* <Box w="full">
                            <VStack align={"flex-start"} w={"full"}>
                              <Text
                                fontSize={"12px"}
                                color={"#535766"}
                                fontWeight={700}
                              >
                                COUPONS
                              </Text>
                              <HStack justify={"space-between"} w="full">
                                <HStack spacing={"15px"}>
                                  <Icon
                                    fontSize={"20px"}
                                    as={MdOutlineLocalOffer}
                                  ></Icon>
                                  <Text
                                    fontSize={"14px"}
                                    color="535766"
                                    fontWeight={"700"}
                                  >
                                    Apply Coupons
                                  </Text>
                                </HStack>
                                <Button
                                  borderRadius={2}
                                  px={4}
                                  py={3}
                                  variant={"outline"}
                                  size={"xs"}
                                  colorScheme={"pink"}
                                  // onClick={openModal}
                                >
                                  APPLY
                                </Button>
                              </HStack>
                            </VStack>
                          </Box> */}
                          {/* Modal */}
                          {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>Apply Coupon</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <FormControl isInvalid={!!error}>
                                  <FormLabel>Coupon Code</FormLabel>
                                  <Input
                                    type="text"
                                    value={couponCode}
                                    onChange={handleCouponCodeChange}
                                  />
                                  <FormErrorMessage>{error}</FormErrorMessage>
                                </FormControl>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  colorScheme="pink"
                                  onClick={handleApplyCoupon}
                                >
                                  Apply
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal> */}
                          <CouponDetails
                            totalMRP={totalMRP}
                            totalMRPDiscount={totalMRPDiscount}
                            offerPrice={offerPrice}
                            setCouponDiscount={setCouponDiscount}
                          />
                          <PaymentDetains1
                            totalMRP={totalMRP}
                            totalMRPDiscount={totalMRPDiscount}
                            offerPrice={offerPrice}
                            couponDiscount={couponDiscount}
                          />
                          {/* .......................... */}
                          {/* <Divider borderWidth="2px" borderColor="gray.200" /> */}
                          <PaymentDetains2
                            totalAmount={totalAmount}
                            totalMRP={totalMRP}
                            totalMRPDiscount={totalMRPDiscount}
                            addressLine={addressLine}
                            offerPrice={offerPrice}
                            couponDiscount={couponDiscount}
                            // redirect={addressD.pinCode ? "/address" : undefined}
                            redirect={"/address"}
                          />
                        </VStack>
                      </Box>
                    </VStack>
                  </Box>

                  {/* <Box></Box> */}
                </VStack>
              </Box>

              {/* ................................... */}
              <Box
                marginTop={"20px"}
                display={{ md: "inline-flex", base: "none" }}
                w={{ lg: "35%", md: "35%", base: "0%" }}
                pb={"10px"}
              >
                <VStack
                  w={"full"}
                  divider={<StackDivider borderColor="gray.200" />}
                  spacing="10px"
                >
                  <CouponDetails
                    totalMRP={totalMRP}
                    totalMRPDiscount={totalMRPDiscount}
                    offerPrice={offerPrice}
                    setCouponDiscount={setCouponDiscount}
                  />
                  {/* <Box w="full">
                    <VStack align={"flex-start"} w={"full"}>
                      <Text
                        fontSize={"12px"}
                        color={"#535766"}
                        fontWeight={700}
                      >
                        COUPONS
                      </Text>
                      <HStack justify={"space-between"} w="full">
                        <HStack spacing={"15px"}>
                          <Icon
                            fontSize={"20px"}
                            as={MdOutlineLocalOffer}
                          ></Icon>
                          <Text
                            fontSize={"14px"}
                            color="535766"
                            fontWeight={"700"}
                          >
                            Apply Coupons
                          </Text>
                          {appliedCoupon && (
                            <Text
                              fontSize={"14px"}
                              color="535766"
                              fontWeight={"700"}
                            >
                              Applied Coupon: {appliedCoupon.text} (
                              {appliedCoupon.value}% off)
                            </Text>
                          )}
                        </HStack>
                        <Button
                          borderRadius={2}
                          px={4}
                          py={3}
                          variant={"outline"}
                          size={"xs"}
                          colorScheme={"pink"}
                          // onClick={openModal}
                        >
                          APPLY
                        </Button>
                      </HStack>
                    </VStack>
                  </Box> */}
                  {/* .......................... */}

                  <PaymentDetains1
                    totalMRP={totalMRP}
                    totalMRPDiscount={totalMRPDiscount}
                    offerPrice={offerPrice}
                    couponDiscount={couponDiscount}
                  />
                  {/* .......................... */}
                  <PaymentDetains2
                    totalAmount={totalAmount}
                    totalMRP={totalMRP}
                    totalMRPDiscount={totalMRPDiscount}
                    offerPrice={offerPrice}
                    couponDiscount={couponDiscount}
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
                      couponDiscount,
                    },
                  })
                }
              >
                PLACE ORDER
              </Button>
            </HStack>
          </Box>
        )}
      </VStack>
    </>
  );
};

export default Cart;
