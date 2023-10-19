import {
  Center,
  Box,
  Image,
  Heading,
  Text,
  HStack,
  Link as ChakraLink,
  PinInput,
  PinInputField,
  Img,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/AuthReducer/Action";
import Navbar from "../Components/Navbar";
import firebase from '../firebase.js'


const Otp = () => {
  const [otpVal, setOtp] = useState(Math.floor(1000 + Math.random() * 9000));
  const [mbNumber, setMbNumber] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const toast = useToast();
  const location = useLocation();
  const comingFrom = location?.state || "/";
  const prevLocation = useRef();

  const dispatch = useDispatch();

  // console.log(prevLocation);
  useEffect(() => {
    prevLocation.current = location;
  }, [location]);

  useEffect(() => {
    try {
      let nmbr = JSON.parse(localStorage.getItem("MbNumber")) || false;

      if (!nmbr) {
        navigate("/login", { state: comingFrom, replace: true });
      } else {
        setMbNumber(nmbr);
        // onSignInSubmit();
        // console.log(mbNumber);
      }
    } catch (error) {
      console.log(error);
    }
  }, [mbNumber]);

  useEffect(() => {
    if (value > 999) {
      if (value == otpVal) {
        dispatch(login());

        toast({
          position: "top",
          title: `Login successful`,
          status: "success",
          isClosable: true,
          duration: 1500,
        });

        // navigate("/profile", { replace: true });
        navigate(comingFrom, { replace: true });
      } else {
        toast({
          position: "top",
          title: `Wrong OTP entered`,
          status: "error",
          isClosable: true,
          duration: 1500,
        });
        setValue("");
      }
    }
  }, [value]);

  useEffect(() => {
    if (mbNumber) {
      toast({
        position: "top",
        title: "Your otp is " + otpVal,
        status: "info",
        isClosable: true,
        duration: 5000,
      });
    }
  }, [otpVal, mbNumber]);

//   useEffect(() => {
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//         "recaptcha-container", {
//             size: "invisible",
//             callback: function(response) {
//                 console.log("Captcha Resolved");
//             },
//             defaultCountry: "IN",
//         }
//     );
// }, []);

   const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          // console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };
 const onSignInSubmit = (e) => {
    e.preventDefault();
  configureCaptcha();
    const phoneNumber = "+91" + mbNumber;
    // console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log("OTP has been sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        // console.log("SMS not sent");
      });
  };
  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = value;
    // console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        // console.log(JSON.stringify(user));
        alert("User is verified");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  return (
    <>
      <Navbar />
      <Box>
        <Center w={"full"} bgColor="#fceeea" h={"100vh"}>
          <Box bgColor="white" w={"400px"} p="50px">
            <Box>
              <Image
                size="50px"
                boxSize={"100px"}
                src="https://constant.myntassets.com/pwa/assets/img/3a438cb4-c9bf-4316-b60c-c63e40a1a96d1548071106233-mobile-verification.jpg"
              />
            </Box>

            <Box textAlign={"left"} mt={2} mb={2}>
              <Heading
                fontWeight={"600"}
                as={"h2"}
                color="#424553"
                fontSize="20px"
                size="lg"
              >
                Verify with OTP
              </Heading>
              <Text fontSize={"12px"} mt={2} color={"#a7a9af"}>
                Send to {mbNumber}
              </Text>
            </Box>

            <HStack m={"40px 0px 25px 0px"}>
              <PinInput
                value={value}
                onChange={setValue}
                otp
                mask
                placeholder="&#10146;"
              >
                <PinInputField w="30px" h="40px" />
                <PinInputField w="30px" h="40px" />
                <PinInputField w="30px" h="40px" />
                <PinInputField w="30px" h="40px" />
              </PinInput>
            </HStack>

            <Box mb={8}>
              <Text
                textAlign={"left"}
                color={"#ff3f6c"}
                fontWeight="bold"
                fontSize={"12px"}
                cursor={"pointer"}
                onClick={() => setOtp(Math.floor(1000 + Math.random() * 9000))}
              >
                RESEND OTP
              </Text>
            </Box>

            <Text color={"#a7a9af"} fontSize="12px" textAlign="left">
              Log in using{" "}
              <ChakraLink
                fontWeight={"bold"}
                _hover={{ textDecoration: "none" }}
                color={"#ff3f6c"}
                href="#"
              >
                Password
              </ChakraLink>
            </Text>

            <Text mt={8} color={"#a7a9af"} fontSize="12px" textAlign="left">
              Having trouble logging in?{" "}
              <ChakraLink
                fontWeight={"bold"}
                _hover={{ textDecoration: "none" }}
                color={"#ff3f6c"}
                href="#"
              >
                Get help
              </ChakraLink>
            </Text>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default Otp;
