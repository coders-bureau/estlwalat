import {
  Box,
  Button,
  HStack,
  VStack,
  Input,
  Image,
  Text,
  FormControl,
  FormLabel,
  Center,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Heading,
  useToast,
  Flex,
  Stack,
  Radio,RadioGroup,
} from "@chakra-ui/react";
import OtherNavbar from "../Components/OtherNavbar";
import OtherFooter from "../Components/OtherFooter";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import warning from "../Assets/estyle.png";
import { PaymentDetains1, PaymentDetains2 } from "../Components/PaymentDetains";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../Redux/UserReducer/Action";
function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

const Payment = () => {
  const location = useLocation();
  const [cartProducts, setCartProducts] = useState([]);
  console.log(cartProducts);
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(getDate());
  // const { addressLine, offerPrice } = location.state;
  // if (!location.state) {
  //   // Redirect to the cart page (replace '/cart' with your cart page's path)
  //   navigate("/cart");
  //   return null; // Return null or a loading message while redirecting
  // }

  if (!location.state) {
    navigate("/cart");
  } else {
  }

  const {
    addressLine,
    totalAmount,
    totalMRP,
    totalMRPDiscount,
    offerPrice,
    couponDiscount,
  } = location.state ? location.state : {};

  console.log(currentDate);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.UserReducer);

  const [toggle, setToggle] = useState(true);
  const [code, setCode] = useState("");
  const [value, setValue] = useState({
    cardno: "",
    cardName: "",
    month: "",
    cvv: "",
  });

  const captcha = 3535;
  const { cardno, cardName, month, cvv } = value;

  const activeStyle = {
    fontSize: "14px",
    fontWeight: "700",
    borderLeft: "5px solid #ff3f6c",
    cursor: "pointer",
    marginTop: "none",
    color: "#ff3f6c",
    backgroundColor: "#fff",
  };

  const defaultStyle = {
    backgroundColor: "lightgray",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "none",
  };

  const handleToggle = (value) => {
    setToggle(!toggle);
    setSelectedPaymentMode(value);
    
  };

  const handleSubmit = () => {
    // for (let i = 0; i < cartData.length; i++) {
    //   for (let j = 0; j < checkoutData.length; j++) {
    //     if (cartData[i].id === checkoutData[j].id) {
    //       dispatch(deleteCartData(cartData[i].id)).then(() => dispatch(fetchCartData()));
    //       dispatch(deleteCheckoutData(checkoutData[j].id)).then(() => dispatch(getCheckoutData()));
    //       console.log("CD", cartData);
    //     }
    //   }
    // }
    if (code !== captcha || code === "") {
      toast({
        title: "Please fill the capture first",
        // description: "We've received your payment.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      // toast.error("Please fill the capture first", {
      //   position: "top-center",
      // });

      return;
    }

    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_API}/order/addOrder`,
      data: {
        addressLine: addressLine,
        paymentMode: "COD",
      },
    })
      .then(() => {
        dispatch(getUserDetails());
        axios({
          method: "delete",
          // url: process.env.REACT_APP_MYNTRA_API + `/cart/${id}`,
          url: `${process.env.REACT_APP_BASE_API}/user/cartall`,
        })
          .then(() => {
            // dispatch(getUserDetails(mobileNumber));
            // toast({
            //   title: "Product successfully deleted.",
            //   status: "error",
            //   duration: 3000,
            //   isClosable: true,
            //   position: "top",
            // });
          })
          .catch((err) => {
            // toast({
            //   title: "Please Wait.... Deleting",
            //   status: "warning",
            //   duration: 3000,
            //   isClosable: true,
            //   position: "top",
            // });
            console.log(err);
          });
        console.log("done orders");
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/success");
  };

  // useEffect(() => {
  //   if (!user) {
  //     dispatch(getUserDetails());
  //     // setIsLoading(false);
  //   } else {
  //     // dispatch(getUserDetails(mobileNumber));
  //     // setCartProducts(user.cart);
  //     // setAddress(user.address[0])
  //     setUserID(user._id);
  //     // setIsLoading(false);
  //   }
  //   // handleCartProducts();
  // }, [ user, dispatch]);

  const handleSubmitCard = () => {
    // for (let i = 0; i < cartData.length; i++) {
    //   for (let j = 0; j < checkoutData.length; j++) {
    //     if (cartData[i].id === checkoutData[j].id) {
    //       dispatch(deleteCartData(cartData[i].id)).then(() => dispatch(fetchCartData()));
    //       dispatch(deleteCheckoutData(checkoutData[j].id)).then(() => dispatch(getCheckoutData()));
    //       console.log("CD", cartData);
    //     }
    //   }
    // }
    if (!cardName || !cardno || !month || !cvv) {
      toast.error("Please fill the field first", {
        position: "top-center",
      });
      return;
    }
    navigate("/success");
  };

  // const { totalAmount, totalMRP, totalMRPDiscount } = location.state;
  const expiryRef = useRef({ month: "", year: "" });
  const paymentRef = useRef({ name: "", cardNm: "", cvc: "" });
  const [check, setCheck] = useState({ isloading: false, status: false });
  const { isloading, status } = check;
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const toast = useToast();
  let t1;

  const handlePayment = () => {
    const { month, year } = expiryRef.current;
    const { name, cardNm, cvc } = paymentRef.current;
    const currentYear = new Date().getFullYear();
    setCheck((prev) => ({ ...prev, isloading: true }));

    if (
      name.length > 2 &&
      +name != name &&
      cardNm.length === 12 &&
      +cardNm == cardNm &&
      +cardNm > 9999999999 &&
      cvc.length > 2 &&
      +cvc == cvc &&
      +cvc > 99 &&
      +month &&
      +month < 13 &&
      currentYear <= +year &&
      +year - currentYear < 10
    ) {
      setTimeout(() => {
        setCheck((prev) => ({ ...prev, status: true, isloading: false }));
        toast({
          title: "Payment successful.",
          description: "We've received your payment.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }, [1500]);
    } else {
      setTimeout(() => {
        setCheck((prev) => ({ ...prev, status: false, isloading: "error" }));
      }, [1000]);

      t1 = setTimeout(() => {
        setCheck((prev) => ({ ...prev, status: false, isloading: false }));
      }, [5000]);
    }
  };

  const handleErrorMenu = () => {
    clearTimeout(t1);
    setCheck((prev) => ({ ...prev, status: false, isloading: false }));
  };
  useEffect(() => {
    getCartProd();
  }, []);

  const getCartProd = () => {
    // setIsLoading(true);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_API}/user/cart/items`,
    })
      .then((res) => {
        // setIsLoading(false);
        setCartProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [selectedPaymentMode, setSelectedPaymentMode] = useState("cod"); // Default selection

  const handlePaymentModeChange = (value) => {
    setSelectedPaymentMode(value);
  };

  const handlePaymentSubmit = () => {
    // Pass the selected payment mode to the parent component
    // onSelectPaymentMode(selectedPaymentMode);
  };
  return (
    <>
      <OtherNavbar />
      {/* {isloading === "error" ? (
        <Box h={"75vh"} w="100%">
          <Center height="100%">
            <Modal isOpen={isOpen}>
              <ModalOverlay />
              <ModalContent>
                <ModalBody>
                  <Center w="100%" h="full">
                    <VStack>
                      <Image src={warning} boxSize={"150px"}></Image>
                      <Heading as={"h1"}>Oops!</Heading>
                      <Heading as="h3" fontSize={"20px"}>
                        Your card was declined.
                      </Heading>
                      <Text>
                        Please{" "}
                        <span
                          onClick={handleErrorMenu}
                          style={{ color: "blue", cursor: "pointer" }}
                        >
                          {" "}
                          go Back{" "}
                        </span>
                        and fix this...
                      </Text>
                    </VStack>
                  </Center>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Center>
        </Box>
      ) : isloading ? (
        <Box h={"75vh"} w="100%">
          <Center height="100%">
            <Spinner thickness="4px" size="xl" color="pink.500" speed="0.95s" />
          </Center>
        </Box>
      ) : status ? (
        <Box h="75vh">
          <Center w="full" h="full">
            <VStack w="full" spacing={8}>
              <Image
                width={"50%"}
                src={
                  "https://www.knowband.com/blog/wp-content/uploads/2020/03/THANKYOU-PAGE-2.png"
                }
              ></Image>
              <Button onClick={() => navigate("/")} colorScheme={"pink"}>
                Continue Shopping
              </Button>
            </VStack>
          </Center>
        </Box>
      ) : (
        <Box my={"25px"} py={"25px"} minH={"70vh"}>
          <Center>
            <VStack
              width={"27%"}
              p={"30px"}
              borderRadius={"10px"}
              spacing={8}
              bgColor={"rgba(229,229,229,0.3)"}
            >
              <Box w="80px">
                <Image
                  w={"full"}
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                ></Image>
              </Box>

              <FormControl isRequired w={"full"}>
                <VStack spacing={"19px"} w="full">
                  <HStack spacing={"24px"}>
                    <VStack align={"flex-start"} w="75%" spacing={"8px"}>
                      <FormLabel>CARD NUMBER</FormLabel>
                      <Input
                        defaultValue={paymentRef.current.cardNm}
                        onChange={(e) =>
                          (paymentRef.current.cardNm = e.target.value)
                        }
                        focusBorderColor="#b8c5e6"
                        bgColor={"#f0f0f0"}
                        maxLength={"12"}
                        minLength={12}
                        placeholder="7419 9412 5910 9218"
                      />
                    </VStack>
                    <VStack align={"flex-start"} w="25%" spacing={"8px"}>
                      <FormLabel>CVC</FormLabel>
                      <Input
                        defaultValue={paymentRef.current.cvc}
                        onChange={(e) =>
                          (paymentRef.current.cvc = e.target.value)
                        }
                        focusBorderColor="#b8c5e6"
                        bgColor={"#f0f0f0"}
                        maxLength={4}
                        minLength={3}
                        placeholder="253"
                      />
                    </VStack>
                  </HStack>
                  <VStack w={"full"} align={"flex-start"} spacing={"8px"}>
                    <FormLabel>CARD HOLDER NAME</FormLabel>
                    <Input
                      defaultValue={paymentRef.current.name}
                      onChange={(e) =>
                        (paymentRef.current.name = e.target.value)
                      }
                      focusBorderColor="#b8c5e6"
                      bgColor={"#f0f0f0"}
                      placeholder="User Name"
                      maxLength={50}
                      minLength={2}
                    />
                  </VStack>

                  <VStack align={"flex-start"} spacing={"8px"}>
                    <FormLabel>EXPERITION DATE</FormLabel>
                    <HStack>
                      <Input
                        defaultValue={expiryRef.current.month}
                        onChange={(e) =>
                          (expiryRef.current.month = e.target.value)
                        }
                        focusBorderColor="#b8c5e6"
                        bgColor={"#f0f0f0"}
                        placeholder="12"
                        maxLength={2}
                      ></Input>
                      <Input
                        defaultValue={expiryRef.current.year}
                        onChange={(e) =>
                          (expiryRef.current.year = e.target.value)
                        }
                        focusBorderColor="#b8c5e6"
                        bgColor={"#f0f0f0"}
                        placeholder="2027"
                        maxLength={4}
                        minLength={4}
                      ></Input>
                    </HStack>
                  </VStack>
                  <Box py={"15px"} w="full">
                    <Button
                      colorScheme={"facebook"}
                      w="100%"
                      onClick={handlePayment}
                    >
                      Pay {totalAmount}{" "}
                    </Button>
                  </Box>
                </VStack>
              </FormControl>
            </VStack>
          </Center>
        </Box>
      )} */}
      {/* <OtherFooter /> */}

      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        lineHeight={"18.5714px"}
        border={"0px solid gray"}
      >
        <HStack
          mt={9}
          spacing={[0, 0, 8]}
          mx={"auto"}
          // py={12}
          px={6}
          border={"0px solid gray"}
          alignItems={"flex-start"}
          display={["grid", "grid", "flex"]}
          w={["full", "full", "90%"]}
        >
          <Box borderRight={"1px solid lightgray"} p={6} mb={4}>
            <Stack>
              <Box border={"1px solid lightgray"} p={2}>
                <HStack>
                  <Image
                    src="https://w7.pngwing.com/pngs/679/616/png-transparent-sales-discounts-and-allowances-computer-icons-dicount-miscellaneous-angle-text.png"
                    w="30px"
                  />
                  <Text fontWeight={700} fontSize="14px">
                    Bank Offer
                  </Text>
                </HStack>
                <Text
                  margin={"10px 0px"}
                  textAlign={"left"}
                  paddingLeft="40px"
                  color="gray"
                  fontSize={"13px"}
                >
                  {/* • 10% Instant Discount on Credit and Debit Card on a min Spend
                  of Rs 3,000. TCA{" "} */}
                  NO Offers
                </Text>
              </Box>

              <Box w="full">
                <Heading textAlign={"left"} fontSize="16px" p={"10px 0"}>
                  Choose Payment Mode
                </Heading>
                <VStack border={"1px solid lightgray"} alignItems={"flex-start"} p={5} spacing={4}>
                  <RadioGroup
                  colorScheme={"pink"}
                    onChange={handleToggle}
                    value={selectedPaymentMode}
                  >
                    <VStack alignItems="start">
                      <Radio value="cod">Cash on Delivery (COD)</Radio>
                      <Radio value="online">Online Payment</Radio>
                    </VStack>
                  </RadioGroup>
                <Button w={'full'} color={"#fff"} bgColor={"#ff3f6c"} onClick={handlePaymentSubmit}  display={{ md: "inline-block", base: "none" }}>
                    Continue
                  </Button>
                </VStack>
                
                {/* <HStack
                  border={"1px solid lightgray"}
                  justifyContent={"space-between"}
                  p={5}
                >
                  {" "}
                  {toggle ? (
                    <Box marginTop={[0, 0, 0]} w="40%">
                      <Box onClick={handleToggle} style={activeStyle} p={2}>
                        Cash On Delivery
                      </Box>
                      <Box
                        mt={2}
                        onClick={handleToggle}
                        style={defaultStyle}
                        p={2}
                      >
                        Credit/Debit Card
                      </Box>
                      <Box mt={2} style={defaultStyle} p={2}>
                        Online Payment
                      </Box>
                      <Box mt={2} style={defaultStyle} p={2}>
                        Pay-tm/Wallets
                      </Box>
                      <Box mt={2} style={defaultStyle} p={2}>
                        Net Banking
                      </Box>
                      <Box mt={2} style={defaultStyle} p={2}>
                        EMI/Pay Later
                      </Box>
                    </Box>
                  ) : (
                    <Box marginTop={[0, 0, 0]} w="40%">
                      <Box onClick={handleToggle} style={defaultStyle} p={2}>
                        Cash On Delivery
                      </Box>
                      <Box
                        mt={2}
                        onClick={handleToggle}
                        style={activeStyle}
                        p={2}
                      >
                        Credit/Debit Card
                      </Box>
                      <Box mt={2} style={defaultStyle} p={2}>
                        PhonePe/Google
                      </Box>
                      <Box mt={2} style={defaultStyle} p={2}>
                        Pay-tm/Wallets
                      </Box>
                      <Box mt={2} style={defaultStyle} p={2}>
                        Net Banking
                      </Box>
                      <Box mt={2} style={defaultStyle} p={2}>
                        EMI/Pay Later
                      </Box>
                    </Box>
                  )}
                  {toggle ? (
                    <Box pl={4}>
                      <Stack border={"0px solid"} textAlign="left" spacing={4}>
                        <FormControl>
                          <Stack spacing={4}>
                            <Text marginBottom={"30px"} fontWeight={"700"}>
                              Pay On Delivery (Cash/UPI)
                            </Text>
                            <Box
                              // w={"30%"}
                              textAlign="center"
                              p={2}
                              border={"1px solid"}
                              borderRadius="5px"
                            >
                              {captcha}
                            </Box>

                            <Input
                              w="90%"
                              type={"text"}
                              value={code}
                              fontSize={"15px"}
                              placeholder="Enter code Show in above image*"
                              isRequired
                              onChange={(e) => setCode(Number(e.target.value))}
                            />
                            <Text fontSize={"12px"} color={"gray"}>
                              You can pay via Cash or UPI enabled app at the
                              time on delivery. Ask executive for these options
                            </Text>
                            <Button
                              background={"#ff3f6c"}
                              color="#fff"
                              _hover={{
                                backgroundColor: "#ff3f6c",
                              }}
                              onClick={handleSubmit}
                              display={{ md: "inline-block", base: "none" }}
                            >
                              Place Order
                            </Button>
                          </Stack>
                        </FormControl>
                      </Stack>
                    </Box>
                  ) : (
                    <Box textAlign={"left"} pl={4}>
                      <FormControl>
                        <Text m={"10px 0px"} fontSize="14px" fontWeight={"700"}>
                          CREDIT/DEBIT CARD
                        </Text>
                        <Text fontSize={"14px"} color="darkgray">
                          please ensure your card can be used or online
                          transaction .<Text color="#ff3f6c">know More</Text>
                        </Text>
                        <Stack mt={4} spacing={6}>
                          <Input
                            fontSize={"13px"}
                            type="number"
                            placeholder="Card Number"
                            isRequired
                            onChange={(e) =>
                              setValue((prev) => ({
                                ...prev,
                                cardno: e.target.value,
                              }))
                            }
                          />
                          <Input
                            fontSize={"13px"}
                            type="text"
                            marginTop={4}
                            marginBottom={4}
                            placeholder="Name on card"
                            isRequired
                            onChange={(e) =>
                              setValue((prev) => ({
                                ...prev,
                                cardName: e.target.value,
                              }))
                            }
                          />
                          <HStack>
                            <Input
                              fontSize={"13px"}
                              type="month"
                              placeholder="Valid Thru(MM/YY)"
                              isRequired
                              onChange={(e) =>
                                setValue((prev) => ({
                                  ...prev,
                                  month: e.target.value,
                                }))
                              }
                            />
                            <Input
                              fontSize={"13px"}
                              type="number"
                              placeholder="CVV"
                              isRequired
                              onChange={(e) =>
                                setValue((prev) => ({
                                  ...prev,
                                  cvv: e.target.value,
                                }))
                              }
                            />
                          </HStack>
                          <Button
                            mt={4}
                            background={"#ff3f6c"}
                            color="#fff"
                            w="full"
                            _hover={{
                              backgroundColor: "#fff36c",
                            }}
                            onClick={handleSubmitCard}
                            display={{ md: "inline-block", base: "none" }}
                          >
                            Pay Now
                          </Button>
                        </Stack>
                      </FormControl>
                    </Box>
                  )}
                </HStack> */}
              </Box>
              <Box
                border={"px solid gray"}
                display={["block", "block", "none"]}
                w={["full", "full", "45%"]}
                marginTop={[8, 8, 0]}
              >
                {/* ........................... */}
                <PaymentDetains1
                  totalMRP={totalMRP}
                  totalMRPDiscount={totalMRPDiscount}
                  offerPrice={offerPrice}
                  couponDiscount={couponDiscount}
                />
                {/* .......................... */}
                <br />
                <hr />
                {/* <br /> */}
                <HStack w={"full"} mt={2} justify={"space-between"}>
                  <Text fontSize={"14px"} color={"#3e4152"} fontWeight={"bold"}>
                    TOTAL Amount
                  </Text>
                  <Text fontSize={"14px"} color={"#3e4152"} fontWeight={"bold"}>
                    ₹ {totalAmount - couponDiscount}
                  </Text>
                </HStack>
                {/* ........................... */}
              </Box>
              <Flex
                display={["none", "none", "flex"]}
                marginTop="30px"
                flexFlow={"wrap"}
              >
                <Image
                  w="70px"
                  src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ssl.png"
                  alt="card"
                />
                <Image
                  w="70px"
                  src="https://constant.myntassets.com/checkout/assets/img/footer-bank-visa.png"
                  alt="card"
                />
                <Image
                  w="70px"
                  src="https://constant.myntassets.com/checkout/assets/img/footer-bank-mc.png"
                  alt="card"
                />
                <Image
                  w="70px"
                  src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ae.png"
                  alt="card"
                />
                <Image
                  w="70px"
                  src="https://constant.myntassets.com/checkout/assets/img/footer-bank-dc.png"
                  alt="card"
                />
                <Image
                  w="70px"
                  src="https://constant.myntassets.com/checkout/assets/img/footer-bank-nb.png"
                  alt="card"
                />
                <Image
                  w="70px"
                  src="https://constant.myntassets.com/checkout/assets/img/footer-bank-cod.png"
                  alt="card"
                />
                <Image
                  w="70px"
                  src="https://constant.myntassets.com/checkout/assets/img/footer-bank-rupay.png"
                  alt="card"
                />
                <Image
                  w="70px"
                  src="https://constant.myntassets.com/checkout/assets/img/footer-bank-paypal.png"
                  alt="card"
                />
                <Image
                  w="70px"
                  src="https://constant.myntassets.com/checkout/assets/img/footer-bank-bhim.png"
                  alt="card"
                />
              </Flex>
            </Stack>
          </Box>
          <Box
            border={"px solid gray"}
            w={["full", "full", "30%"]}
            display={{ lg: "block", md: "block", base: "none" }}
            marginTop={[8, 8, 0]}
          >
            {/* ........................... */}
            <PaymentDetains1
              totalMRP={totalMRP}
              totalMRPDiscount={totalMRPDiscount}
              offerPrice={offerPrice}
              couponDiscount={couponDiscount}
            />
            {/* .......................... */}
            <br />
            <hr />
            {/* <br /> */}
            <HStack w={"full"} mt={2} justify={"space-between"}>
              <Text fontSize={"14px"} color={"#3e4152"} fontWeight={"bold"}>
                TOTAL Amount
              </Text>
              <Text fontSize={"14px"} color={"#3e4152"} fontWeight={"bold"}>
                ₹ {totalAmount - couponDiscount}
              </Text>
            </HStack>
            {/* ........................... */}
          </Box>
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
            <HStack w={"full"} mt={2} justify={"left"}>
              <Text fontSize={"14px"} color={"#3e4170"} fontWeight={"bold"}>
                ₹ {totalAmount - couponDiscount}
              </Text>
            </HStack>
            <Button
              size={"md"}
              mx={5}
              my={2}
              px={7}
              color={"#fff"}
              borderRadius={3}
              border={"2px"}
              // p="22px 53px"
              w={"50%"}
              bg="#ff3e6c"
              borderColor={"#ff3e6c"}
              variant={"solid"}
              _hover={{ bgColor: "#ff3e6c" }}
              onClick={toggle ? handleSubmit : handleSubmitCard}
            >
              {toggle ? "PLACE ORDER " : "PAY NOW"}
            </Button>
          </HStack>
        </HStack>
      </Flex>
    </>
  );
};

export default Payment;
