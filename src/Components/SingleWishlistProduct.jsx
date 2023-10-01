import {
  Box,
  Image,
  VStack,
  Circle,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";

const SingleWishlistProduct = ({ el, handleAddCart, handleDelete }) => {
  const { MRP, discount, brand, img, price, title } = el;
  console.log(el._id);
  return (
    <>
      <VStack
        minHeight={"140px"}
        border={"1px solid #e8ecf3"}
        w={"full"}
        spacing={0}
      >
        <Circle
          zIndex={1}
          onClick={() => handleDelete(el._id)}
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
          <Image
            boxSize={{ lg: "20vw", md: "37vw", base: "59vw" }}
            objectFit="contain"
            w={"full"}
            src={process.env.REACT_APP_BASE_API + "/" + img}
          />
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
              fontSize={{ lg: "14px", md: "14px", base: "13px" }}
              fontWeight={500}
              color={"#2e364b"}
            >
              {brand}
            </Text>
            <Text
              fontWeight={500}
              fontSize={{ lg: "10px", md: "10px", base: "10px" }}
              color={"#ff915c"}
            >
              ({discount}% OFF)
            </Text>
          </HStack>
          <Text
            w={"full"}
            align={"left"}
            fontWeight="400"
            color={"#53575f"}
            fontSize={{ lg: "14px", md: "14px", base: "13px" }}
            isTruncated
          >
            {title}
          </Text>
          <HStack>
            <Text
              fontWeight={500}
              fontSize={{ lg: "12px", md: "12px", base: "10px" }}
              color={"#2e364b"}
            >
              Rs.{price}
            </Text>
            <Text
              textDecor={"line-through"}
              fontWeight={400}
              fontSize={{ lg: "12px", md: "12px", base: "10px" }}
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
          bg="#ff3e6c"
          w={"full"}
          borderRadius="0"
          borderTop={"1px solid #e8ecf3"}
          variant={"unstyled"}
          _hover={{ bgColor: "none" }}
        >
          MOVE TO BAG
        </Button>
      </VStack>
    </>
  );
};

export default SingleWishlistProduct;
