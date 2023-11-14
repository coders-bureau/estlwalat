import { Box, HStack, VStack, Text, Button, useToast } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentDetains1 = ({
  totalMRP,
  totalMRPDiscount,
  offerPrice,
  couponDiscount,
}) => {
  return (
    <>
      <Box w="full">
        <VStack w={"full"} align={"left"} textAlign="left">
          <Text fontSize={"16px"} fontWeight={"bold"} color={"#535766"}>
            PRICE DETAILS
          </Text>
          <HStack w={"full"} justify={"space-between"}>
            <Text fontSize={"14px"} color="#282c3f">
              Total
            </Text>
            <Text fontSize={"14px"} color="#282c3f">
              ₹{totalMRP}
            </Text>
          </HStack>
          <HStack w={"full"} justify={"space-between"}>
            <Text fontSize={"14px"} color="#282c3f">
              Discount
            </Text>
            <Text fontSize={"14px"} fontWeight={700} color="#03a685">
              -₹{totalMRPDiscount}
            </Text>
          </HStack>
          {/* <HStack w={"full"} justify={"space-between"}>
            <Text fontSize={"14px"} color="#282c3f">
              Gst
            </Text>
            <Text fontSize={"14px"} color="#03a685">
              +₹{offerPrice}
            </Text>
          </HStack> */}
          <HStack w={"full"} justify={"space-between"}>
            <Text fontSize={"14px"} color="#282c3f">
              Coupon Discount
            </Text>
            <Text fontSize={"14px"} color="#03a685">
              -₹{couponDiscount}
            </Text>
          </HStack>
          <HStack w={"full"} justify={"space-between"}>
            <HStack fontSize={"14px"}>
              <Text fontSize={"14px"} color="#282c3f">
                Convenience Fee
              </Text>
              {/* <Text fontSize={"14px"} color={"#863e9c"} fontWeight={"bold"}>
                Know More
              </Text> */}
            </HStack>
            <HStack>
              <Text
                fontSize={"14px"}
                color="#282c3f"
                textDecor={"line-through"}
              >
                ₹99
              </Text>
              <Text fontSize={"14px"} color="#03a685">
                FREE
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>
      {/* .......................... */}
    </>
  );
};

const PaymentDetains2 = ({
  offerPrice,
  totalAmount,
  totalMRP,
  totalMRPDiscount,
  couponDiscount,
  redirect,
  addressLine,
  selectedAddressId,
  cart,
  name,
  mobileNumber,
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const finalAmount = totalAmount - couponDiscount;
  return (
    <>
      <Box w="full">
        <VStack w={"full"} spacing={"3"} align="flex-start">
          <VStack w={"full"} spacing={"0"}>
            <HStack w={"full"} justify={"space-between"}>
              <Text fontSize={"14px"} color={"#3e4152"} fontWeight={"bold"}>
                TOTAL AMOUNT
              </Text>

              <Text fontSize={"14px"} color={"#3e4152"} fontWeight={"bold"}>
                ₹ {totalAmount - couponDiscount}
              </Text>
            </HStack>
            <HStack w={"full"} justify={"space-between"}>
              <Text
                align={"left"}
                fontSize={"10px"}
                color={"#863e9c"}
                fontWeight={"bold"}
              >
                Included all taxes and charges
              </Text>
            </HStack>
          </VStack>

          <Button
            display={{
              md: "block",
              base: "none",
            }}
            onClick={() =>
              redirect
                ? navigate(redirect, {
                    state: {
                      totalAmount,
                      totalMRP,
                      totalMRPDiscount,
                      couponDiscount,
                      addressLine,
                      selectedAddressId,
                      offerPrice,
                      finalAmount,
                      cart,
                      name,
                      mobileNumber,
                    },
                  })
                : toast({
                    title: "Please check your address.",
                    status: "warning",
                    duration: 2000,
                    position: "top",
                  })
            }
            w="full"
            bg={"#ff3e6c"}
            color={"#fff"}
            borderRadius={3}
            fontSize={"15px"}
          >
            PLACE ORDER
          </Button>
        </VStack>
      </Box>
      {/* .......................... */}
    </>
  );
};

export { PaymentDetains1, PaymentDetains2 };
