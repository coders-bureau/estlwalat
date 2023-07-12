import { Box, Heading, Text } from "@chakra-ui/react";
import Footer from "../Components/Footer";

const Cancellation = () => {
  return (
    <>
      <Box textAlign={"left"}
        padding={{ lg: "50px 200px", md: "25px 50px", base: "20px 30px" }}
      >
        <Heading  textAlign={"center"} as="h1" mb={4}>
          Cancellation Policy
        </Heading>
        <Box mb={4}>
          <Text fontWeight={500} fontSize={"16px"}>
            Cancellation by Customers:
          </Text>
          <Text fontSize={"14px"}>
            Customers may cancel their orders before the items have been
            shipped. To cancel an order, please contact our customer support
            team at support@estylewala.com or call us at 123-456-7890. Once the
            order is shipped, it cannot be canceled.
          </Text>
        </Box>
        <Box mb={4}>
          <Text fontWeight={500} fontSize={"16px"}>
            Cancellation by eStyleWala:
          </Text>
          <Text fontSize={"14px"}>
            eStyleWala reserves the right to cancel any order in the event of
            unavailability of the product, pricing errors, or any other
            unforeseen circumstances. If we cancel your order, you will be
            notified, and a refund will be processed for the full amount paid.
          </Text>
        </Box>
        <Box mb={4}>
          <Text fontWeight={500} fontSize={"16px"}>
            Refunds for Canceled Orders:
          </Text>
          <Text fontSize={"14px"}>
            If your order is canceled before shipment, we will process a refund
            to the original payment method used for the purchase. Refunds may
            take up to 7-10 business days to reflect in your account.
          </Text>
        </Box>
        <Text>
          If you have any questions or need further assistance regarding our
          cancellation policy, please contact our customer support team at
          support@estylewala.com.
        </Text>
      </Box>
      <Footer />
    </>
  );
};

export default Cancellation;
