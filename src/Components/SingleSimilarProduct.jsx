import { Box, Image, VStack, HStack, Text, Button } from "@chakra-ui/react";
import React from "react";

const SingleSimilarProduct = ({ el, handleAddCart }) => {
  const { MRP, discount, img, price, title } = el;

  return (
    <>
      <VStack border={"1px solid #e8ecf3"} w={"full"} spacing={0}>
        <Box w={"full"}>
          <Image w={"full"} src={img} />
        </Box>

        <VStack w={"full"} alignItems="left" padding="10px" spacing={0}>
          <Text
            w={"full"}
            m={"2px 0px"}
            fontWeight="400"
            color={"#53575f"}
            fontSize="14px"
            isTruncated
          >
            {title}
          </Text>
          <HStack>
            <Text fontWeight={500} color={"#2e364b"}>
              Rs.{price}
            </Text>
            <Text
              textDecor={"line-through"}
              fontWeight={400}
              fontSize={"12px"}
              color={"#afb0b7"}
            >
              Rs.{MRP}
            </Text>
            <Text
              display={{ lg: "flex", md: "flex", base: "none" }}
              color={"#ff905a"}
              fontSize={"13px"}
            >{`(${discount}% OFF)`}</Text>
          </HStack>
          <Text
            display={{ lg: "none", md: "none", base: "flex" }}
            color={"#ff905a"}
            fontSize={"13px"}
          >{`(${discount}% OFF)`}</Text>
        </VStack>
        <Button
          onClick={() => handleAddCart(el)}
          fontWeight={"500"}
          color="#d53f8c"
          w={"full"}
          borderRadius="0"
          borderTop={"1px solid #e8ecf3"}
          variant={"unstyled"}
          _hover={{ bgColor: "none" }}
        >
          ADD TO BAG
        </Button>
      </VStack>
    </>
  );
};

export default SingleSimilarProduct;
