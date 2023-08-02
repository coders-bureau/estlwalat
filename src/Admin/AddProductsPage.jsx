// //

// // src/components/AddProductPage.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const AddProductPage = () => {
//   const [productData, setProductData] = useState({
//     title: '',
//     brand: '',
//     rating: 0,
//     ratingT: 0,
//     category: '',
//     type: '',
//     price: 0,
//     MRP: 0,
//     discount: 0,
//     size: [],
//     img: '', // Main image link
//     images: [], // Array of additional image links
//     reviews: [],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleAddImage = () => {
//     // Add a new empty string to the images array when plus button is clicked
//     setProductData((prevData) => ({
//       ...prevData,
//       images: [...prevData.images, ''],
//     }));
//   };

//   const handleImageChange = (index, value) => {
//     // Update the image link at the specified index in the images array
//     setProductData((prevData) => {
//       const updatedImages = [...prevData.images];
//       updatedImages[index] = value;
//       return {
//         ...prevData,
//         images: updatedImages,
//       };
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Send the product data to the backend API
//     axios.post('/api/products', productData)
//       .then((response) => {
//         console.log('Product added successfully:', response.data);
//         // Clear the form after successful submission
//         setProductData({
//           title: '',
//           brand: '',
//           rating: 0,
//           ratingT: 0,
//           category: '',
//           type: '',
//           price: 0,
//           MRP: 0,
//           discount: 0,
//           size: [],
//           img: '',
//           images: [],
//           reviews: [],
//         });
//       })
//       .catch((error) => {
//         console.error('Error adding product:', error);
//       });
//   };

//   return (
//     <div>
//       <h1>Add Product</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Main Image Link:</label>
//           <input type="text" name="img" value={productData.img} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Additional Images:</label>
//           {productData.images.map((image, index) => (
//             <div key={index}>
//               <input
//                 type="text"
//                 value={image}
//                 onChange={(e) => handleImageChange(index, e.target.value)}
//               />
//             </div>
//           ))}
//           <button type="button" onClick={handleAddImage}>+</button>
//         </div>
//         {/* Add form fields for each product property */}
//         <input type="text" name="title" value={productData.title} onChange={handleChange} />
//         <input type="text" name="brand" value={productData.brand} onChange={handleChange} />
//         {/* Add other fields */}
//         <button type="submit">Add Product</button>
//       </form>
//     </div>
//   );
// };

// export default AddProductPage;

// src/components/AddProductPage.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Spacer,
  Checkbox,
  HStack,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { CloseIcon } from "@chakra-ui/icons";

const AddProductPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [productData, setProductData] = useState({
    title: "",
    brand: "",
    rating: 0,
    ratingT: 0,
    category: "",
    type: "Men",
    price: 0,
    MRP: 0,
    discount: 0,
    size: [],
    currentSize: "",
    img: "", // Main image link
    images: [], // Array of additional image links
    reviews: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(productData);
  };

  const handleAddImage = () => {
    // Add a new empty string to the images array when plus button is clicked
    setProductData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ""],
    }));
  };

  const handleRemoveImage = (index) => {
    setProductData((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages.splice(index, 1);
      return {
        ...prevData,
        images: updatedImages,
      };
    });
  };

  const handleImageChange = (index, value) => {
    // Update the image link at the specified index in the images array
    setProductData((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages[index] = value;
      return {
        ...prevData,
        images: updatedImages,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the product data to the backend API
    axios
      .post("http://localhost:5000/addproduct", productData)
      .then((response) => {
        console.log("Product added successfully:", response.data);
        toast({
          title: "Product successfully added in Databse",
          variant: "top-accent",
          isClosable: true,
          position: "top-right",
          status: "success",
          duration: 2500,
        });
        // Clear the form after successful submission
        setProductData({
          title: "",
          brand: "",
          rating: 0,
          ratingT: 0,
          category: "",
          type: "",
          price: 0,
          MRP: 0,
          discount: 0,
          size: [],
          img: "",
          images: [],
          reviews: [],
        });
        navigate("/product-list");
        
      })
      .catch((error) => {
        toast({
          title: "Error adding product",
          variant: "top-accent",
          isClosable: true,
          position: "top-right",
          status: "error",
          duration: 2500,
        });
        console.error("Error adding product:", error);
      });
  };

  const handleSizeChange = (e) => {
    const sizeValue = e.target.value;
    const checked = e.target.checked;
    
    if (checked) {
      // If the size checkbox is checked, add it to the size array
      setProductData({
        ...productData,
        size: [...productData.size, sizeValue],
      });
    } else {
      // If the size checkbox is unchecked, remove it from the size array
      const updatedSizes = productData.size.filter(
        (size) => size !== sizeValue
      );
      setProductData({ ...productData, size: updatedSizes });
    }
  };

  return (
    <Box width={"100%"}>
      <AdminNavbar />
      <VStack spacing={4} align="center">
        <Box marginTop={"100px"} marginLeft={{lg:"250px",md:"250px",base:"10px"}} as="form" onSubmit={handleSubmit} w="70%">
          <VStack spacing={4}>
            {/* Add form fields for each product property */}
            <FormControl isRequired>
              <FormLabel>Title:</FormLabel>
              <Input
                type="text"
                name="title"
                value={productData.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Brand:</FormLabel>
              <Input
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Type:</FormLabel>
              <Select
                name="type"
                value={productData.type}
                onChange={handleChange}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Category:</FormLabel>
              <Input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Price:</FormLabel>
              <Input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>MRP:</FormLabel>
              <Input
                type="number"
                name="MRP"
                value={productData.MRP}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Discount:</FormLabel>
              <Input
                type="number"
                name="discount"
                value={productData.discount}
                onChange={handleChange}
              />
            </FormControl>
            {/* Add other fields */}
            <FormControl isRequired>
              <FormLabel>Main Image Link:</FormLabel>
              <Input
                type="text"
                name="img"
                value={productData.img}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Additional Images:</FormLabel>
              {productData.images.map((image, index) => (
                 <HStack key={index} mb={2}>
                <Input
                  key={index}
                  type="text"
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
              ))}
              <Button type="button" onClick={handleAddImage}>
                +
              </Button>
            </FormControl>{" "}
            {/* ... (rest of the code remains the same) */}
            <FormControl>
              <FormLabel>Standard Sizes:</FormLabel>
              <HStack>
                <Checkbox value="S" onChange={handleSizeChange}>
                  S
                </Checkbox>
                <Checkbox value="M" onChange={handleSizeChange}>
                  M
                </Checkbox>
                <Checkbox value="L" onChange={handleSizeChange}>
                  L
                </Checkbox>
                <Checkbox value="XL" onChange={handleSizeChange}>
                  XL
                </Checkbox>
                <Checkbox value="XXL" onChange={handleSizeChange}>
                  XXL
                </Checkbox>
                <Checkbox value="3XL" onChange={handleSizeChange}>
                  3XL
                </Checkbox>
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Waist Sizes:</FormLabel>
              <HStack>
                <Checkbox value="28" onChange={handleSizeChange}>
                  28
                </Checkbox>
                <Checkbox value="30" onChange={handleSizeChange}>
                  30
                </Checkbox>
                <Checkbox value="32" onChange={handleSizeChange}>
                  32
                </Checkbox>
                <Checkbox value="34" onChange={handleSizeChange}>
                  34
                </Checkbox>
                <Checkbox value="36" onChange={handleSizeChange}>
                  36
                </Checkbox>
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Age Sizes:</FormLabel>
              <HStack>
                <Checkbox value="6-12M" onChange={handleSizeChange}>
                  6-12M
                </Checkbox>
                <Checkbox value="1-1.5Y" onChange={handleSizeChange}>
                  1-1.5Y
                </Checkbox>
                <Checkbox value="1.5-2Y" onChange={handleSizeChange}>
                  1.5-2Y
                </Checkbox>
                <Checkbox value="2-3Y" onChange={handleSizeChange}>
                  2-3Y
                </Checkbox>
                <Checkbox value="4-6Y" onChange={handleSizeChange}>
                  4-6Y
                </Checkbox>
                <Checkbox value="6-8Y" onChange={handleSizeChange}>
                  6-8Y
                </Checkbox>
                <Checkbox value="9-11Y" onChange={handleSizeChange}>
                  9-11Y
                </Checkbox>
                <Checkbox value="12-14Y" onChange={handleSizeChange}>
                  12-14Y
                </Checkbox>
                <Checkbox value="15-17Y" onChange={handleSizeChange}>
                  15-17Y
                </Checkbox>
                {/* Add the rest of the age size checkboxes */}
              </HStack>
            </FormControl>
            <Spacer />
            <Button type="submit">Add Product</Button>
            <Spacer />

          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default AddProductPage;
