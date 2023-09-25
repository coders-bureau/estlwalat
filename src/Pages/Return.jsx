import { Box, Heading, Text } from "@chakra-ui/react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Return = () => {
  return (
    <>
    <Navbar />
      {" "}
      <Box  textAlign={"left"}
        padding={{ lg: "50px 200px", md: "25px 50px", base: "20px 30px" }}
      >
        <Heading  textAlign={"center"} as="h1" mb={4}>
          Return Policy
        </Heading>
        <Box mb={4}>
          <Text fontWeight={500} fontSize={"16px"}>
            Eligibility:
          </Text>
          <Text fontSize={"14px"}>
            To be eligible for a return, the item must be unused, in its
            original condition, and with all tags and packaging intact. Items
            that are damaged, altered, or not in the original condition may not
            be eligible for a return.
          </Text>
        </Box>
        <Box mb={4}>
          <Text fontWeight={500} fontSize={"16px"}>
            Return Period:
          </Text>
          <Text fontSize={"14px"}>
            You can initiate a return within 30 days of receiving your order.
            After 30 days, we may not be able to process your return.
          </Text>
        </Box>
        <Box mb={4}>
          <Text fontWeight={500} fontSize={"16px"}>
            Return Process:
          </Text>
          <Text fontSize={"14px"}>
            To initiate a return, please contact our customer support team at
            support@estylewala.com. Provide your order details and reason for
            the return. Our team will guide you through the return process and
            provide instructions for returning the item.
          </Text>
        </Box>
        <Box mb={4}>
          <Text fontWeight={500} fontSize={"16px"}>
            Refund or Exchange:
          </Text>
          <Text fontSize={"14px"}>
            Once we receive and inspect the returned item, we will process your
            refund or exchange. Refunds will be issued to the original payment
            method used for the purchase. If you opt for an exchange, we will
            ship the replacement item as soon as possible.
          </Text>
        </Box>
        <Box mb={4}>
          <Text fontWeight={500} fontSize={"16px"}>
            Return Shipping:
          </Text>
          <Text fontSize={"14px"}>
            The customer is responsible for the shipping costs associated with
            the return, unless the return is due to a defect or error on our
            part. We recommend using a trackable shipping method to ensure the
            safe return of the item.
          </Text>
        </Box>
        <Text>
          If you have any questions or need further assistance regarding our
          return policy, please contact our customer support team at
          support@estylewala.com.
        </Text>
      </Box>{" "}
      <Footer />
    </>
  );
};

export default Return;
