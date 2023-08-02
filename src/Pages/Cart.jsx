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

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addressD, setAddress] = useState({});
  const { name, mobileNo, pinCode, area, town, city, state } = addressD;
  const [totalMRP, setTotalMRP] = useState(0);
  const [totalMRPDiscount, setTotalMRPDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(totalMRP - totalMRPDiscount);
  const navigate = useNavigate();
  const Products = useSelector((store) => store.AppReducer.Products);
  const [similerProducts, setSimilarProducts] = useState([]);
  const toast = useToast();
  const { user } = useSelector((store) => store.UserReducer);
  const [userId, setUserID] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    axios({
      url: process.env.REACT_APP_MYNTRA_API + "/Address",
    }).then(({ data }) => setAddress(data));
  }, []);

  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails(mobileNumber));
      setIsLoading(false);
    } else {
      // dispatch(getUserDetails(mobileNumber));
      setCartProducts(user.cart);
      setUserID(user._id);
      setIsLoading(false);
    }
    // handleCartProducts();user
  }, [cartProducts.length,user, setCartProducts, dispatch]);

  const handleCartProducts = () => {
    
    // axios({
    //   method: "get",
    //   url: process.env.REACT_APP_MYNTRA_API + "/cart",
    // })
    //   .then(({ data }) => setCartProducts(data))
    //   .then(setIsLoading(false));
  };

  const handleAddCart = (el) => {
    toast({
      title: "Please wait",
      description: "We are adding your product in cart",
      status: "loading",
      duration: 500,
      isClosable: true,
      position: "top",
    });

    axios({
      url: process.env.REACT_APP_MYNTRA_API + "/cart",
      method: "post",
      data: el,
    })
      .then((res) => {
        handleCartProducts();
        toast({
          title: "Product added in the cart.",
          description: el.title,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        toast({
          title: "Product already present in the cart.",
          description: "Title: " + el.title,
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  useEffect(() => {
    let obj = {};
    for (let el of cartProducts) {
      if (!obj[el.category]) {
        obj[el.category] = el.category;
      }
      if (!obj[el.id]) {
        obj[el.id] = el.id;
      }
    }

    if (similerProducts.length === 0) {
      const newArr = Products.filter((el) => {
        return obj[el.category] && !obj[el.id];
      });
      setSimilarProducts(newArr);
    }

    axios({
      url: process.env.REACT_APP_MYNTRA_API + "/Products",
    }).then((res) => {
      const newArr = res.data?.filter((el) => {
        return obj[el.category] && !obj[el.id];
      });

      setSimilarProducts(newArr);
    });
  }, [cartProducts.length, Products.length]);

  if (isLoading) {
    return (
      <Box height={"200px"}>
        <LoadingPage />
      </Box>
    );
  } else {
    return (
      <>
        <Navbar />
        <VStack justify={"center"}>
          <OtherNavbar />

          {cartProducts.length === 0 ? (
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
              <Box>
                <HStack
                  px={{ lg: "200px", md: "100px", base: "20px" }}
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
                          {name ? (
                            <VStack spacing={0} align={"flex-start"}>
                              <HStack w={"full"}>
                                <Text
                                  fontSize={{
                                    lg: "14px",
                                    md: "14px",
                                    base: "10px",
                                  }}
                                >
                                  Deliver to:
                                </Text>
                                <Text
                                  fontSize={{
                                    lg: "14px",
                                    md: "14px",
                                    base: "10px",
                                  }}
                                  fontWeight={"bold"}
                                >
                                  {name}, {pinCode}
                                </Text>
                              </HStack>

                              <Text
                                textAlign={"left"}
                                fontSize={{
                                  lg: "12px",
                                  md: "12px",
                                  base: "8px",
                                }}
                              >
                                {town}, {area},{city},{state}
                              </Text>
                            </VStack>
                          ) : (
                            <Text
                              fontWeight={"bold"}
                              fontSize={{
                                lg: "14px",
                                md: "14px",
                                base: "10px",
                              }}
                              color="#535766"
                            >
                              Where we need to Deliver !
                            </Text>
                          )}

                          <Button
                            variant={"outline"}
                            colorScheme="pink"
                            borderRadius={"2px"}
                            size={"sm"}
                            fontSize={{ lg: "13px", md: "13px", base: "6px" }}
                            onClick={onOpen}
                          >
                            CHANGE ADDRESS
                          </Button>
                          <Modal
                            isOpen={isOpen}
                            onClose={onClose}
                            colorScheme="pink"
                          >
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader
                                fontSize={"14px"}
                                color={"#535766"}
                                fontWeight={"bold"}
                              >
                                ADD NEW ADDRESS
                              </ModalHeader>
                              <ModalCloseButton
                                color={"#535766"}
                                fontWeight={"bold"}
                              />
                              <AddressModal
                                onClose={onClose}
                                setAddress={setAddress}
                              />
                            </ModalContent>
                          </Modal>
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
                                userId={userId}
                                setTotalMRP={setTotalMRP}
                                setTotalAmount={setTotalAmount}
                                setTotalMRPDiscount={setTotalMRPDiscount}
                                handleCartProducts={handleCartProducts}
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
                          >
                            <PaymentDetains1
                              totalMRP={totalMRP}
                              totalMRPDiscount={totalMRPDiscount}
                            />
                            {/* .......................... */}
                            <Divider borderWidth="2px" borderColor="gray.200" />
                            <PaymentDetains2
                              totalAmount={totalAmount}
                              totalMRP={totalMRP}
                              totalMRPDiscount={totalMRPDiscount}
                              redirect={pinCode ? "/address" : undefined}
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
                      />
                      {/* .......................... */}
                      <PaymentDetains2
                        totalAmount={totalAmount}
                        totalMRP={totalMRP}
                        totalMRPDiscount={totalMRPDiscount}
                        redirect={pinCode ? "/address" : undefined}
                      />
                    </VStack>
                  </Box>
                </HStack>
              </Box>

              <Box
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
                            handleAddCart={handleAddCart}
                          />
                        </Box>
                      );
                    })}
                  </SimpleGrid>
                </Box>
              </Box>
            </Box>
          )}
        </VStack>
      </>
    );
  }
};

export default Cart;
