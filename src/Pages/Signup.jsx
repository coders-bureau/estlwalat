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
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, userRegister } from "../Redux/UserReducer/Action";
import axios from "axios";

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const comingFrom = location?.state || "/";
  const dispatch = useDispatch();
  const user = useSelector((store) => store.UserReducer);

  // console.log(user);
  // console.log(comingFrom);
  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (isError) {
      setIsError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.length !== 10 || +input != input) {
      setIsError(true);
    } else {
      try {
        localStorage.setItem("MbNumber", +input);
        const mobileNumber = input;

        try {
          const config = { headers: { "Contnet-Type": "application/json" } };
          console.log(input);
          await axios.post(
            "http://localhost:5000/user/signup",
            { mobileNumber },
            config
          );
          toast({
            title: "User Registered successfully",
            variant: "top-accent",
            isClosable: true,
            position: "top-center",
            status: "success",
            duration: 1500,
          });
         dispatch(getUserDetails(mobileNumber));
        navigate("/otp", { state: comingFrom, replace: true });


        } catch (error) {
          console.log(error.response.data.error);
          toast({
            title: error.response.data.error,
            variant: "top-accent",
            isClosable: true,
            position: "top-center",
            status: "error",
            duration: 1500,
          });
        }

        // console.log("enter");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Box>
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
      </Box>
    </>
  );
};

export default Signup;
