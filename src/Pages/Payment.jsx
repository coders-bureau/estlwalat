import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  HStack,
  Heading,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MdRefresh } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import OtherNavbar from "../Components/OtherNavbar";
import { PaymentDetains1 } from "../Components/PaymentDetains";
function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}
const Payment = () => {
  const anchorRef = useRef(null);
  const location = useLocation();
  const [cartProducts, setCartProducts] = useState([]);
  // console.log(cartProducts);
  const navigate = useNavigate();
  const handleClick = () => {
    // Programmatically trigger a click on the anchor tag
    if (anchorRef.current) {
      anchorRef.current.click();
    }
  };
  const [loading, setLoading] = useState(false);
  const [cartCouponValue, setCartCouponValue] = useState(null);
  const [currentDate, setCurrentDate] = useState(getDate());
  // const { addressLine, offerPrice } = location.state;
  // if (!location.state) {
  //   // Redirect to the cart page (replace '/cart' with your cart page's path)
  //   navigate("/cart");
  //   return null; // Return null or a loading message while redirecting
  // }
  useEffect(() => {
    // Make an HTTP GET request to fetch the cart coupon value
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_BASE_API}/user/getCartCouponValue`) // Replace with your API endpoint
      .then((response) => {
        setCartCouponValue(response.data.value);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart coupon value:", error);
        setLoading(false);
      });
  }, []);

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
    cart,
    name,
    mobileNumber,
  } = location.state ? location.state : {};

  // console.log(location.state);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.UserReducer);
  // const history = useHistory();
  const [toggle, setToggle] = useState(false);
  const [code, setCode] = useState("");
  const [value, setValue] = useState({
    cardno: "",
    cardName: "",
    month: "",
    cvv: "",
  });
  const randomString = Math.random().toString(36).slice(8);
  const [captcha, setCaptcha] = useState(randomString);

  const refreshString = () => {
    setCode("");
    setCaptcha(Math.random().toString(36).slice(8));
  };

  // const captcha = 3535;
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
    // console.log(value);
  };

  // console.log(toggle);

  const [paymentLink, setPaymentLink] = useState("");
  const handleSubmit = () => {
    setLoading(true);
    if (toggle) {
      if (code === "") {
        toast({
          title: "Please fill the capture first",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-left",
        });

        setLoading(false);
        return;
      }

      if (code !== captcha) {
        toast({
          title: "Captcha is Incorrect",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-left",
        });
        setLoading(false);
        return;
      }
    }

    setLoading(true);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_API}/order/addOrder`,
      data: {
        addressLine: addressLine,
        paymentMode: selectedPaymentMode,
        cartBuyNow: cart,
        name: name,
        mobileNumber: mobileNumber,
      },
    })
      .then((orderRes) => {
        delete axios.defaults.headers.common["auth_token"];

        // dispatch(getUserDetails());
        // console.log(orderRes);
        if (selectedPaymentMode == "online") {
          axios({
            method: "post",
            url: `${process.env.REACT_APP_BASE_API}/order/initiatePayement`,
            data: { orderData: orderRes.data.data },
          })
            .then((res) => {
              // console.log(res);
              if (res.data.data) {
                setPaymentLink(res.data.data);
              } else {
                console.log("no");
              }
            })
            .catch((err) => {
              console.error(err);
              // setLoading(false);
            });
        }
        if (selectedPaymentMode == "cod") {
          // console.log(orderRes.data.data.tranxId);
          navigate(
            `/success/${selectedPaymentMode}/${orderRes.data.data.tranxId}`
          );
        }

        // console.log("done orders");
        // setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // console.error("Error fetching payment status:", error);
        toast({
          title: "Order is not placed. Pls try Again.",
          variant: "solid",
          isClosable: true,
          position: "top",
          status: "error",
          duration: 2000,
        });
        navigate("/cart");
      });
    // axios({
    //   method: "delete",
    //   url: `${process.env.REACT_APP_BASE_API}/user/cartall`,
    // })
    //   .then((response) => {
    //     console.log("response", response);
    //     // dispatch(getUserDetails(mobileNumber));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // setLoading(false);
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
        console.error(err);
      });
  };

  const [selectedPaymentMode, setSelectedPaymentMode] = useState("online"); // Default selection

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
        minH={{ lg: "100vh", base: "0" }}
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
                <VStack
                  border={"1px solid lightgray"}
                  alignItems={"flex-start"}
                  p={5}
                  spacing={4}
                >
                  <Text fontSize={"14px"} fontWeight={0} color="#03a685">
                    Choose Online Payment to get more <b>{cartCouponValue}%</b>{" "}
                    discount on your cart value.
                  </Text>
                  <RadioGroup
                    colorScheme={"pink"}
                    onChange={handleToggle}
                    value={selectedPaymentMode}
                  >
                    <VStack alignItems="start">
                      <Radio value="online">Online Payment</Radio>
                      {!paymentLink && (
                        <Radio value="cod">Cash on Delivery (COD)</Radio>
                      )}
                    </VStack>
                  </RadioGroup>

                  {!paymentLink && (
                    <>
                      {toggle && (
                        <Box pl={4}>
                          <Stack
                            border={"0px solid"}
                            textAlign="left"
                            spacing={4}
                          >
                            <FormControl>
                              <Stack spacing={4}>
                                {/* <Text marginBottom={"30px"} fontWeight={"700"}>
                            Pay On Delivery (Cash/UPI)
                          </Text> */}
                                <HStack>
                                  <Box
                                    w={"full"}
                                    textAlign="center"
                                    p={2}
                                    border={"1px solid"}
                                    color={"#fff"}
                                    textDecoration={"line-through"}
                                    userSelect={"none"}
                                    backgroundColor={"black"}
                                    borderRadius={"5px"}
                                    width={"100px"}
                                    // height={"30px"}
                                    fontSize={"22px"}
                                    // marginBottom={"10px"}
                                  >
                                    {captcha}
                                  </Box>
                                  <Button
                                    leftIcon={<MdRefresh />}
                                    onClick={() => refreshString()}
                                  ></Button>
                                </HStack>

                                <Input
                                  w={"full"}
                                  // type={"text"}
                                  value={code}
                                  fontSize={"15px"}
                                  placeholder="Enter code Show in above image*"
                                  isRequired
                                  onChange={(e) => setCode(e.target.value)}
                                />
                                {/* <Text fontSize={"12px"} color={"gray"}>
                            You can pay via Cash or UPI enabled app at the
                            time on delivery. Ask executive for these options
                          </Text> */}
                              </Stack>
                            </FormControl>
                          </Stack>
                        </Box>
                      )}

                      <Button
                        size={"md"}
                        // mx={5}
                        // my={2}
                        // px={7}
                        w={"full"}
                        color={"#fff"}
                        borderRadius={3}
                        border={"2px"}
                        // p="22px 53px"
                        bg="#ff3e6c"
                        borderColor={"#ff3e6c"}
                        variant={"solid"}
                        _hover={{ bgColor: "#c73054" }}
                        onClick={handleSubmit}
                        display={{ md: "inline-block", base: "none" }}
                      >
                        {toggle ? (
                          "PLACE ORDER "
                        ) : (
                          <>
                            {loading ? (
                              <CircularProgress
                                isIndeterminate
                                size={7}
                                margin={"0 10px"}
                                color="white"
                              />
                            ) : (
                              "NEXT"
                            )}
                          </>
                        )}
                      </Button>
                    </>
                  )}
                  {paymentLink && (
                    <Button
                      size={"md"}
                      w={"full"}
                      color={"#fff"}
                      borderRadius={3}
                      border={"2px"}
                      colorScheme="teal"
                      // p="22px 53px"
                      // bg="#ff3e6c"
                      // borderColor={"#ff3e6c"}
                      variant={"solid"}
                      // _hover={{ bgColor: "#c73054" }}
                      display={{ md: "inline-block", base: "none" }}
                    >
                      {/* <p>Payment Link:</p> */}
                      <a
                        href={paymentLink}
                        // ref={anchorRef}
                        rel="noopener noreferrer"
                      >
                        PAY NOW
                      </a>
                    </Button>
                  )}

                  {/* <Button
                    w={"full"}
                    color={"#fff"}
                    bgColor={"#ff3f6c"}
                    onClick={handlePaymentSubmit}
                    display={{ md: "inline-block", base: "none" }}
                  >
                    Continue
                  </Button> */}
                </VStack>
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
                  {/* <Text fontSize={"14px"} color={"#3e4152"} fontWeight={"bold"}>
                    ₹{" "}
                    {totalAmount -
                      couponDiscount -
                      (cartCouponValue / 100) * totalAmount}
                  </Text> */}
                  {!toggle ? (
                <Text fontSize={"14px"} color={"#3e4152"} fontWeight={"bold"}>
                  ₹{" "}
                  {totalAmount -
                    couponDiscount -
                    Math.floor((cartCouponValue / 100) * totalAmount)}
                </Text>
              ) : (
                <Text fontSize={"14px"} color={"#3e4152"} fontWeight={"bold"}>
                  ₹ {totalAmount - couponDiscount}
                </Text>
              )}
                </HStack>
                <Text
                  align={"left"}
                  fontSize={"10px"}
                  color={"#863e9c"}
                  fontWeight={"bold"}
                >
                  Included all taxes and charges
                </Text>
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
              {!toggle ? (
                <Text fontSize={"14px"} color={"#3e4152"} fontWeight={"bold"}>
                  ₹{" "}
                  {totalAmount -
                    couponDiscount -
                    Math.floor((cartCouponValue / 100) * totalAmount)}
                </Text>
              ) : (
                <Text fontSize={"14px"} color={"#3e4152"} fontWeight={"bold"}>
                  ₹ {totalAmount - couponDiscount}
                </Text>
              )}
            </HStack>
            <Text
              align={"left"}
              fontSize={"10px"}
              color={"#863e9c"}
              fontWeight={"bold"}
            >
              Included all taxes and charges
            </Text>
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
            {!paymentLink && (
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
                onClick={handleSubmit}
              >
                {toggle ? (
                  "PLACE ORDER "
                ) : (
                  <>
                    {loading ? (
                      <CircularProgress
                        isIndeterminate
                        size={7}
                        margin={"0 10px"}
                        color="white"
                      />
                    ) : (
                      "NEXT"
                    )}
                  </>
                )}
              </Button>
            )}
            {paymentLink && (
              <Button
                size={"md"}
                mx={5}
                my={2}
                px={7}
                color={"#fff"}
                borderRadius={3}
                border={"2px"}
                colorScheme="teal"
                // p="22px 53px"
                w={"50%"}
                // bg="#ff3e6c"
                // borderColor={"#ff3e6c"}
                variant={"solid"}
                // _hover={{ bgColor: "#ff3e6c" }}
              >
                <a
                  href={paymentLink}
                  // ref={anchorRef}
                  rel="noopener noreferrer"
                >
                  PAY NOW
                </a>
              </Button>
            )}
          </HStack>
        </HStack>
      </Flex>
    </>
  );
};

export default Payment;
