import { HStack, Box, Image, Divider, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/estylebg.png";
import { useLocation } from "react-router-dom";

const OtherNavbar = () => {
  const location = useLocation();
  const currentlocation = location.pathname;
  const navigate = useNavigate();
  return (
    <>
      <Box alignSelf={"center"} w="full">
        <HStack
          width={"full"}
          justify="space-between"
          px={{ md: "80px", base: "10px" }}
          py={3}
          borderBottom={"1px solid #f7f7f8"}
        >
          <Box onClick={() => navigate("/")}>
            <Image
              display={{ md: "flex", base: "none" }}
              w="100px"
              alt="logo"
              fallbackSrc={logo}
              cursor="pointer"
              src={logo}
            ></Image>
          </Box>

          <Box justifyItems={"center"} width={"340px"}>
            <VStack>
              <HStack>
                <Box>
                  <Text
                    fontFamily={"Helvetica, Arial, sans-serif"}
                    fontWeight={600}
                    color={
                      location.pathname === "/cart" ? "#20bd99" : "#696b79"
                    }
                    borderBottom={
                      location.pathname === "/cart" ? "3px solid" : "0px"
                    }
                    letterSpacing="3px"
                    fontSize={"13px"}
                  >
                    BAG
                  </Text>
                </Box>
                <Divider
                  color={
                    location.pathname === "/address" ||
                    location.pathname === "/payment"
                      ? "#20bd99"
                      : "#696b79"
                  }
                  orientation="horizontal"
                  border="1px dashed !important"
                />

                <Box>
                  <Text
                    fontFamily={"Helvetica, Arial, sans-serif"}
                    fontWeight={600}
                    color={
                      location.pathname === "/address" ? "#20bd99" : "#696b79"
                    }
                    borderBottom={
                      location.pathname === "/address" ? "3px solid" : "0px"
                    }
                    letterSpacing="3px"
                    fontSize={"13px"}
                  >
                    ADDRESS
                  </Text>
                </Box>
                <Divider
                  color={
                    location.pathname === "/payment" ? "#20bd99" : "#696b79"
                  }
                  orientation="horizontal"
                  border="1px dashed !important"
                />

                <Box>
                  <Text
                    fontFamily={"Helvetica, Arial, sans-serif"}
                    fontWeight={600}
                    color={
                      location.pathname === "/payment" ? "#20bd99" : "#696b79"
                    }
                    borderBottom={
                      location.pathname === "/payment" ? "3px solid" : "0px"
                    }
                    letterSpacing="3px"
                    fontSize={"13px"}
                  >
                    PAYMENT
                  </Text>
                </Box>
              </HStack>
              <Box
                display={{ md: "none", base: "flex" }}
                onClick={() => navigate("/")}
              >
                <Image
                  w="100px"
                  alt="logo"
                  fallbackSrc={logo}
                  cursor="pointer"
                  src={logo}
                ></Image>
              </Box>
            </VStack>
          </Box>

          <Box>
            <HStack display={{ md: "flex", base: "none" }}>
              <Image
                boxSize="30px"
                src="https://constant.myntassets.com/checkout/assets/img/sprite-secure.png"
              />
              <Text
                fontFamily={"Helvetica, Arial, sans-serif"}
                fontWeight={600}
                color="#696b79"
                letterSpacing="3px"
                fontSize={"13px"}
              >
                100% SECURE
              </Text>
            </HStack>
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default OtherNavbar;
