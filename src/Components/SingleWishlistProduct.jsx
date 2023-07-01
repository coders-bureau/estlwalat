import {
  Box,
  Tag,
  TagCloseButton,
  Image,
  VStack,
  Circle,
  HStack,
  Text,
  Divider,
  StackDivider,
  Button,
} from "@chakra-ui/react";
import React from "react";

const SingleWishlistProduct = ({ el, handleAddCart, handleDelete }) => {
  const { MRP, discount, id, brand, img, price, rating, ratingT, size, title } =
    el;

  return (
    <>
      <VStack minHeight={"140px"} border={"1px solid #e8ecf3"} w={"full"} spacing={0}>
      <Circle
          zIndex={1}
          onClick={() => handleDelete(el.id)}
          bgColor={"#eeeded"}
          p="4px 8px"
          cursor={"pointer"}
          position="relative"
          size={{ lg: "8", md: "7", base: "6" }}
          left={"39%"}
          top={{ lg: "3vw", md: "5vw", base: "6vw" }}
        >
          &#x2718;
        </Circle>
        <Box w={"full"}>
          <Image w={"full"} src={img} />
        </Box>
        <Box
          w={"full"}
          padding="10px"
          spacing={0}
          pb={{ lg: "25px", md: "25px", base: "10px" }}
        >
          <HStack>
            <Text
              isTruncated
              fontSize={{ lg: "14px", md: "14px", base: "10px" }}
              fontWeight={500}
              color={"#2e364b"}
            >
              {brand}
            </Text>
            <Text
              fontWeight={500}
              fontSize={{ lg: "10px", md: "10px", base: "8px" }}
              color={"#ff915c"}
            >
              ({discount}% OFF)
            </Text>
          </HStack>
          <Text
            w={"full"}
            m={"0px 0px"}
            fontWeight="400"
            color={"#53575f"}
            fontSize={{ lg: "14px", md: "14px", base: "10px" }}
            isTruncated
          >
            {title}
          </Text>
          <HStack>
            <Text
              fontWeight={500}
              fontSize={{ lg: "12px", md: "12px", base: "8px" }}
              color={"#2e364b"}
            >
              Rs.{price}
            </Text>
            <Text
              textDecor={"line-through"}
              fontWeight={400}
              fontSize={{ lg: "12px", md: "12px", base: "8px" }}
              color={"#afb0b7"}
            >
              Rs.{MRP}
            </Text>
          </HStack>
        </Box>
        <Button
          fontSize={{ lg: "15px", md: "15px", base: "12px" }}
          onClick={() => handleAddCart(el)}
          fontWeight={"500"}
          color={"#fff"}
          bg="#d53f8c"
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

export default SingleWishlistProduct;
