// // src/components/ReviewForm.js
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
// } from "@chakra-ui/react";
// import Navbar from "./Navbar";

// const ReviewForm = ({ product, userReview, onSubmit }) => {
//   const [rating, setRating] = useState(userReview ? userReview.rating : "");
//   const [content, setContent] = useState(userReview ? userReview.content : "");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Prepare review data to submit
//     const reviewData = {
//       productId: product._id, // Assuming you have a product object with _id
//       rating,
//       content,
//     };
//     onSubmit(reviewData);
//   };

//   return (
//     <>
//     <Navbar/>
//       <Box m={"50px 20px"}>
//         <form onSubmit={handleSubmit}>
//           <FormControl>
//             <FormLabel>Rating (1-5)</FormLabel>
//             <Input
//               type="number"
//               min="1"
//               max="5"
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               required
//             />
//           </FormControl>
//           <FormControl mt={4}>
//             <FormLabel>Review</FormLabel>
//             <Textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               required
//             />
//           </FormControl>
//           <Button type="submit" mt={4} colorScheme="teal">
//             {userReview ? "Edit Review" : "Add Review"}
//           </Button>
//         </form>
//       </Box>
//     </>
//   );
// };

// export default ReviewForm;

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Icon,
  HStack,
  Text,
  Grid,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { StarIcon, AddIcon } from "@chakra-ui/icons";
import Navbar from "./Navbar";
import axios from "axios";

const ReviewForm = ({ product, userReview, onSubmit }) => {
  const [rating, setRating] = useState(userReview ? userReview.rating : "");
  const [content, setContent] = useState(userReview ? userReview.content : "");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle the selected image here
      // You can upload the image to your server or display a preview
      console.log("Selected Image:", file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const reviewData = {
    //   productId: product._id,
    //   rating,
    //   content,
    //   image,
    // };
    // onSubmit(reviewData);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("productId", product.productId);
      formData.append("rating", rating);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post("/api/add-review", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setSuccess("Review added successfully!");
        setRating("");
        setContent("");
        setImage(null);
      } else {
        setError("Failed to add review.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while adding the review.");
    }
  };

  return (
    <>
      <Box>
        <Navbar />
        <Grid
          // marginTop={"40px"}
          // marginRight={"20px"}

          gridTemplateColumns={{ lg: "20% 80%", md: "20% 80%", base: "100%" }}
          spacing={1}
          // w={"98%"}
          m={"10px auto"}
        >
          <Box textAlign={"left"} marginTop={"20px"} marginLeft={"20px"}>
            <Text fontWeight={500}>What makes a good review</Text>
            <Text>
              Your review should be about your experience with the product.
            </Text>
            <br />
            <Text>
              Your valuable feedback will help fellow shoppers decide!{" "}
            </Text>
          </Box>
          <Box
            boxShadow={
              "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
            }
            textAlign={"left"}
            // boxShadow={"unset"}
            marginTop={"20px"}
            // marginLeft={{ lg: "250px", md: "250px", base: "20px" }}
            marginRight={"20px"}
            marginLeft={"10px"}
            as="form"
            onSubmit={handleSubmit}
          >
            <HStack p={3}>
              <Text fontWeight={500}>Rate: </Text>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  as={StarIcon}
                  boxSize={6}
                  color={star <= rating ? "teal.500" : "gray.200"}
                  cursor="pointer"
                  onClick={() => handleRatingClick(star)}
                />
              ))}
              <Text fontSize="lg">{rating}</Text>
            </HStack>
            <FormControl p={3} mt={4}>
              <FormLabel>Review</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </FormControl>
            <FormControl p={3} mt={4}>
              <FormLabel>Upload Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="image-input"
                display="none"
              />
              <label htmlFor="image-input">
                <Icon
                  as={AddIcon}
                  boxSize={8}
                  color={"#ff3e6c"}
                  // color={"#ffffff"}
                  cursor="pointer"
                />
              </label>
            </FormControl>

            <Button m={4} type="submit" bgColor={"#ff3e6c"} color={"#ffffff"}>
              {userReview ? "Edit Review" : "Add Review"}
            </Button>
            {error && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                {error}
              </Alert>
            )}
            {success && (
              <Alert status="success" mb={4}>
                <AlertIcon />
                {success}
              </Alert>
            )}
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default ReviewForm;
