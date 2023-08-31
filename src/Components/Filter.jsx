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
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Filter = () => {
  const [categories, setCategories] = useState([]);
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

  const initPricel = searchParams.getAll("pricelte");
  const initPriceg = searchParams.getAll("pricegte");
  const [pricelte, setPricelte] = useState(initPricel || []);
  const [pricegte, setPricegte] = useState(initPriceg || []);

  // ............................
  const initDiscount = searchParams.getAll("discount");
  const [discount, setDiscount] = useState(initDiscount || "");
  // ............................

  const initOfferType1 = searchParams.get("offerType1");
  const [offerType1, setOfferT] = useState(initOfferType1 || "");

  const initOfferValue = searchParams.get("offerValue");
  const [offerValue, setOfferV] = useState(initOfferValue || "");
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
    setPricegte(el);
    // setPricegte();
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
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      // setisLoading(true);
      const response = await axios.get(
        "http://localhost:5000/admin//allcategories"
      ); // Adjust the endpoint accordingly
      setCategories(response.data.data);
      // setisLoading(false);
    } catch (error) {
      console.error("Error fetching Categories:", error);
      // setisLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
    const params = {};
    type && (params.type = type);
    category && (params.category = category);
    brand && (params.brand = brand);
    pricelte && (params.pricelte = pricelte);
    pricegte && (params.pricegte = pricegte);
    discount && (params.discount = discount);
    offerType1 && (params.offerType1 = offerType1);
    offerValue && (params.offerValue = offerValue);
    q && (params.q = q);
    setSearchParams(params);
  }, [
    type,
    setType,
    category,
    setCategory,
    brand,
    setBrand,
    pricelte,
    pricegte,
    setPricelte,
    setPricegte,
    discount,
    setDiscount,
    q,
    setQuery,
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    setCategory(selectedValue);
    console.log(category);
    // onSelectCategory(selectedValue);
  };
  console.log(categories);
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
          {/* <CheckboxGroup
            colorScheme={"pink"}
            size={"sm"}
            onChange={handleCategory}
            defaultValue={category}
          > */}
          <VStack alignItems={"flex-start"} mt={"1"} spacing={1}>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">
                <Text>Select a category</Text>
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {/* {categories.map((category, index) => {
                // <Checkbox value="Jeans">Jeans</Checkbox>;

                // <Checkbox value={category}>
                  // {category.name}
                // </Checkbox>;
              })} */}
            {/* <Checkbox value="TShirts" checked>
                TShirts
              </Checkbox>
              <Checkbox value="Jeans">Jeans</Checkbox>
              <Checkbox value="Kurta Sets">Kurta Sets</Checkbox>
              <Checkbox value="Trousers">Trousers</Checkbox> */}
          </VStack>
          {/* </CheckboxGroup> */}
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
            defaultValue={pricelte}
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
          <CheckboxGroup
            onChange={handleDiscount}
            value={discount}
            size={"sm"}
            colorScheme={"pink"}
          >
            <VStack mt={1} alignItems={"flex-start"} spacing={1}>
              <Checkbox value="10">10% and above</Checkbox>
              <Checkbox value="30">30% and above</Checkbox>
              <Checkbox value="50">50% and above</Checkbox>
              <Checkbox value="70">70% and above</Checkbox>
            </VStack>
          </CheckboxGroup>
        </Box>
      </VStack>
    </>
  );
};

export default Filter;
