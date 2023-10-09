import { Box, Button, Heading, Icon, Text } from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useParams } from "react-router-dom";
import OtherNavbar from "../Components/OtherNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Success() {
  const [paymentStatus, setPaymentStatus] = useState("pending"); // Default status
  const { payment,tranxId } = useParams();
  console.log(tranxId);
  const fetchPaymentStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/order/chechorderstatus/${tranxId}`
      ); // Replace with your actual API endpoint
      return response.data; // Assuming the payment status is in the response data
    } catch (error) {
      throw error; // Handle errors as needed
    }
  };
  useEffect(() => {
    // Fetch the payment status from your backend API
    fetchPaymentStatus()
      .then((response) => {
        console.log(response);
        // Assuming the API returns the payment status in the response
        const { paymentStatus } = response;
        setPaymentStatus(paymentStatus); // Update the payment status state
      })
      .catch((error) => {
        console.error("Error fetching payment status:", error);
        // Handle the error as needed
      });
  }, []);

  return (
    <>
      <OtherNavbar />
      <Box textAlign="center" py={10} px={6} mt={200}>
        {paymentStatus === "completed" || payment === "cod" ? (
          <>
            <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
            <Heading as="h2" size="xl" mt={6} mb={2}>
              Your order has been placed
            </Heading>
            <Text color={"gray.500"}>Thank you for shopping</Text>
            <Link to="/">
              <Button mt="30px" color="#ffff3c6">
                SHOP MORE
              </Button>
            </Link>
          </>
        ) : (
          <>
            {" "}
            {/* <p>Transaction ID: {tranxId}</p> */}
            {/* <CloseIcon boxSize={"50px"} color={"red.500"}/> */}
            <Icon boxSize={"50px"} color={"red.500"} as={AiFillCloseCircle} />
            <Heading  as="h2" size="xl"  color={"red.500"} mb={2}>
              Payment Pending
            </Heading>
            {/* <Text color={"red.500"} fontSize="xl">
              Payment failed
            </Text> */}
          </>
        )}
      </Box>
    </>
  );
}
