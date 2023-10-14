import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  Grid,
  Heading,
  CircularProgress,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../Redux/UserReducer/Action";
import axios from "axios";
import AddReview from "../Components/AddReview";
import ReviewForm from "../Components/ReviewForm";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
const mobileNumber = localStorage.getItem("MbNumber");
const options = { year: "numeric", month: "long", day: "numeric" };
console.log(mobileNumber);
// const userinfo = localStorage.getItem("userInfo");
// console.log(userinfo);
const Profile = () => {
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.UserReducer);
  const [activeTab, setActiveTab] = useState("tab1");
  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails());
    } else {
    }
  }, [user, dispatch]);

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={{ lg: "80vh", md: "100vh" }}
        mt={{ lg: "0px", md: "0px", base: "30px" }}
      >
        <VStack
          boxShadow={
            "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
          }
          display={{ lg: "none", md: "none", base: "flex" }}
          // border="2px"
          spacing={2}
          borderRadius={"10px"}
        >
          <Box
            boxShadow={
              "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
            }
            // borderBottom={ "2px"}
          >
            <HStack m={"10px"} justifyContent="center">
              <Button
                borderColor="#424553"
                variant={activeTab === "tab1" ? "outline" : "solid"}
                onClick={() => handleTabChange("tab1")}
              >
                Profile
              </Button>
              <Button
                borderColor="#424553"
                variant={activeTab === "tab2" ? "outline" : "solid"}
                onClick={() => handleTabChange("tab2")}
              >
                Orders
              </Button>
              <Button
                borderColor="#424553"
                variant={activeTab === "tab3" ? "outline" : "solid"}
                onClick={() => handleTabChange("tab3")}
              >
                Address
              </Button>
            </HStack>
          </Box>
          <VStack p={4} justifyContent="center">
            {activeTab === "tab1" && <Profiledetails user={user} />}
            {activeTab === "tab2" && <Order user={user} />}
            {activeTab === "tab3" && <Address user={user} />}
          </VStack>
        </VStack>

        <HStack
          display={{ lg: "flex", md: "flex", base: "none" }}
          // border={"2px solid #ebebed"}
          // borderRadius={"2px"}
          boxShadow={
            "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
          }
          spacing={2}
          // borderColor={""}
          borderRadius={"10px"}
        >
          <Box>
            <VStack m={"10px"} height="100%" justifyContent="center">
              <Button
                w={"9vw"}
                borderColor="#424553"
                variant={activeTab === "tab1" ? "outline" : "solid"}
                onClick={() => handleTabChange("tab1")}
              >
                Profile
              </Button>
              <Button
                w={"9vw"}
                borderColor="#424553"
                variant={activeTab === "tab2" ? "outline" : "solid"}
                onClick={() => handleTabChange("tab2")}
              >
                Orders
              </Button>
              <Button
                borderColor="#424553"
                w={"9vw"}
                variant={activeTab === "tab3" ? "outline" : "solid"}
                onClick={() => handleTabChange("tab3")}
              >
                Address
              </Button>
            </VStack>
          </Box>
          <VStack
            overflow={"auto"}
            h={"70vh"}
            // borderLeft={"2px"}
            boxShadow={
              "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
            }
            // borderColor={"#424553"}
            width={"80vw"}
            p={4}
            // justifyContent="center"
          >
            {activeTab === "tab1" && <Profiledetails user={user} />}
            {activeTab === "tab2" && <Order user={user} />}
            {activeTab === "tab3" && <Address user={user} />}
          </VStack>
        </HStack>
      </Box>
    </>
  );
};

