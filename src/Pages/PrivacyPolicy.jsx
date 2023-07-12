import React from "react";
import Footer from "../Components/Footer";
import { Box, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <>
      <Box textAlign={"left"} padding={{lg: "50px 200px" ,md: "25px 50px" ,base: "20px 30px" }}>
        {/* <Heading textAlign={"center"}  fontWeight={300} >Privacy Policy</Heading> */}
        <Heading textAlign={"center"} as="h1" mb={4}>
        Privacy Policy
          </Heading>
        <br />
        <Text fontWeight={500} fontSize={"16px"}>Introduction</Text>
        <Text  fontSize={"12px"} color={"rgb(153, 153, 153)"}>
          At eStyleWala, we are committed to protecting your privacy and
          ensuring the security of your personal information. We understand the
          importance of keeping your data safe and confidential. This Privacy
          Policy explains how we collect, use, and safeguard your information
          when you use our website or services.
        </Text>
        <br />

        <Text fontWeight={500} fontSize={"16px"}>Information We Collect</Text>
        <Text  fontSize={"12px"} color={"rgb(153, 153, 153)"}>
          When you visit our website or use our services, we may collect certain
          information about you. This may include:
        </Text>
        <UnorderedList  fontSize={"12px"} color={"rgb(153, 153, 153)"} >
          <ListItem >
            Personal information such as your name, email address, and contact
            details
          </ListItem>
          <ListItem>
            Demographic information such as your age, gender, and location
          </ListItem>
          <ListItem>Information about your browsing behavior and preferences</ListItem>
          <ListItem>Payment and transaction details</ListItem>
        </UnorderedList>
        <br />

        <Text fontWeight={500} fontSize={"16px"}>How We Use Your Information</Text>
        <Text  fontSize={"12px"} color={"rgb(153, 153, 153)"}>
          We may use the information we collect for various purposes, including:
        </Text>
        <UnorderedList  fontSize={"12px"} color={"rgb(153, 153, 153)"}>
          <ListItem>Providing and personalizing our services</ListItem>
          <ListItem>Processing your orders and payments</ListItem>
          <ListItem>Communicating with you about your account and our services</ListItem>
          <ListItem>Improving our website and user experience</ListItem>
          <ListItem>
            Conducting research and analysis to enhance our products and
            services
          </ListItem>
          <ListItem>Marketing and promotional purposes, with your consent</ListItem>
        </UnorderedList>
        <br />

        <Text fontWeight={500} fontSize={"16px"}>Sharing Your Information</Text>
        <Text  fontSize={"12px"} color={"rgb(153, 153, 153)"}>
          We may share your information with third parties in certain
          circumstances, including:
        </Text>
        <UnorderedList  fontSize={"12px"} color={"rgb(153, 153, 153)"}>
          <ListItem>Service providers who assist us in operating our business</ListItem>
          <ListItem>Legal and regulatory authorities when required by law</ListItem>
          <ListItem>
            Business partners for joint marketing initiatives, with your consent
          </ListItem>
        </UnorderedList>
        <br />

        <Text fontWeight={500} fontSize={"16px"}>Security Measures</Text>
        <Text  fontSize={"12px"} color={"rgb(153, 153, 153)"}>
          We take the security of your information seriously and have
          implemented appropriate measures to protect it from unauthorized
          access, alteration, or disclosure. However, please note that no method
          of transmission over the internet or electronic storage is 100%
          secure, and we cannot guarantee absolute security.
        </Text>
        <br />

        <Text fontWeight={500} fontSize={"16px"}>Changes to this Privacy Policy</Text>
        <Text  fontSize={"12px"} color={"rgb(153, 153, 153)"}>
          We may update this Privacy Policy from time to time. We encourage you
          to review this page periodically for any changes. Your continued use
          of our website or services after any modifications indicates your
          acceptance of the updated Privacy Policy.
        </Text>
        <br />

        <Text fontWeight={500} fontSize={"16px"}>Contact Us</Text>
        <Text  fontSize={"12px"} color={"rgb(153, 153, 153)"}>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at privacy@estylewala.com.
        </Text>
      </Box>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
