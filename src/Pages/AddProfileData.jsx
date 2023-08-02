import {
  Box,
  Center,
  Heading,
  HStack,
  VStack,
  Text,
  Input,
  InputLeftAddon,
  InputGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../Components/Navbar";

const AddProfileData = () => {
  return (
    <div>
    <Navbar />

      {/* <Box>
        <Center w={"full"} bgColor="#fceeea" h={"100vh"}>
          <VStack w={"420px"} spacing="0">
            <Box w={"100%"} p={"40px 30px 10px 30px"} bgColor="white">
              <FormControl isRequired isInvalid={isError}>
                <FormLabel display={"flex"} as="div">
                  <Center>
                    <HStack
                      w="full"
                      alignItems={"baseline"}
                      gap="0"
                      spacing={"5px"}
                    >
                      <Heading
                        fontWeight={"600"}
                        as={"h2"}
                        color="#424553"
                        fontSize="24px"
                        size="lg"
                      >
                        Login&nbsp;
                      </Heading>
                      <Text fontSize={"18px"} color="#5a5e6d">
                        or
                      </Text>
                      <Heading
                        fontWeight={"600"}
                        as={"h2"}
                        color="#424553"
                        fontSize="24px"
                        size="lg"
                      >
                        &nbsp;Signup
                      </Heading>
                    </HStack>
                  </Center>
                </FormLabel>

                <InputGroup mt={10} size={"sm"} variant={"outline"}>
                  <InputLeftAddon p={"15px 10px"} children="+91" />
                  <Input
                    p={"15px 10px"}
                    focusBorderColor="#f4f4f4"
                    maxLength={10}
                    minLength={10}
                    type="tel"
                    placeholder="Mobile Number"
                    value={input}
                    onChange={handleInputChange}
                  />
                </InputGroup>
                {!isError ? (
                  true
                ) : (
                  <FormErrorMessage fontSize={12}>
                    Please enter a valid mobile number(10 digit)
                  </FormErrorMessage>
                )}
                <FormHelperText mt={8} color={"#a7a9af"} textAlign="left">
                  By continuing, I agree to the&nbsp;
                  <ChakraLink
                    fontWeight={"bold"}
                    _hover={{ textDecoration: "none" }}
                    color={"#ff3f6c"}
                    href="/termsofuse"
                  >
                    Terms of Use&nbsp;
                  </ChakraLink>
                  &&nbsp;
                  <ChakraLink
                    fontWeight={"bold"}
                    _hover={{ textDecoration: "none" }}
                    color={"#ff3f6c"}
                    href="/privacypolicy"
                  >
                    Privacy Policy&nbsp;
                  </ChakraLink>
                </FormHelperText>

                <Button
                  w={"100%"}
                  mt={8}
                  mb={4}
                  variant="solid"
                  backgroundColor="#ff3f6c"
                  color={"#fff"}
                  borderRadius="0"
                  colorScheme={"none"}
                  type="submit"
                  onClick={handleSubmit}
                >
                  CONTINUE
                </Button>
              </FormControl>

              <Text mb={10} color={"#a7a9af"} textAlign="left">
                Have trouble logging in?
                <ChakraLink
                  fontWeight={"bold"}
                  _hover={{ textDecoration: "none" }}
                  color={"#ff3f6c"}
                  href="/faqs"
                >
                  &nbsp;Get help
                </ChakraLink>
              </Text>
            </Box>
          </VStack>
        </Center>
      </Box> */}
    </div>
  );
};

export default AddProfileData;