const Profiledetails = ({ user }) => {
  const [isLoading, setisLoading] = useState(true);
  console.log(isLoading);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(" ");
  const [contactNumber, setContactNumber] = useState(
    localStorage.getItem("MbNumber")
  );
  const [email, setEmail] = useState(" ");
  const [dateOfBirth, setDateOfBirth] = useState(" ");
  const [gender, setGender] = useState(" ");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails(mobileNumber));
    } else {
      setisLoading(false);
      setName(user.name);
      setEmail(user.email);
      setDateOfBirth(user.dob);
      setGender(user.gender);
      setContactNumber(user.mobileNumber);
    }
  }, [user, dispatch]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    dispatch(
      updateUserProfile({
        name,
        contactNumber,
        email,
        dateOfBirth,
        gender,
      })
    );
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeDateOfBirth = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  if (isLoading)
    return (
      <Box height={"200px"}>
        <LoadingPage />
      </Box>
    );
  return (
    <>
      <Box
        justifySelf={"center"}
        marginTop={50}

        // fontSize={"lg"}
        // padding={10}
        // bgColor={"#ff3e6d"}
      >
        {/* <Text fontSize="2xl">Profile</Text> */}
        {editing ? (
          <Box>
            <FormControl>
              <HStack width="100%" align="center">
                <FormLabel flex="20%" textAlign="left">
                  Name
                </FormLabel>
                <Input
                  type="text"
                  flex={"80%"}
                  value={name}
                  onChange={handleChangeName}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack width="100%" align="center">
                <FormLabel flex={"20%"} textAlign="left">
                  Email
                </FormLabel>
                <Input
                  type="text"
                  flex={"80%"}
                  value={email}
                  onChange={handleChangeEmail}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack width="100%" align="center">
                <FormLabel flex={"20%"} textAlign="left">
                  D.O.B
                </FormLabel>
                <Input
                  flex={"80%"}
                  type="date"
                  value={dateOfBirth}
                  onChange={handleChangeDateOfBirth}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack width="100%" align="center">
                <FormLabel flex={"20%"} textAlign="left">
                  Gender
                </FormLabel>
                <Select
                  flex={"80%"}
                  value={gender}
                  onChange={handleChangeGender}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
              </HStack>
            </FormControl>
            <Button mt={2} onClick={handleSave} mr={2}>
              Save
            </Button>
            <Button mt={2} onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        ) : (
          <>
            <HStack fontSize={{ lg: "", md: "md", base: "sm" }}>
              <VStack align="flex-start" spacing={7}>
                <Text textAlign="left">Name:</Text>
                <Text textAlign="left">Mobile Number</Text>
                <Text textAlign="left">Email</Text>
                <Text textAlign="left">D.O.B.</Text>
                <Text textAlign="left">Gender</Text>
              </VStack>
              <VStack align="flex-start" spacing={7}>
                <Text textAlign="left">
                  : <b>{name}</b>
                </Text>
                <Text textAlign="left">
                  : <b>{contactNumber}</b>
                </Text>
                <Text textAlign="left">
                  : <b>{email}</b>
                </Text>
                <Text textAlign="left">
                  : <b>{dateOfBirth}</b>
                </Text>
                <Text textAlign="left">
                  : <b>{gender}</b>
                </Text>
              </VStack>
            </HStack>
            <Button
              color="#ff3e6c"
              bgColor="#ffffff"
              onClick={handleEdit}
              mt={10}
              fontSize={"lg"}
            >
              Edit
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

const Order = ({ user }) => {
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  const userReview = true;
  const handleReviewSubmit = (reviewData) => {
    // Add logic here to submit the review data to your backend API
    console.log("Review Data:", reviewData);
  };
  // const dispatch = useDispatch();
  console.log(user);
  // Replace this with actual data from the backend
  const [orders, setOrders] = useState([]);
  console.log(orders);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    setisLoading(true);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_API}/order/orders`,
    })
      .then((res) => {
        setisLoading(false);

        setOrders(res.data.data);
      })
      .catch((err) => {
        setisLoading(false);

        console.log(err);
      });
  };
  const [loading, setLoading] = useState(false);

  const invoiceGenerate = async (orderNo) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/user/order/invoice`,
        {
          responseType: "blob", // Specify the response type as a blob
          params: {
            orderNo: orderNo, // Pass the orderNo as a query parameter
          },
        }
      );
      if (response) {
        setLoading(false);
      }

      // Create a blob URL for the PDF
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF", error);
      setLoading(false);
    }
  };
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (isLoading)
    return (
      <Box height={"200px"}>
        <LoadingPage />
      </Box>
    );
  return (
    <>
      {/* <Box my={"25px"}> */}

      {orders ? (
        <Accordion allowToggle>
          {orders.map((order, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton
                  borderRadius={"5px"}
                  boxShadow={
                    "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
                  }
                  height={"10vh"}
                  width={{ md: "70vw", base: "90vw" }}
                >
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight="bold"
                    mr={2}
                  >
                    Order {++index} on:{" "}
                    {new Date(order.orderDate)
                      .toLocaleDateString()
                      .split("/")[1] +
                      " " +
                      monthNames[
                        new Date(order.orderDate)
                          .toLocaleDateString()
                          .split("/")[0] - 1
                      ] +
                      "," +
                      new Date(order.orderDate)
                        .toLocaleDateString()
                        .split("/")[2]}
                    {/* const parts = new
                    Date(order.orderDate).toLocaleDateString().split("/"); const
                    formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`; */}
                  </Box>
                  {/* <Box flex="1" textAlign="left" fontWeight="bold" mr={2}>
              Address: {order.address}
            </Box>
            <Box flex="1" textAlign="left" fontWeight="bold" mr={2}>
              Payment Type: {order.paymentType}
            </Box> */}
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel width={{ md: "70vw", base: "90vw" }} pb={"10px"}>
                {order.items.map((item, i) => (
                  <Grid
                    mb={"10px"}
                    // templateColumns={''}
                    display={"flex"}
                    // templateColumns={{
                    //   lg: "1fr 3fr",
                    //   md: "1fr 3fr",
                    //   base: "1fr 3fr",
                    // }}
                    w={"full"}
                    textAlign="left"
                    // gap="10px"
                    border={"1px solid #b0a9a9"}
                    borderRadius="5px"
                  >
                    <VStack gap={0}>
                      <HStack>
                        <Box
                          w={{ md: "150px", base: "85px" }}
                          h={{ md: "200px", base: "120px" }}
                          overflow={"hidden"}
                        >
                          <Image
                            w={"100%"}
                            m={"3px"}
                            borderRadius={4}
                            src={
                              process.env.REACT_APP_BASE_API +
                              "/" +
                              item.imgPath
                            }
                          />
                        </Box>
                        {/* <HStack
                      display={{ lg: "flex", md: "flex", base: "none" }}
                      border="2px"
                      spacing={2}
                      borderRadius={"10px"}
                      alignItems="flex-start"
                    >
                  </HStack> */}
                        <Box h={{ md: "200px", base: "120px" }}>
                          <VStack m={"3px"} gap={0} alignItems={"left"}>
                            {/* <Text>{item.title}</Text> */}
                            <Text
                              fontSize={{ md: "16px", base: "13px" }}
                              color="#282c3f"
                              fontWeight={550}
                              isTruncated
                              w={{ md: "35vw", base: "35vw" }}
                            >
                              {item.productName}
                            </Text>
                            {/* <br /> */}
                            <Text
                              mt={{ md: "10px", base: "5px" }}
                              fontWeight={450}
                              fontSize={{ md: "13px", base: "10px" }}
                            >
                              Quantity Order : {item.quantity}
                            </Text>
                            {/* <Text>
                        {item.currentSize}
                        </Text>
                        <Text>
                        {item.price}
                      </Text> */}
                            {/* <br /> */}

                            <Text
                              mt={{ md: "10px", base: "0px" }}
                              w={{ md: "30vw", base: "40vw" }}
                              fontWeight={450}
                              fontSize={{ md: "13px", base: "10px" }}
                            >
                              Address : {order.addressLine}
                            </Text>

                            <Text
                              mt={{ md: "5px", base: "5px" }}
                              fontWeight={450}
                              fontSize={{ md: "13px", base: "10px" }}
                            >
                              Date of Order :{" "}
                              {/* {new Date(order.orderDate).toLocaleDateString()} */}
                              {new Date(order.orderDate)
                                .toLocaleDateString()
                                .split("/")[1] +
                                "/" +
                                new Date(order.orderDate)
                                  .toLocaleDateString()
                                  .split("/")[0] +
                                "/" +
                                new Date(order.orderDate)
                                  .toLocaleDateString()
                                  .split("/")[2]}
                            </Text>
                            <Text
                              mt={{ md: "5px", base: "5px" }}
                              fontWeight={450}
                              fontSize={{ md: "13px", base: "10px" }}
                            >
                              Order Status : <em>{order.orderStatus}</em>
                            </Text>
                          </VStack>
                        </Box>
                      </HStack>
                      <Box
                        m={{ md: "3px", base: "0px 0px 3px 3px" }}
                        alignSelf={"flex-start"}
                      >
                        {order.orderStatus === "shipped" && (
                          // <HStack>
                          <Button
                            alignSelf={"end"}
                            bgColor={"#ff3e6c"}
                            color={"#ffffff"}
                            onClick={() =>
                              navigate(`/write-review/${item.product}`)
                            }
                            colorScheme="pink"
                            // fontSize={"10px"}
                            size={{ md: "lg", base: "xs" }}
                            borderRadius={0}
                          >
                            Add Review
                          </Button>
                          // </HStack>
                        )}
                      </Box>
                      <Box
                        m={{ md: "3px", base: "0px 0px 3px 3px" }}
                        alignSelf={"flex-start"}
                      >
                        {order.orderStatus !== "inprocess" &&
                          order.orderStatus !== "cancelled" && (
                            // <HStack>
                            <Button
                              alignSelf={"end"}
                              bgColor={"teal"}
                              color={"#ffffff"}
                              size={{ md: "lg", base: "xs" }}
                              borderRadius={0}
                              _hover={{ textDecoration: "none" }}
                              onClick={() => invoiceGenerate(order.orderNo)}
                            >
                              {loading ? (
                                <CircularProgress
                                  isIndeterminate
                                  size={7}
                                  margin={"0 10px"}
                                  color="white"
                                />
                              ) : (
                                "Invoice"
                              )}
                            </Button>
                            // </HStack>
                          )}
                      </Box>
                    </VStack>
                  </Grid>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <>No Orders Yet!</>
      )}

      {/* </Box> */}
    </>
  );
};

const Address = ({ user }) => {
  console.log(user);
  const dispatch = useDispatch();
  const [addressD, setAddressD] = useState([]);
  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails(mobileNumber));
    } else {
      setAddressD(user.address);
    }
  }, [user, dispatch]);
  return (
    <>
      {!addressD ? (
        <>Nothing to Show</>
      ) : (
        <>
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
            </VStack>
          ))}
        </>
      )}
    </>
  );
};

export default Profile;
