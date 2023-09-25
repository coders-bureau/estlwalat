import { Box, Heading, Text, List, ListItem } from "@chakra-ui/react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const TermsOfUse = () => {
  return (
    <>
    <Navbar />
      <Box
        textAlign={"left"}
        padding={{ lg: "50px 200px", md: "25px 50px", base: "20px 30px" }}
      >
        <Heading textAlign={"center"} as="h1" mb={4}>
          Terms of Use
        </Heading>

        <Text mb={4} fontSize={"14px"}>
          Welcome to eStyleWala!, Manage by Shirazi Kids Wear, Please read these terms carefully before using
          our website. By accessing and using this website, you agree to be
          bound by the following terms and conditions.
        </Text>

        <Text fontWeight={500} fontSize={"16px"}> 1. Content: </Text>
        <Text mb={4} fontSize={"14px"}>
          All content on this website, including images, text, and graphics, is
          the property of eStyleWala and protected by copyright laws.
        </Text>
        <Text fontWeight={500} fontSize={"16px"}> 2. Use of Website: </Text>
        <Text mb={4} fontSize={"14px"}>
          You may use this website for personal, non-commercial purposes only.
          You agree not to modify, distribute, transmit, or create derivative
          works from the content without our prior written consent.
        </Text>
        <Text fontWeight={500} fontSize={"16px"}>3. User Accounts:</Text>
        <Text mb={4} fontSize={"14px"}>
          To access certain features of this website, you may need to create a
          user account. You are responsible for maintaining the confidentiality
          of your account information and agree to accept responsibility for all
          activities that occur under your account.
        </Text>
        <Text fontWeight={500} fontSize={"16px"}> 4. Privacy: </Text>
        <Text mb={4} fontSize={"14px"}>
          We respect your privacy and handle your personal information in
          accordance with our Privacy Policy. By using this website, you consent
          to the collection, use, and disclosure of your information as
          described in our Privacy Policy.
        </Text>
        <Text fontWeight={500} fontSize={"16px"}> 5. Limitation of Liability: </Text>
        <Text mb={4} fontSize={"14px"}>
          We strive to provide accurate and up-to-date information on this
          website, but we do not guarantee its completeness or accuracy. We are
          not liable for any damages or losses resulting from your use or
          inability to use this website.
        </Text>
        <Text fontWeight={500} fontSize={"16px"}> 6. Product Information: </Text>
        <Text mb={4} fontSize={"14px"}>
          We make every effort to display the most accurate product information
          on our website. However, we cannot guarantee the availability,
          pricing, or descriptions of products. We reserve the right to modify
          or discontinue any product without notice.
        </Text>
        <Text fontWeight={500} fontSize={"16px"}> 7. Third-Party Links:</Text>
        <Text mb={4} fontSize={"14px"}>
          This website may contain links to third-party websites for your
          convenience. We do not endorse or control the content, products, or
          services offered by these websites. Your use of third-party links is
          at your own risk.
        </Text>
        <Text fontSize={"14px"}>
          For more details, please review the complete terms and conditions by
          visiting the "Terms of Use" page on our website.
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

export default TermsOfUse;
