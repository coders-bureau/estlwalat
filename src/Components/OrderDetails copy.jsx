import {
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
import { Badge } from "@chakra-ui/react";
import {isMobile} from 'react-device-detect';

const OrderDetails = ({
  order,
  item,
  i,
  invoiceGenerate,
  handleCancelOrder,
  loading,
  loadingo,
}) => {
  const statusMappings = {
    O: "New order Accepted",
    A: "Processing",
    E: "Manifested",
    G: "Dispatched",
    I: "Canceled Shipment",
    usercancelled: "Cancelled by User",
    cancelled: "Cancelled",
    inprocess: "Inprocessing",
    // accepted: "Accepted",
  };
  const [orderStatusShip, setOrderStatusShip] = useState([]);
  useEffect(() => {
    fetchStatus(order.orderNo);
    console.log(order)
    console.log(order.transcationResponse[0])
  }, []);
  const fetchStatus = async (orderid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/user/order/shipmentstatus`,
        {
          params: {
            orderid: orderid,
          },
        }
      );
      console.log(response.data.message);
      const shipmentStatus =
        response.data?.message[0]?.status || "Not Available";
      setOrderStatusShip(shipmentStatus);
      console.log("shipmentStatus", shipmentStatus);
      return shipmentStatus;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const navigate = useNavigate();
  //   console.log(item);
 renderContent = () =>{
  if(isMobile){
    return       <Grid
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
    // border={"1px solid #b0a9a9"}
    borderRadius="5px"
  >
    <VStack gap={0}>
      <HStack>
        {/* <Box w={"full"} overflow={"hidden"}> */}
          <Image
            // w={"100%"}
            boxSize={{
              lg: "150px",
              md: "150px",
              base: "90px",
            }}
            // boxSize={"150px"}
            // objectFit="contain"
            // m={"3px"}
            borderRadius={"20px"}
            // src={process.env.REACT_APP_BASE_API + "/" + item.imgPath}
          src={item.imgPath}
          />
        {/* </Box> */}
        <Box>
          <VStack m={"3px"} gap={0} alignItems={"left"}>
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
             <b> Quantity Order</b> : {item.quantity}
            </Text>
            <Text
              mt={{ md: "5px", base: "5px" }}
              fontWeight={450}
              fontSize={{ md: "13px", base: "10px" }}
            >
              <b>Price</b> : ₹{item.price}
            </Text>
            <Text
              mt={{ md: "10px", base: "5px" }}
              w={{ md: "40vw", base: "55vw" }}
              fontWeight={450}
              fontSize={{ md: "13px", base: "10px" }}
            >
             <b> Address </b>: {order.addressLine}
            </Text>

            <Text
              mt={{ md: "5px", base: "5px" }}
              fontWeight={450}
              fontSize={{ md: "13px", base: "10px" }}
            >
             <b> Date of Order</b> :{" "}
              {/* {new Date(order.orderDate).toLocaleDateString()} */}
              {new Date(order.orderDate)
                .toLocaleDateString()
                .split("/")[1] +
                "/" +
                new Date(order.orderDate)
                  .toLocaleDateString()
                  .split("/")[1] +
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
              <b>Order Status</b> :{" "}
             
              <a
              mb={"3px"}
                fontSize={{ md: "13px", base: "10px" }}
                colorScheme={
                  (statusMappings[order.orderStatus] ||
                    statusMappings[orderStatusShip]) ===
                  "New order Accepted"
                    ? "gray"
                    : (statusMappings[order.orderStatus] ||
                        statusMappings[orderStatusShip]) === "Processing"
                    ? "yellow"
                    : (statusMappings[order.orderStatus] ||
                        statusMappings[orderStatusShip]) === "Manifested"
                    ? "green"
                    : (statusMappings[order.orderStatus] ||
                        statusMappings[orderStatusShip]) === "Dispatched"
                    ? "green"
                    : (statusMappings[order.orderStatus] ||
                        statusMappings[orderStatusShip]) ===
                      ("Cancelled" ||
                        "Canceled Shipment" ||
                        "User Cancelled")
                    ? "red"
                    : "black" // Default color if none of the conditions match
                }
              >
               <a> {statusMappings[order.orderStatus] ||
                  statusMappings[orderStatusShip]}
                  </a>
              </a>
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
              onClick={() => navigate(`/write-review/${item.product}`)}
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
          order.orderStatus !== "shipped" &&
          orderStatusShip !== "I" &&
          orderStatusShip !== "E" &&
          orderStatusShip !== "G" ? ( // Check the order status
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
  }
  return       <Grid
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
  // border={"1px solid #b0a9a9"}
  borderRadius="5px"
>
  <VStack gap={0}>
    <HStack>
      {/* <Box w={"full"} overflow={"hidden"}> */}
        <Image
          // w={"100%"}
          boxSize={{
            lg: "150px",
            md: "150px",
            base: "90px",
          }}
          // boxSize={"150px"}
          // objectFit="contain"
          // m={"3px"}
          borderRadius={"20px"}
          // src={process.env.REACT_APP_BASE_API + "/" + item.imgPath}
        src={item.imgPath}
        />
      {/* </Box> */}
      <Box>
        <VStack m={"3px"} gap={0} alignItems={"left"}>
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
           <b> Quantity Order</b> : {item.quantity}
          </Text>
          <Text
            mt={{ md: "5px", base: "5px" }}
            fontWeight={450}
            fontSize={{ md: "13px", base: "10px" }}
          >
            <b>Price</b> : ₹{item.price}
          </Text>
          <Text
            mt={{ md: "10px", base: "5px" }}
            w={{ md: "40vw", base: "55vw" }}
            fontWeight={450}
            fontSize={{ md: "13px", base: "10px" }}
          >
           <b> Address </b>: {order.addressLine}
          </Text>

          <Text
            mt={{ md: "5px", base: "5px" }}
            fontWeight={450}
            fontSize={{ md: "13px", base: "10px" }}
          >
           <b> Date of Order</b> :{" "}
            {/* {new Date(order.orderDate).toLocaleDateString()} */}
            {new Date(order.orderDate)
              .toLocaleDateString()
              .split("/")[1] +
              "/" +
              new Date(order.orderDate)
                .toLocaleDateString()
                .split("/")[1] +
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
            <b>Order Status</b> :{" "}
           
            <a
            mb={"3px"}
              fontSize={{ md: "13px", base: "10px" }}
              colorScheme={
                (statusMappings[order.orderStatus] ||
                  statusMappings[orderStatusShip]) ===
                "New order Accepted"
                  ? "gray"
                  : (statusMappings[order.orderStatus] ||
                      statusMappings[orderStatusShip]) === "Processing"
                  ? "yellow"
                  : (statusMappings[order.orderStatus] ||
                      statusMappings[orderStatusShip]) === "Manifested"
                  ? "green"
                  : (statusMappings[order.orderStatus] ||
                      statusMappings[orderStatusShip]) === "Dispatched"
                  ? "green"
                  : (statusMappings[order.orderStatus] ||
                      statusMappings[orderStatusShip]) ===
                    ("Cancelled" ||
                      "Canceled Shipment" ||
                      "User Cancelled")
                  ? "red"
                  : "black" // Default color if none of the conditions match
              }
            >
             <a> {statusMappings[order.orderStatus] ||
                statusMappings[orderStatusShip]}
                </a>
            </a>
          </Text>
        </VStack>
      </Box>
      <VStack w={"full"} justifyContent="flex-start">
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
            onClick={() => navigate(`/write-review/${item.product}`)}
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
        order.orderStatus !== "shipped" &&
        orderStatusShip !== "I" &&
        orderStatusShip !== "E" &&
        orderStatusShip !== "G" ? ( // Check the order status
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
    </VStack>
    </HStack>

  </VStack>
</Grid>
 }

//  render() {
//   return this.renderContent();
// };
};

export default OrderDetails;
