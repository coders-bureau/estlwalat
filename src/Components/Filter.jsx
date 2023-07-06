import React from "react";
import {
  Box,
  VStack,
  Radio,
  RadioGroup,
  Divider,
  Text,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // ...........................

  const initType = searchParams.get("type");
  const [type, setType] = useState(initType || "");
  // ...........................

  const initCategory = searchParams.getAll("category");
  const [category, setCategory] = useState(initCategory || []);
  // ...........................

  const initBrand = searchParams.getAll("brand");
  const [brand, setBrand] = useState(initBrand || []);
  // ............................

  const initPrice = searchParams.getAll("price");
  const [price, setPrice] = useState(initPrice || []);
  // ............................
  const initDiscount = searchParams.get("discount");
  const [discount, setDiscount] = useState(initDiscount || "");
  // ............................
  const initQuery = searchParams.get("q");
  const [q, setQuery] = useState(initQuery || "");

  const handleType = (el) => {
    setType(el);
  };

  const handleCategory = (el) => {
    setCategory(el);
  };

  const handlePrice = (el) => {
    setPrice(el);
  };

  const handleDiscount = (el) => {
    setDiscount(el);
  };

  useEffect(() => {
    setType(initType);
  }, [initType]);

  useEffect(() => {
    setQuery(initQuery);
  }, [initQuery]);

  useEffect(() => {
    const params = {};
    type && (params.type = type);
    category && (params.category = category);
    brand && (params.brand = brand);
    price && (params.price = price);
    discount && (params.discount = discount);
    q && (params.q = q);
    setSearchParams(params);
  }, [
    type,
    setType,
    category,
    setCategory,
    brand,
    setBrand,
    price,
    setPrice,
    discount,
    setDiscount,
    q,
    setQuery,
  ]);

  return (
    <>
      <VStack
        border={"1px"}
        alignItems={"flex-start"}
        spacing={1}
        position={"sticky"}
        top={"12%"}
        bottom={"1000px"}
      >
        <Box pl={"40%"} fontWeight={700}>
          FILTERS
        </Box>

        <Divider border={"1px"} color={"#b0a9a9"} />

        <Box pl={4}>
          <Text
            fontSize={"14px"}
            fontWeight={700}
            color="#282c3f"
            textAlign={"left"}
          >
            TYPE
          </Text>
          <RadioGroup
            onChange={handleType}
            value={type}
            colorScheme={"pink"}
            size={"sm"}
          >
            <VStack alignItems={"flex-start"} spacing={1}>
              <Radio value="Men">Men</Radio>
              <Radio value="Women">Women</Radio>
              <Radio value="Kids">Kids</Radio>
            </VStack>
          </RadioGroup>
        </Box>
        <Divider />

        <Box pl={4}>
          <Text
            fontSize={"14px"}
            fontWeight={700}
            color="#282c3f"
            textAlign={"left"}
          >
            CATEGORIES
          </Text>
          <CheckboxGroup
            colorScheme={"pink"}
            size={"sm"}
            onChange={handleCategory}
            defaultValue={category}
          >
            <VStack alignItems={"flex-start"} mt={"1"} spacing={1}>
              <Checkbox value="TShirts" checked>
                TShirts
              </Checkbox>
              <Checkbox value="Jeans">Jeans</Checkbox>
              <Checkbox value="Kurta Sets">Kurta Sets</Checkbox>
              <Checkbox value="Trousers">Trousers</Checkbox>
            </VStack>
          </CheckboxGroup>
        </Box>
        <Divider />

        <Box pl={4}>
          <Text
            fontSize={"14px"}
            fontWeight={700}
            color="#282c3f"
            textAlign={"left"}
          >
            PRICE
          </Text>
          <CheckboxGroup
            size={"sm"}
            colorScheme={"pink"}
            defaultValue={price}
            onChange={handlePrice}
          >
            <VStack mt={1} spacing={1} alignItems={"flex-start"}>
              <Checkbox value={"99"}>Rs. 99 to Rs. 200</Checkbox>
              <Checkbox value={"200"}>Rs. 200 to Rs. 700</Checkbox>
              <Checkbox value={"700"}>Rs. 700 to Rs. 1000</Checkbox>
              <Checkbox value={"1000"}>Rs. 1000 Above</Checkbox>
            </VStack>
          </CheckboxGroup>
        </Box>
        <Divider />

        <Box pl={4}>
          <Text
            fontSize={"14px"}
            fontWeight={700}
            color="#282c3f"
            textAlign={"left"}
          >
            DISCOUNT
          </Text>
          <RadioGroup
            onChange={handleDiscount}
            value={discount}
            size={"sm"}
            colorScheme={"pink"}
          >
            <VStack mt={1} alignItems={"flex-start"} spacing={1}>
              <Radio value="10">10% and above</Radio>
              <Radio value="30">30% and above</Radio>
              <Radio value="50">50% and above</Radio>
              <Radio value="70">70% and above</Radio>
            </VStack>
          </RadioGroup>
        </Box>
      </VStack>
    </>
  );
};

export default Filter;
