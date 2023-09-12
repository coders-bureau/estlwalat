import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Heading,
  Center,
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Navbar />
      <Center h="100vh">

      <Box w={"50%"}>
        <Heading as="h1" size="xl" mb={4}>
          Contact Us
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter your description"
                resize="vertical"
                rows="5"
              />
            </FormControl>
            <Button type="submit" color={"#ffffff"} bgColor={"#ff3e6c"}>
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
      </Center>

    </>
  );
};

export default ContactUs;
