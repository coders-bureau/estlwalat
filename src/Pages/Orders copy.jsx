import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  CircularProgress,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import Navbar from "../Components/Navbar";
const mobileNumber = localStorage.getItem("MbNumber");
const options = { year: "numeric", month: "long", day: "numeric" };
// console.log(mobileNumber);

const Orders = () => {
  const [isLoading, setisLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingo, setLoadingo] = useState(false);

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const fetchStatus = async (orderId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/orders/shipmentstatus`,
        {
          params: {
            orderid: orderId,
          },
        }
      );
      console.log(response);
      const shipmentStatus = response.data?.message?.status || "Not Available";
      console.log(shipmentStatus);
      return shipmentStatus;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
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

  const handleCancelOrder = async (orderId) => {
    try {
      setLoadingo(true);

      // Make an HTTP request to your backend API to cancel the order
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API}/user/cancelorder/${orderId}`
      );

      if (response.data.success) {
        getOrders();
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    } finally {
      setLoadingo(false);
    }
  };
  // console.log(orders);

  if (isLoading)
    return (
      <Box height={"200px"}>
        <Navbar />
        <LoadingPage />
      </Box>
    );

  return (
    <>
      <Navbar />
      <VStack
        overflow={"auto"}
        boxShadow={
          "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
        }
        p={4}
      >
        {orders ? (
          <Accordion allowToggle defaultIndex={orders.map((_, index) => index)}>
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
                      Order {order.orderNo} on:{" "}
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
                <AccordionPanel
                  width={{ md: "70vw", base: "90vw" }}
                  pb={"10px"}
                >
                  {order.items.map((item, i) => (
                    <Grid
                      key={i}
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
                          <Box w={"full"} overflow={"hidden"}>
                            <Image
                              // w={"100%"}
                              boxSize={{
                                lg: "150px",
                                md: "150px",
                                base: "90px",
                              }}
                              // boxSize={"150px"}
                              objectFit="contain"
                              m={"3px"}
                              borderRadius={4}
                              src={
                                process.env.REACT_APP_BASE_API +
                                "/" +
                                item.imgPath
                              }
                            />
                          </Box>
                          <Box>
                            <VStack m={"3px"} gap={0} alignItems={"left"}>
                              {/* <Text>{item.title}</Text> */}
                              <Text
                                fontSize={{ md: "16px", base: "13px" }}
                                color="#282c3f"
                                fontWeight={550}
                                isTruncated
                                w={{ md: "45vw", base: "35vw" }}
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
                              <Text
                                mt={{ md: "5px", base: "5px" }}
                                fontWeight={450}
                                fontSize={{ md: "13px", base: "10px" }}
                              >
                                Price : {item.price}
                              </Text>
                              {/* <Text>
                        {item.currentSize}
                        </Text>
                        <Text>
                        {item.price}
                      </Text> */}
                              {/* <br /> */}

                              <Text
                                mt={{ md: "10px", base: "5px" }}
                                w={{ md: "40vw", base: "55vw" }}
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
                        <HStack w={"full"} justifyContent="flex-start">
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
                                size={{ md: "sm", base: "xs" }}
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
                            {i == 0 &&
                              order.orderStatus !== "usercancelled" &&
                              order.orderStatus !== "inprocess" &&
                              order.orderStatus !== "cancelled" && (
                                // <HStack>
                                <Button
                                  alignSelf={"end"}
                                  bgColor={"teal"}
                                  color={"#ffffff"}
                                  size={{ md: "sm", base: "xs" }}
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

                          <Box
                            m={{ md: "3px", base: "0px 0px 3px 3px" }}
                            alignSelf={"flex-start"}
                          >
                            {order.orderStatus !== "usercancelled" &&
                            order.orderStatus !== "shipped" ? ( // Check the order status
                              <Button
                                alignSelf={"end"}
                                bgColor={"red"}
                                color={"#ffffff"}
                                size={{ md: "sm", base: "xs" }}
                                borderRadius={0}
                                _hover={{ textDecoration: "none" }}
                                onClick={() => handleCancelOrder(order._id)}
                                disabled={loadingo}
                              >
                                {loadingo ? (
                                  <CircularProgress
                                    isIndeterminate
                                    size={7}
                                    margin={"0 10px"}
                                    color="white"
                                  />
                                ) : (
                                  "Cancel"
                                )}
                              </Button>
                            ) : null}
                          </Box>
                        </HStack>
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
      </VStack>
    </>
  );
};

export default Orders;
