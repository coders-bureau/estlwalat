import { Box, Heading, Text, List, ListItem } from "@chakra-ui/react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const TermsAndConditions = () => {
  return (
    <>
    <Navbar />
      <Box
        textAlign={"left"}
        padding={{ lg: "50px 200px", md: "25px 50px", base: "20px 30px" }}
      >
        <Heading textAlign={"center"} as="h1" mb={4}>
          Terms and Conditions
        </Heading>

        <Text mb={4} fontSize={"14px"}>
          Welcome to eStyleWala!, Manage by Shirazi Kids Wear, Please read these terms and conditions
          carefully before using our website. By accessing and using this
          website, you agree to be bound by the following terms and conditions.
        </Text>

        <Text fontWeight={500} fontSize={"16px"}> 1. Acceptance of Terms: </Text>
        <Text mb={4} fontSize={"14px"}>
          By using this website, you accept and agree to abide by these terms
          and conditions. If you do not agree with any part of these terms,
          please do not use the website.
        </Text>
        <Text fontWeight={500} fontSize={"16px"}>2. Intellectual Property:</Text>
        <Text mb={4} fontSize={"14px"}>
          All content on this website, including text, graphics, logos, and
          images, is the property of eStyleWala and protected by intellectual
          property laws. You may not use, modify, distribute, or reproduce any
          content without our prior written consent.
        </Text>
        <Text fontWeight={500} fontSize={"16px"}> 3. User Responsibilities: </Text>
        <Text mb={4} fontSize={"14px"}>
          When using this website, you agree to:
          <List styleType="disc" ml={8}>
            <ListItem>
              Provide accurate and complete information when creating an account
              or making a purchase.
            </ListItem>
            <ListItem>
              Comply with all applicable laws and regulations.
            </ListItem>
            <ListItem>
              Not engage in any fraudulent, illegal, or harmful activities.
            </ListItem>
            <ListItem>
              Not attempt to gain unauthorized access to any part of the
              website.
            </ListItem>
          </List>
        </Text>
        <Text fontWeight={500} fontSize={"16px"}> 4. Product Information: </Text>
        <Text mb={4} fontSize={"14px"}>
          We strive to provide accurate product information, including
          descriptions, prices, and availability. However, we do not guarantee
          the accuracy or completeness of this information. Prices and
          availability are subject to change without notice.
        </Text>
        <Text fontWeight={500} fontSize={"16px"}> 5. Privacy: </Text>
        <Text mb={4} fontSize={"14px"}>
          We respect your privacy and handle your personal information in
          accordance with our Privacy Policy. By using this website, you consent
          to the collection, use, and disclosure of your information as
          described in our Privacy Policy.
        </Text>
        <Text fontSize={"14px"}>
          For more details, please review the complete terms and conditions by
          visiting the "Terms and Conditions" page on our website.
        </Text>
        <Text mt={8}>
          If you have any questions or concerns about these terms, please
          contact us at support@estylewala.com.
        </Text>
      </Box>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
