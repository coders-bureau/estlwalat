import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // If not already imported, install axios: npm install axios
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Checkbox,
  HStack,
  useToast,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
import { CloseIcon } from "@chakra-ui/icons";

const EditProduct = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    brand: "",
    category: "",
    type: "",
    price: 0,
    MRP: 0,
    discount: 0,
    size: [],
    img: "",
    images: [],
  });

  useEffect(() => {
    // Fetch the product data from the backend using the product ID
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        // Handle error here, e.g., show an error message to the user
      }
    };

    fetchProduct();
  }, [id]);

  // Handle input changes for the editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddImage = () => {
    // Add a new empty string to the images array when plus button is clicked
    setProduct((prevData) => ({
      ...prevData,
      images: [...prevData.images, ""],
    }));
  };

  const handleImageChange = (index, value) => {
    // Update the image link at the specified index in the images array
    setProduct((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages[index] = value;
      return {
        ...prevData,
        images: updatedImages,
      };
    });
  };

  const handleRemoveImage = (index) => {
    setProduct((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages.splice(index, 1);
      return {
        ...prevData,
        images: updatedImages,
      };
    });
  };

  const handleSizeCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProduct((prevProduct) => {
      if (checked) {
        return {
          ...prevProduct,
          size: [...prevProduct.size, name],
        };
      } else {
        return {
          ...prevProduct,
          size: prevProduct.size.filter((size) => size !== name),
        };
      }
    });
  };

  // Handle the product update when the "Update" button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/products/${id}`,
        product
      );
      toast({
        title: "Product successfully updated in Databse",
        variant: "top-accent",
        isClosable: true,
        position: "top-right",
        status: "success",
        duration: 2500,
      });
      // Assuming the backend returns a success message on successful update
      console.log(response.data.message);
      navigate("/product-list");

      // Optionally, you can navigate back to the products table page or show a success message to the user.
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error here, e.g., show an error message to the user
    }
  };

  return (
    <Box width={"100%"}>
      <AdminNavbar />
      <VStack spacing={4} align="center">
        <Box
          marginTop={{ lg: "60px", md: "80px", base: "80px" }}
          marginLeft={{ lg: "250px", md: "250px", base: "0px" }}
          as="form"
          onSubmit={handleSubmit}
          w="70%"
        >
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Brand</FormLabel>
            <Input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Category</FormLabel>
            <Input
              type="text"
              name="category"
              value={product.category}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Type</FormLabel>
            <Select
              name="type"
              value={product.type}
              onChange={handleInputChange}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>MRP</FormLabel>
            <Input
              type="number"
              name="MRP"
              value={product.MRP}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Discount</FormLabel>
            <Input
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Standard Sizes:</FormLabel>
            <Checkbox
              name="S"
              isChecked={product.size.includes("S")}
              onChange={handleSizeCheckboxChange}
              mr={2}
            >
              S
            </Checkbox>
            <Checkbox
              name="M"
              isChecked={product.size.includes("M")}
              onChange={handleSizeCheckboxChange}
              mr={2}
            >
              M
            </Checkbox>
            <Checkbox
              name="L"
              isChecked={product.size.includes("L")}
              onChange={handleSizeCheckboxChange}
              mr={2}
            >
              L
            </Checkbox>
            <Checkbox
              name="XL"
              isChecked={product.size.includes("XL")}
              onChange={handleSizeCheckboxChange}
              mr={2}
            >
              XL
            </Checkbox>
            <Checkbox
              name="XXL"
              isChecked={product.size.includes("XXL")}
              onChange={handleSizeCheckboxChange}
              mr={2}
            >
              XXL
            </Checkbox>
            <Checkbox
              name="3XL"
              isChecked={product.size.includes("3XL")}
              onChange={handleSizeCheckboxChange}
              mr={2}
            >
              3XL
            </Checkbox>
            {/* Add other size options here */}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Waist Sizes:</FormLabel>
            <Checkbox
              name="28"
              isChecked={product.size.includes("28")}
              onChange={handleSizeCheckboxChange}
              mr={2}
            >
              28
            </Checkbox>
            <Checkbox
              name="30"
              isChecked={product.size.includes("30")}
              onChange={handleSizeCheckboxChange}
              mr={2}
            >
              30
            </Checkbox>
            <Checkbox
              name="32"
              isChecked={product.size.includes("32")}
              onChange={handleSizeCheckboxChange}
              mr={2}
            >
              32
            </Checkbox>
            <Checkbox
              name="34"
              isChecked={product.size.includes("34")}
              onChange={handleSizeCheckboxChange}
              mr={2}
            >
              34
            </Checkbox>
            <Checkbox
              name="36"
              isChecked={product.size.includes("36")}
              onChange={handleSizeCheckboxChange}
              mr={2}
            >
              36
            </Checkbox>
            <Checkbox
              name="38"
              isChecked={product.size.includes("38")}
              onChange={handleSizeCheckboxChange}
              mr={2}
            >
              38
            </Checkbox>
            {/* Add other size options here */}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Age Sizes:</FormLabel>
            <Checkbox
              name="6-12M"
              isChecked={product.size.includes("6-12M")}
              mr={2}
              onChange={handleSizeCheckboxChange}
            >
              6-12M
            </Checkbox>
            <Checkbox
              name="1-1.5Y"
              isChecked={product.size.includes("1-1.5Y")}
              mr={2}
              onChange={handleSizeCheckboxChange}
            >
              1-1.5Y
            </Checkbox>
            <Checkbox
              name="1.5-2Y"
              isChecked={product.size.includes("1.5-2Y")}
              mr={2}
              onChange={handleSizeCheckboxChange}
            >
              1.5-2Y
            </Checkbox>
            <Checkbox
              name="2-3Y"
              isChecked={product.size.includes("2-3Y")}
              mr={2}
              onChange={handleSizeCheckboxChange}
            >
              2-3Y
            </Checkbox>
            <Checkbox
              name="4-6Y"
              isChecked={product.size.includes("4-6Y")}
              mr={2}
              onChange={handleSizeCheckboxChange}
            >
              4-6Y
            </Checkbox>
            <Checkbox
              name="6-8Y"
              isChecked={product.size.includes("6-8Y")}
              mr={2}
              onChange={handleSizeCheckboxChange}
            >
              6-8Y
            </Checkbox>
            <Checkbox
              name="9-11Y"
              isChecked={product.size.includes("9-11Y")}
              mr={2}
              onChange={handleSizeCheckboxChange}
            >
              9-11Y
            </Checkbox>
            <Checkbox
              name="12-14Y"
              isChecked={product.size.includes("12-14Y")}
              mr={2}
              onChange={handleSizeCheckboxChange}
            >
              12-14Y
            </Checkbox>
            <Checkbox
              name="15-17Y"
              isChecked={product.size.includes("15-17Y")}
              mr={2}
              onChange={handleSizeCheckboxChange}
            >
              15-17Y
            </Checkbox>
            {/* Add other size options here */}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="text"
              name="img"
              value={product.img}
              onChange={handleImageChange}
              required
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Additional Images URLs</FormLabel>

            {product.images?.map((image, index) => {
              return(
                <HStack key={index} mb={2}>

                <Input
                key={index}
                type="text"
                //   name="images"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                
                />
                <IconButton
                icon={<CloseIcon />}
                colorScheme="red"
                size="sm"
                onClick={() => handleRemoveImage(index)}
              />
                </HStack>
              )
            })}
             <Button type="button" onClick={handleAddImage}>
                +
              </Button>
          </FormControl>

          <HStack mt={8}>
            <Button type="submit" colorScheme="blue">
              Update Product
            </Button>
            <Button colorScheme="gray">Cancel</Button>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default EditProduct;
