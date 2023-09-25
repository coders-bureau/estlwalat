import {
  Box,
  HStack,
  VStack,
  Text,
  Button,
  useToast,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PaymentDetains1 = ({ totalMRP, totalMRPDiscount, offerPrice }) => {
  const [cartValue, setCartValue] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  // console.log(totalAmount);
  let totalAmount = totalMRP - totalMRPDiscount - offerPrice;
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASE_API}/offer/findcoupon`, {
        cartValue: (totalMRP - totalMRPDiscount - offerPrice),
      })
      .then((couponResponse) => {
        const nearestCoupon = couponResponse.data.data;
        console.log(couponResponse.data);
        // Apply the coupon to the cart value
        if (nearestCoupon) {
          // You can apply the coupon logic here and set the discounted cart value
          // For example, if it's a percent coupon:
          const discountAmount = (nearestCoupon.value / 100) * totalAmount;
          const discountedCartValue = totalAmount - discountAmount;
          setCartValue(discountedCartValue);

          // Set the applied coupon for display
          setAppliedCoupon(nearestCoupon);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [totalMRP]);

  return (
    <>
      <Box w="full">
        <Box w="full">
          <VStack align={"flex-start"} w={"full"}>
            <Text fontSize={"12px"} color={"#535766"} fontWeight={700}>
              COUPONS
            </Text>
            <HStack justify={"space-between"} w="full">
              <HStack spacing={"15px"}>
                <Icon fontSize={"20px"} as={MdOutlineLocalOffer}></Icon>
                <Text fontSize={"14px"} color="535766" fontWeight={"700"}>
                  Apply Coupons
                </Text>
                {appliedCoupon && (
                  <Text fontSize={"14px"} color="535766" fontWeight={"700"}>
                    Applied Coupon: {appliedCoupon.text} ({appliedCoupon.value}%
                    off)
                  </Text>
                )}
              </HStack>
              <Button
                borderRadius={2}
                px={4}
                py={3}
                variant={"outline"}
                size={"xs"}
                colorScheme={"pink"}
                // onClick={openModal}
              >
                APPLY
              </Button>
            </HStack>
          </VStack>
        </Box>
        <VStack w={"full"} align={"left"} textAlign="left">
          <Text fontSize={"16px"} fontWeight={"bold"} color={"#535766"}>
            PRICE DETAILS
          </Text>
          <HStack w={"full"} justify={"space-between"}>
            <Text fontSize={"14px"} color="#282c3f">
              Total MRP
            </Text>
            <Text fontSize={"14px"} color="#282c3f">
              ₹{totalMRP}
            </Text>
          </HStack>
          <HStack w={"full"} justify={"space-between"}>
            <Text fontSize={"14px"} color="#282c3f">
              Discount on MRP
            </Text>
            <Text fontSize={"14px"} color="#03a685">
              -₹{totalMRPDiscount}
            </Text>
          </HStack>
          <HStack w={"full"} justify={"space-between"}>
            <Text fontSize={"14px"} color="#282c3f">
              Offer Discount
            </Text>
            <Text fontSize={"14px"} color="#03a685">
              -₹{offerPrice}
            </Text>
          </HStack>
          <HStack w={"full"} justify={"space-between"}>
            <HStack fontSize={"14px"}>
              <Text fontSize={"14px"} color="#282c3f">
                Convenience Fee
              </Text>
              <Text fontSize={"14px"} color={"#863e9c"} fontWeight={"bold"}>
                Know More
              </Text>
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
  redirect,
  addressLine,
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  return (
    <>
      <Box w="full">
        <VStack w={"full"} align="flex-start">
          <HStack w={"full"} justify={"space-between"}>
            <Text fontSize={"14px"} color={"#3e4152"} fontWeight={"bold"}>
              TOTAL Amount
            </Text>
            <Text fontSize={"14px"} color={"#3e4152"} fontWeight={"bold"}>
              ₹ {totalAmount}
            </Text>
          </HStack>
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
                      addressLine,
                      offerPrice,
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
