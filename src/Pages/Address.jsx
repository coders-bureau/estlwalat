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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import OtherNavbar from "../Components/OtherNavbar";
import { PaymentDetains1, PaymentDetains2 } from "../Components/PaymentDetains";
import OtherFooter from "../Components/OtherFooter";
import logoPic from "../Assets/estylebg.png";
import AddressModal from "../Components/AddressModal";
import { useLocation } from "react-router-dom";
import axios from "axios";
const Address = () => {
  const [addressD, setAddress] = useState([]);
  const [pinCode, setPincode] = useState("");
  // const { name, mobileNo, pinCode, area, town, city, state } = addressD;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const { totalAmount, totalMRP, totalMRPDiscount } = location.state;
  const mobileNumber = localStorage.getItem("MbNumber");
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedAddressstatus, setSelectedAddressStatus] = useState(false);
  const [addressLine,setaddressLine] =  useState("");
  const [userId, setUserid] = useState("");
  const handleAddressSelection = (addressId) => {
    setSelectedAddress(addressId);
    setPincode(addressId.pinCode);
    setSelectedAddressStatus(true);
    const add = addressId.area+"-"+addressId.town+" ,"+addressId.city+" "+addressId.state+"-"+addressId.pinCode;
    setaddressLine(add)
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
    fetch(`https://estylewalabackend.onrender.com/user/${userId}/address/${addressId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
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

  useEffect(() => {
    axios({
      url: "https://estylewalabackend.onrender.com/user/" + mobileNumber,
    }).then(({ data }) => {
      setAddress(data.user.address);
      setPincode(data.user.address.pinCode);
      setUserid(data.user._id);
      console.log(data.user.address);
      // if (!selectedAddress && data.user.address.length > 0) {
      //   setSelectedAddress(data.user.address[0]._id);
      // }
      // Send the selected address to the backend to update the current address for the user
      // axios.patch(`/api/user/${userId}`, { currentAddress: response.data.addresses[0]._id })
      //   .then((response) => {
      //     console.log('Current address updated successfully!');
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    });
  }, []);
  // useEffect(() => {
  //   axios({
  //     url: process.env.REACT_APP_MYNTRA_API + "/Address",
  //   }).then(({ data }) => setAddress(data));
  // }, []);
  console.log(selectedAddress);
  return (
    <Box>
      <OtherNavbar />
      <Box my={"25px"} py={"25px"}>
        <HStack
          px={"200px"}
          divider={<StackDivider color={"#ededef"} />}
          alignItems="flex-start"
        >
          {/* ................................. */}
          <Box w="65%">
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
                    onClick={onOpen}
                    variant={"outline"}
                    fontSize={"12px"}
                    size="sm"
                    colorScheme="blackAlpha"
                    color="#424553"
                  >
                    EDIT ADDRESS
                  </Button>
                  <button onClick={() => handleDeleteAddress(address._id)}>
                    Delete
                  </button>
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
                  <AddressModal onClose={onClose} setAddress={setAddress} userId={userId}/>
                </ModalContent>
              </Modal>
            </VStack>
          </Box>

          {/* ................................... */}
          <Box w={"35%"}>
            <VStack
              w={"full"}
              divider={<StackDivider borderColor="gray.200" />}
              spacing="30px"
            >
              {/* ........................... */}

              {/* ....................... */}
              {/* <HStack>
                <Image
                  w="35px"
                  boxShadow={"rgba(0, 0, 0, 0.02) 0px 1px 2px 0px;"}
                  height={"50px"}
                  src={logoPic}
                />
                <HStack>
                  <Text>Estimated delivery by</Text>
                  <Text fontWeight={"bold"}>10 jun 2023</Text>
                </HStack>
              </HStack> */}
              {/* ........................... */}
              <PaymentDetains1
                totalMRP={totalMRP}
                totalMRPDiscount={totalMRPDiscount}
              />
              {/* .......................... */}
              <PaymentDetains2
                totalAmount={totalAmount}
                totalMRP={totalMRP}
                totalMRPDiscount={totalMRPDiscount}
                addressLine={addressLine}
                redirect={selectedAddressstatus ? "/payment" : undefined}
              />
              {/* ........................... */}
            </VStack>
          </Box>
        </HStack>
      </Box>
      <OtherFooter />
    </Box>
  );
};

export default Address;
