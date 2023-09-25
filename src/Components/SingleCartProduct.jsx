import {
  Box,
  HStack,
  Grid,
  VStack,
  Image,
  Text,
  Select,
  useToast,
} from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getUserDetails } from "../Redux/UserReducer/Action";

const SingleCartProduct = ({
  offer,
  qty,
  MRP,
  brand,
  currentSize,
  discount,
  _id,
  img,
  price,
  size,
  title,
  setTotalAmount,
  setTotalMRP,
  setTotalMRPDiscount,
  setOfferPrice,
  handleCartProducts,
  userId,
  getCartProd,
  cartId,
  loadingFun,
}) => {
  console.log(title, qty);
  const mobileNumber = localStorage.getItem("MbNumber");
  const dispatch = useDispatch();
  const [currentSizeShow, setCurrentSize] = useState(currentSize || size[0]);
  const [currentQty, setCurrentQty] = useState(qty || 1);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSize = (e) => {
    setCurrentSize(e.target.value);
    axios({
      method: "put",
      url: process.env.REACT_APP_BASE_API + `/user/cart/${cartId}/update`,
      data: {
        currentSize: e.target.value,
      },
    })
      .then(({ data }) => {
        setCurrentSize(data.data.currentSize);
        console.log(data.data);
        // dispatch(getUserDetails());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleQty = (e) => {
    e = e.target.value;
    setTotalMRP((prev) => prev + MRP * (e - currentQty));
    setTotalMRPDiscount(
      (prev) => prev + MRP * (e - currentQty) - price * (e - currentQty)
    );
    setTotalAmount((prev) => prev + discount * (e - currentQty));
    setOfferPrice((prev) => prev + (price - discount) * (e - currentQty));
    console.log();
    setCurrentQty(e);
    axios({
      method: "put",
      url: process.env.REACT_APP_BASE_API + `/user/cart/${cartId}/update`,
      data: {
        qty: e,
        // item: "qty",
      },
    })
      .then(({ data }) => {
        setCurrentQty(data.data.qty);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("use");
    setTotalMRP((prev) => prev + MRP * currentQty);
    setTotalMRPDiscount((prev) => prev + (MRP - price) * currentQty);
    setOfferPrice((prev) => prev + (price - discount) * currentQty);
    setTotalAmount((prev) => prev + discount * currentQty);
  }, []);

  const handleDelete = (_id) => {
    loadingFun(true);
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_API}/user/cart/${_id}`,
    })
      .then(() => {
        getCartProd();
        console.log("del");
        setTotalMRP(0);
        setTotalAmount(0);
        setOfferPrice(0);
        setTotalMRPDiscount(0);

        toast({
          title: "Product successfully deleted.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        toast({
          title: "Please Wait.... Deleting",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <>
      <Grid
        templateColumns={{
          lg: "1fr 3fr 20px",
          md: "1fr 3fr 20px",
          base: "1fr 3fr 20px",
        }}
        textAlign="left"
        gap="5px"
        w="full"
        border={"2px solid #b0a9a9"}
        borderRadius="5px"
      >
        <Box w={{ lg: "9vw", md: "13vw", base: "25vw" }} p={"5px"}>
          <Image
            boxSize={{lg: "11vw",md:"15vw",base:"30vw"}}
            objectFit="contain"
            w={"full"}
            src={process.env.REACT_APP_BASE_API + "/" + img}
            alt=""
          ></Image>
        </Box>
        <Box
          w={"full"}
          fontSize={{ lg: "14px", md: "14px", base: "3vw" }}
          // py={"15px"}
        >
          <VStack w={"full"} align="flex-start">
            {/* <Text fontWeight={"bold"} color="#282c3f">
              {title}
            </Text> */}
            <Text
              fontWeight={"bold"}
              isTruncated
              w={{ lg: "200px", md: "200px", base: "150px" }}
              color="#282c3f"
            >
              {title}
            </Text>
            <Text color="#282c3f" fontWeight={400}>
              {brand}
            </Text>

            <HStack>
              <HStack borderRadius={"5px"} bgColor={"#f5f5f6"}>
                <Text pl={1} color={"#282c3f"} fontWeight={"bold"}>
                  Size:
                </Text>

                <select
                  // textAlign="justify"
                  value={currentSizeShow}
                  onChange={handleSize}
                  icon={<MdArrowDropDown />}
                  fontSize={{ lg: "sm", md: "sm", base: "10px" }}
                  variant={"unstyled"}
                  fontWeight="500"
                  color={"#282c3f"}
                >
                  {size.map((el) => {
                    return (
                      <option fontWeight="500" key={el} value={el}>
                        {el}
                      </option>
                    );
                  })}
                </select>
              </HStack>

              <HStack borderRadius={"5px"} bgColor={"#f5f5f6"}>
                <Text pl={1} color={"#282c3f"} fontWeight={"bold"}>
                  Qty:
                </Text>

                <select
                  color={"#282c3f"}
                  icon={<MdArrowDropDown />}
                  size={"sm"}
                  p={0}
                  m={0}
                  variant={"unstyled"}
                  value={currentQty}
                  onChange={handleQty}
                  fontWeight="500"
                >
                  <option fontWeight="500" value={1}>
                    1
                  </option>
                  <option fontWeight="500" value={2}>
                    2
                  </option>
                  <option fontWeight="500" value={3}>
                    3
                  </option>
                  <option fontWeight="500" value={4}>
                    4
                  </option>
                  <option fontWeight="500" value={5}>
                    5
                  </option>
                </select>
              </HStack>
            </HStack>

            <HStack>
              <Text color={"#282c3f"} fontWeight={"bold"}>
                ₹ {price * currentQty}
              </Text>
              <Text color={"#94969f"} fontWeight={400} textDecor="line-through">
                ₹ {MRP * currentQty}
              </Text>
              <Text color={"#f16565"} fontWeight={400}>
                {/* {offer.value}  {offer.type1} OFF */}
                {/* % OFF */}
                {offer.text}
              </Text>
            </HStack>
          </VStack>
        </Box>
        <Box
          w={"full"}
          position={"relative"}
          top={"3px"}
          right={"5px"}
          fontSize={"20px"}
          color="282c3f"
          cursor={"pointer"}
          onClick={() => handleDelete(_id)}
        >
          &#x2715;
        </Box>
      </Grid>
    </>
  );
};

export default SingleCartProduct;
