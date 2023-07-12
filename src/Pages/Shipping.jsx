import { Box, Heading, Text } from "@chakra-ui/react";
import Footer from "../Components/Footer";

const Shipping = () => {
  return (
    <>
      <Box textAlign={"left"}
        padding={{ lg: "50px 200px", md: "25px 50px", base: "20px 30px" }}
      >
        <Heading  textAlign={"center"} as="h1" mb={4}>
          Shipping Information
        </Heading>
        <Text mb={4}>
          We offer shipping services to various locations. Here are some
          important details regarding our shipping process:
        </Text>
        <Box mb={4}>
          <Text fontWeight={500} fontSize={"16px"}>
            Shipping Methods:
          </Text>
          <Text fontSize={"14px"}>
            We provide standard shipping as well as expedited shipping options.
            The availability of shipping methods may vary depending on your
            location.
          </Text>
        </Box>
        <Box mb={4}>
          <Text fontWeight={500} fontSize={"16px"}>
            Shipping Costs:
          </Text>
          <Text fontSize={"14px"}>
            The shipping cost is calculated based on the weight, dimensions, and
            destination of the package. The exact shipping cost will be
            displayed during the checkout process.
          </Text>
        </Box>
        <Box mb={4}>
          <Text fontWeight={500} fontSize={"16px"}>
            Shipping Time:
          </Text>
          <Text fontSize={"14px"}>
            The estimated delivery time depends on the shipping method selected
            and the destination. Standard shipping usually takes 3-7 business
            days, while expedited shipping can deliver within 1-3 business days.
          </Text>
        </Box>
        <Box mb={4}>
          <Text fontWeight={500} fontSize={"16px"}>
            Order Processing:
          </Text>
          <Text fontSize={"14px"}>
            We strive to process and ship orders as quickly as possible. Most
            orders are processed within 1-2 business days. However, please note
            that processing times may be longer during peak seasons or
            promotional periods.
          </Text>
        </Box>
        <Box mb={4}>
          <Text fontWeight={500} fontSize={"16px"}>
            Order Tracking:
          </Text>
          <Text fontSize={"14px"}>
            Once your order is shipped, we will provide you with a tracking
            number and a link to track your package. You can enter the tracking
            number on our website or the courier company's website to get
            real-time updates on the status of your shipment.
          </Text>
        </Box>
        <Text>
          If you have any specific shipping-related inquiries or need assistance
          with your order, please contact our customer support team at
          support@estylewala.com.
        </Text>
      </Box>
      <Footer />
    </>
  );
};

export default Shipping;
