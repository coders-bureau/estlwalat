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
import { getUserDetails } from "../Redux/UserReducer/Action";

const SingleCartProduct = ({
  offer,
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
  userId,qty
}) => {
  
  const mobileNumber = localStorage.getItem("MbNumber");
  const dispatch= useDispatch();
  const [currentSizeShow, setCurrentSize] = useState(currentSize || size[0]);
  const [currentQty, setCurrentQty] = useState(qty || 4);
  const toast = useToast();
  const handleSize = (e) => {
    // axios({
    //   method: "patch",
    //   url: process.env.REACT_APP_MYNTRA_API + "/cart/" + _id,
    //   data: {
    //     currentSize: e.target.value,
    //   },
    // })
    setCurrentSize(e.target.value);
    axios({
      method: "put",
      // url: `https://estylewalabackend.onrender.com/user/`+userId+`/cart/`+_id,
      url:process.env.REACT_APP_BASE_API+`/user/cart/${_id}/update`,
      data: {
            currentSize: e.target.value,
            // item: "currentSize"
          },
    })
    .then(({ data }) => {
      setCurrentSize(data.data);
      console.log((data.data));
      dispatch(getUserDetails());
    }).catch((err)=> {
      console.log(err);
    });
  };

  const handleQty = (e) => {
    e = e.target.value;
    setTotalMRP((prev) => prev + MRP * (e - currentQty));
    setTotalMRPDiscount(
      (prev) => prev + MRP * (e - currentQty) - price * (e - currentQty)
    );
    setTotalAmount((prev) => prev + (discount * (e - currentQty)));
    setOfferPrice((prev) => prev + (price - discount) * (e - currentQty));
  console.log();
    setCurrentQty(e);  
    axios({
      method: "put",
      // url: `https://estylewalabackend.onrender.com/user/`+userId+`/cart/`+_id,
      url:process.env.REACT_APP_BASE_APIPP_MYNTRA_API+`/user/cart/${_id}/update`,
      data: {
            qty: e,
            // item: "qty",
          },
    })
    .then(({ data }) => {
      dispatch(getUserDetails(mobileNumber));
      setCurrentQty(data.data);
    }).catch((err)=> {
      console.log(err);
    });
  };

  useEffect(() => {
    setTotalMRP((prev) => prev + MRP);
    setTotalMRPDiscount((prev) => prev + MRP - price);
    setOfferPrice((prev) => prev + (price - discount));
    setTotalAmount((prev) => prev + discount);
  }, []);

  const handleDelete = (_id) => {
    axios({
      method: "delete",
      // url: process.env.REACT_APP_MYNTRA_API + `/cart/${id}`,
      url: `${process.env.REACT_APP_BASE_API}/user/cart/${_id}`,
    })
      .then(() => {
        // dispatch(getUserDetails(mobileNumber));
        
        setTotalMRP((prev) => prev - MRP * currentQty);
        setTotalAmount((prev) => prev - price * currentQty);
        setTotalMRPDiscount((prev) => prev - currentQty * (MRP - price));

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
        <Box w={{ lg: "160px", md: "160px", base: "100px" }} p={"5px"}>
          <Image src={process.env.REACT_APP_BASE_API + "/" + img} alt=""></Image>
        </Box>
        <Box
          w={"full"}
          fontSize={{ lg: "14px", md: "14px", base: "3vw" }}
          py={"15px"}
        >
          <VStack w={"full"} align="flex-start">
          <Text fontWeight={"bold"} color="#282c3f">
              {_id}
            </Text>
            <Text fontWeight={"bold"} color="#282c3f">
              {brand}
            </Text>
            <Text
              color="#282c3f"
              fontWeight={400}
              isTruncated
              w={{ lg: "200px", md: "200px", base: "150px" }}
            >
              {title}
            </Text>

            <HStack>
              <HStack borderRadius={"5px"} bgColor={"#f5f5f6"}>
                <Text pl={1} color={"#282c3f"} fontWeight={"bold"}>
                  Size:
                </Text>

                <Select
                  textAlign="justify"
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
                </Select>
              </HStack>

              <HStack borderRadius={"5px"} bgColor={"#f5f5f6"}>
                <Text pl={1} color={"#282c3f"} fontWeight={"bold"}>
                  Qty:
                </Text>
                <Select
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
                </Select>
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
              {offer.value}  {offer.type1} OFF
                {/* % OFF */}
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
