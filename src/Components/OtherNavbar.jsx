import { HStack, Box, Divider, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const OtherNavbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box>
        <HStack
          width={"full"}
          justify="space-between"
          px={"3vw"}
          py={"3vw"}
          borderBottom={"1px solid #f7f7f8"}
          fontSize={{ lg: "13px", md: "13px", base: "10px" }}
        >
          <Box>
            <HStack>
              <Box>
                <Text
                  fontFamily={"Helvetica, Arial, sans-serif"}
                  fontWeight={600}
                  color="#20bd99"
                  borderBottom={"3px solid"}
                  letterSpacing="3px"
                >
                  BAG
                </Text>
              </Box>
              <Divider
                orientation="horizontal"
                border="1px dashed !important"
              />

              <Box>
                <Text
                  fontFamily={"Helvetica, Arial, sans-serif"}
                  fontWeight={600}
                  color="#696b79"
                  letterSpacing="3px"
                >
                  ADDRESS
                </Text>
              </Box>
              <Divider
                orientation="horizontal"
                border="1px dashed !important"
              />

              <Box>
                <Text
                  fontFamily={"Helvetica, Arial, sans-serif"}
                  fontWeight={600}
                  color="#696b79"
                  letterSpacing="3px"
                >
                  PAYMENT
                </Text>
              </Box>
            </HStack>
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default OtherNavbar;
