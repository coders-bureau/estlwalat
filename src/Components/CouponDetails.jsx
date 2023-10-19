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

const CouponDetails = ({
  totalMRP,
  totalMRPDiscount,
  offerPrice,
  setCouponDiscount,
}) => {
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [appliedCouponmsg, setAppliedCouponmsg] = useState(null);
  const [cartValue, setCartValue] = useState(0);

  let totalAmount = totalMRP - totalMRPDiscount - offerPrice;
  useEffect(() => {
    if (totalAmount) {
      axios
        .post(`${process.env.REACT_APP_BASE_API}/offer/findcoupon`, {
          cartValue: totalMRP - totalMRPDiscount - offerPrice,
        })
        .then((couponResponse) => {
          if (couponResponse.data.success) {
            const nearestCoupon = couponResponse.data.data;
            // console.log(couponResponse.data);
            // Apply the coupon to the cart value
            // if (nearestCoupon) {
            //   // You can apply the coupon logic here and set the discounted cart value
            //   // For example, if it's a percent coupon:
            //   const discountAmount = (nearestCoupon.value / 100) * totalAmount;
            //   const discountedCartValue = totalAmount - discountAmount;
            //   setCartValue(discountedCartValue);
            //   setCouponDiscount();
            //   // Set the applied coupon for display
            //   setAppliedCouponmsg(null);
            //   setAppliedCoupon(nearestCoupon);
            // }
            let discountedCartValue;
            let discountAmount;
            if (nearestCoupon.type === "percent") {
              // If it's a percent coupon, calculate the discount amount and subtract it
              discountAmount = Math.floor((nearestCoupon.value / 100) * totalAmount);
              // discountedCartValue = totalAmount - discountAmount;
            } else if (nearestCoupon.type === "flat") {
              // If it's a flat coupon, simply subtract the value from the total amount
              discountAmount = nearestCoupon.value;
              // discountedCartValue = totalAmount - nearestCoupon.value;
            } else {
              // Handle other coupon types or unknown types here
              discountedCartValue = totalAmount;
            }

            // Set the discounted cart value
            setCartValue(discountedCartValue);
            setCouponDiscount(discountAmount);

            // Set the applied coupon for display
            setAppliedCouponmsg(null);
            setAppliedCoupon(nearestCoupon);
          } else {
            setAppliedCoupon(null);
            setCouponDiscount(0);
            setAppliedCouponmsg(couponResponse.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [totalMRP]);
  return (
    <div>
      <Box w="full">
        <VStack align={"flex-start"} w={"full"}>
          {/* <Text fontSize={"12px"} color={"#535766"} fontWeight={700}>
            COUPONS
          </Text> */}
          <HStack justify={"space-between"} w="full">
            <HStack spacing={"15px"}>
              <Icon fontSize={"20px"} as={MdOutlineLocalOffer}></Icon>
              {/* <Text fontSize={"14px"} color="535766" fontWeight={"700"}>
                Apply Coupons
              </Text> */}
              {appliedCoupon && (
                <Text fontSize={"14px"} color="535766">
                  Applied Coupon:{" "}
                  <b>
                    {" "}
                    {appliedCoupon.text} ({appliedCoupon.value}% off)
                  </b>
                </Text>
              )}
              {appliedCouponmsg && <Text>{appliedCouponmsg}</Text>}
            </HStack>
            {/* <Button
              borderRadius={2}
              px={4}
              py={3}
              variant={"outline"}
              size={"xs"}
              colorScheme={"pink"}
              // onClick={openModal}
            >
              APPLY
            </Button> */}
          </HStack>
        </VStack>
      </Box>
    </div>
  );
};

export default CouponDetails;
