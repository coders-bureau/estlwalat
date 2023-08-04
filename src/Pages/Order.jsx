// components/Order.js

import React from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  Divider,
  Text,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";

const Order = () => {
  // Replace this with actual data from the backend

  const orders = [
    {
      orderDate: "2023-08-01",
      address: "123 Main Street",
      paymentType: "Credit Card",
      items: [
        { product: "Product 1", quantity: 2 },
        { product: "Product 2", quantity: 1 },
      ],
    },
    {
      orderDate: "2022-08-07",
      address: "123 Main Street",
      paymentType: "Credit Card",
      items: [
        { product: "Product 3", quantity: 2 },
        { product: "Product 4", quantity: 1 },
      ],
    },
    // Add more orders as needed
  ];
  const orderData = {
    orderId: "12345",
    orderDate: "2023-08-01T10:30:00.000Z",
    address: {
      name: "John Doe",
      mobileNo: "1234567890",
      pinCode: "560001",
      area: "Sample Area",
      town: "Sample Town",
      city: "Sample City",
      state: "Sample State",
    },
    paymentType: "Credit Card",
    items: [
      {
        productId: "product123",
        name: "Sample Product 1",
        price: 1000,
        quantity: 2,
        totalPrice: 2000,
      },
      {
        productId: "product456",
        name: "Sample Product 2",
        price: 1500,
        quantity: 1,
        totalPrice: 1500,
      },
    ],
  };

  return (
    <>
      {/* <Navbar /> */}
      <Box my={"25px"}>
      <Accordion allowToggle>
      {orders.map((order, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton width={"70vw"}>
              <Box as="span" flex="1" textAlign="left" fontWeight="bold" mr={2}>
                Order {++index}
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
          <AccordionPanel pb={4}>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>
                  Product: {item.product}
                  <br />
                  Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
      </Box>
    </>
    // <Container maxW="container.lg" py={8}>
    //   <Heading as="h1" size="xl" mb={4}>
    //     Order Details
    //   </Heading>
    //   <Divider mb={6} />

    //   {/* Order Summary */}
    //   <Box mb={6}>
    //     <Heading as="h2" size="lg" mb={4}>
    //       Order Summary
    //     </Heading>
    //     <VStack align="start" spacing={2}>
    //       <Text>
    //         Order ID: <Badge colorScheme="blue">{orderData.orderId}</Badge>
    //       </Text>
    //       <Text>Order Date: {new Date(orderData.orderDate).toDateString()}</Text>
    //       <Text>Payment Type: {orderData.paymentType}</Text>
    //     </VStack>
    //   </Box>

    //   {/* Shipping Address */}
    //   <Box mb={6}>
    //     <Heading as="h2" size="lg" mb={4}>
    //       Shipping Address
    //     </Heading>
    //     <VStack align="start" spacing={2}>
    //       <Text>Name: {orderData.address.name}</Text>
    //       <Text>Mobile No: {orderData.address.mobileNo}</Text>
    //       <Text>Pin Code: {orderData.address.pinCode}</Text>
    //       <Text>Area: {orderData.address.area}</Text>
    //       <Text>Town: {orderData.address.town}</Text>
    //       <Text>City: {orderData.address.city}</Text>
    //       <Text>State: {orderData.address.state}</Text>
    //     </VStack>
    //   </Box>

    //   {/* Ordered Items */}
    //   <Box>
    //     <Heading as="h2" size="lg" mb={4}>
    //       Ordered Items
    //     </Heading>
    //     <VStack align="start" spacing={4}>
    //       {orderData.items.map((item, index) => (
    //         <Box key={index} borderWidth="1px" borderRadius="md" p={4}>
    //           <Text>{item.name}</Text>
    //           <Text>Price: ${item.price}</Text>
    //           <Text>Quantity: {item.quantity}</Text>
    //           <Text>Total Price: ${item.totalPrice}</Text>
    //         </Box>
    //       ))}
    //     </VStack>
    //   </Box>
    // </Container>
  );
};

export default Order;
