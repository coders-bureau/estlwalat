import {
  Box,
  HStack,
  VStack,
  StackDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Text,
  Tag,
  Button,
  Image,
  Grid,
  useDisclosure,
  useToast,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import OtherNavbar from "../Components/OtherNavbar";
import { PaymentDetains1, PaymentDetains2 } from "../Components/PaymentDetains";
import OtherFooter from "../Components/OtherFooter";
import logoPic from "../Assets/estylebg.png";
import AddressModal from "../Components/AddressModal";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingPage from "./LoadingPage";
import CouponDetails from "../Components/CouponDetails";
const Address = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [addressD, setAddress] = useState([]);
  const [pinCode, setPincode] = useState("");
  // const { name, mobileNo, pinCode, area, town, city, state } = addressD;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const toast = useToast();
  const {
    totalAmount,
    totalMRP,
    totalMRPDiscount,
    offerPrice,
    couponDiscount,
    cart
  } = location.state;
  console.log(location.state);
  // const mobileNumber = localStorage.getItem("MbNumber");
  const [selectedAddress, setSelectedAddress] = useState({});
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedAddressstatus, setSelectedAddressStatus] = useState(false);
  const [addressLine, setaddressLine] = useState("");
  const [userId, setUserid] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_API}/user/profile/details/`,
    }).then(({ data }) => {
      setIsLoading(false);
      setAddress(data.user.address);
      setPincode(data.user.address.pinCode);
      setUserid(data.user._id);
      console.log(data.user.address);
    });
  }, []);

  const handleAddressSelection = (addressId) => {
    setSelectedAddress(addressId);
    setPincode(addressId.pinCode);
    setSelectedAddressStatus(true);
    const add =
      addressId.area +
      "-" +
      addressId.town +
      " ," +
      addressId.city +
      " " +
      addressId.state +
      "-" +
      addressId.pinCode;
      
      const mobileNumber = addressId.mobileNo;
      const name = addressId.name;
      setName(name);
      setMobileNumber(mobileNumber);
    setaddressLine(add);
    console.log(add);
    // setPincode()
    // Send the selected address to the backend to update the current address for the user
    // axios.patch(`/api/user/${userId}`, { currentAddress: addressId })
    //   .then((response) => {
    //     console.log('Current address updated successfully!');
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };
  console.log(selectedAddressstatus);
  const handleDeleteAddress = (addressId) => {
    // Replace 'YOUR_BACKEND_API_ENDPOINT' with your actual backend API endpoint for deleting an address
    // fetch(`${process.env.REACT_APP_BASE_API}/user/address/${addressId}`, {
    //   method: "DELETE",
    // })
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_BASE_API}/user/address/${addressId}`,
    })
      .then(() => {
        toast({
          title: "Address Deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        // Remove the deleted address from the frontend state
        setAddress((prevAddresses) =>
          prevAddresses.filter((address) => address._id !== addressId)
        );
        // If the deleted address was the selected address, reset the selectedAddressId state
        if (selectedAddress._id === addressId) {
          setSelectedAddress(null);
        }
      })
      .catch((error) => console.error("Error deleting address:", error));
  };

  console.log(addressD);

  if (isLoading) {
    return (
      <Box height={"200px"}>
        <LoadingPage />
      </Box>
    );
  }
  return (
    <Box>
      <OtherNavbar />
      <Box my={"25px"} py={"25px"}>
        <HStack
          px={"12vw"}
          divider={<StackDivider color={"#ededef"} />}
          alignItems="flex-start"
        >
          {/* ................................. */}
          <Box w={{ lg: "65%", md: "65%", base: "100%" }}>
            <VStack w="full" align={"flex-start"} spacing="20px">
              <HStack w={"full"} justify={"space-between"}>
                <Text color={"#282c3f"} fontWeight={"bold"}>
                  Select Delivery Address
                </Text>
                <Button
                  variant={"outline"}
                  fontSize={"12px"}
                  size="sm"
                  colorScheme="blackAlpha"
                  color="#424553"
                  onClick={onOpen}
                >
                  ADD NEW ADDRESS
                </Button>
              </HStack>
              <Text color="#535766" fontSize={"12px"} fontWeight="bold">
                DEFAULT ADDRESS
              </Text>

              {addressD.map((address, index) => (
                <VStack
                  key={index}
                  spacing={"15px"}
                  borderRadius={"5px"}
                  boxShadow={
                    "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
                  }
                  p={8}
                  w="full"
                  align={"flex-start"}
                >
                  {" "}
                  <HStack textAlign={"left"}>
                    <input
                      color="#ff3f6c"
                      type="checkbox"
                      checked={address === selectedAddress}
                      onChange={() => handleAddressSelection(address)}
                    />
                    <Text fontSize={"14px"} color="#282c3f" fontWeight={"bold"}>
                      {address.name}
                    </Text>
                    {/* <Tag
                      fontSize={"10px"}
                      color="#03a685"
                      colorScheme={"gray"}
                      borderRadius="25%"
                      fontWeight="bold"
                    >
                      OFFICE
                    </Tag> */}
                  </HStack>
                  <VStack
                    align="flex-start"
                    fontSize={"13px"}
                    color="#424553"
                    fontWeight={"400"}
                    spacing={0}
                  >
                    <Text>
                      {address.town},{address.area}-{address.city}
                    </Text>
                    <Text>
                      {address.city},{address.state} - {address.pinCode}
                    </Text>
                  </VStack>
                  <HStack fontSize={"13px"} color="#424553">
                    <Text>Mobile:</Text>
                    <Text color={"#424553"} fontWeight={"bold"}>
                      {address.mobileNo}
                    </Text>
                  </HStack>
                  <Text fontSize={"13px"} color="#424553">
                    &#x2022; Pay on Delivery available!
                  </Text>
                  <Button
                    variant={"outline"}
                    fontSize={"12px"}
                    size="sm"
                    colorScheme="blackAlpha"
                    color="black"
                    fontWeight={500}
                    onClick={() => handleDeleteAddress(address._id)}
                  >
                    Delete
                  </Button>
                </VStack>
              ))}
              <Modal isOpen={isOpen} onClose={onClose} colorScheme="pink">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader
                    fontSize={"14px"}
                    color={"#535766"}
                    fontWeight={"bold"}
                  >
                    ADD NEW ADDRESS
                  </ModalHeader>
                  <ModalCloseButton color={"#535766"} fontWeight={"bold"} />
                  <AddressModal onClose={onClose} setAddress={setAddress} />
                </ModalContent>
              </Modal>

              <Box
                display={{
                  lg: "none",
                  md: "none",
                  base: "inline-block",
                }}
                w={"full"}
              >
                {/* <CouponDetails
                  totalMRP={totalMRP}
                  totalMRPDiscount={totalMRPDiscount}
                  offerPrice={offerPrice}
                  setCouponDiscount={setCouponDiscount}
                /> */}
                <PaymentDetains1
                  totalMRP={totalMRP}
                  totalMRPDiscount={totalMRPDiscount}
                  offerPrice={offerPrice}
                  couponDiscount={couponDiscount}
                />
                {/* .......................... */}
                <Divider borderColor="gray.200" />
                <PaymentDetains2
                  totalAmount={totalAmount}
                  totalMRP={totalMRP}
                  totalMRPDiscount={totalMRPDiscount}
                  addressLine={addressLine}
                  offerPrice={offerPrice}
                  couponDiscount={couponDiscount}
                  // redirect={addressD.pinCode ? "/address" : undefined}
                  redirect={selectedAddressstatus ? "/payment" : undefined}
                />
              </Box>
            </VStack>
          </Box>
          {/* ................................... */}
          <Box
            display={{ md: "inline-block", base: "none" }}
            w={{ lg: "35%", md: "35%", base: "0%" }}
          >
            <VStack
              w={"full"}
              divider={<StackDivider borderColor="gray.200" />}
              spacing="30px"
            >
              {/* ........................... */}

              {/* ....................... */}
              <HStack>
                <HStack>
                  <Text>Estimated delivery by</Text>
                  <Text fontWeight={"bold"}>: 7-8 Days</Text>
                </HStack>
              </HStack>
              {/* ........................... */}
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
                addressLine={addressLine}
                offerPrice={offerPrice}
                couponDiscount={couponDiscount}
                cart={cart}
                name={name}
                mobileNumber={mobileNumber}
                redirect={selectedAddressstatus ? "/payment" : undefined}
              />
              {/* ........................... */}
            </VStack>
          </Box>
        </HStack>
      </Box>
      {/* <OtherFooter /> */}{" "}
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
            selectedAddressstatus
              ? navigate("/payment", {
                  state: {
                    totalAmount,
                    totalMRP,
                    totalMRPDiscount,
                    addressLine,
                    offerPrice,
                    couponDiscount,
                    cart,
                  },
                })
              : toast({
                  title: "Please check your address.",
                  status: "warning",
                  duration: 2000,
                  position: "top",
                })
          }
        >
          PLACE ORDER
        </Button>
      </HStack>
    </Box>
  );
};

export default Address;
