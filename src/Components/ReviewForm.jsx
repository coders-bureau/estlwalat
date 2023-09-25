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

import React, { useEffect, useState } from "react";
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
  Image,
} from "@chakra-ui/react";
import { StarIcon, AddIcon } from "@chakra-ui/icons";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingPage from "../Pages/LoadingPage";

const ReviewForm = () => {
  const { id } = useParams();
  const [userReview, setUserReview] = useState("");
  // const [rating, setRating] = useState(userReview ? userReview.rating : "");
  // const [content, setContent] = useState(userReview ? userReview.content : "");
  const [rating, setRating] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  console.log(userReview, rating, content, image);

  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_API}/user/reviews/${id}/userreview`)
      .then((response) => {
        setisLoading(false);
        console.log(response);
        const { data } = response.data;

        if (data[0]) {
          setUserReview(data[0]);
          setRating(userReview.rating);
          setContent(userReview.content);
          // setImage();
        } else {
          setUserReview(null);
        }
        // setRating(data.data)
      })
      .catch((error) => {
        setisLoading(false);
        console.error("Error fetching reviews:", error);
      });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle the selected image here
      // You can upload the image to your server or display a preview
      console.log("Selected Image:", file);
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (userReview) {
        const formData = new FormData();
        // formData.append("productId", id);
        formData.append("rating", rating ? rating : userReview.rating);
        formData.append("content", content ? content : userReview.content);
        if (image) {
          formData.append("image", image);
        }
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_API}/user/review/${userReview._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          setSuccess("Review Updated successfully!");
          // setRating("");
          // setContent("");
          // setImage("");
        } else {
          setError("Failed to add review.");
        }
        setisLoading(false);
      } else {
        const formData = new FormData();
        formData.append("productId", id);
        formData.append("rating", rating);
        formData.append("content", content);
        if (image) {
          formData.append("image", image);
        }
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_API}/user/addreview`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          setSuccess("Review added successfully!");
          setRating("");
          setContent("");
          setImage("");
        } else {
          setError("Failed to add review.");
        }
        setisLoading(false);
      }
    } catch (error) {
      setisLoading(false);
      console.error(error);
      setError("An error occurred while adding the review.");
    }
  };

  return (
    <>
      <Box>
        <Navbar />
        {!isLoading ? (
          <Grid
            gridTemplateColumns={{ lg: "20% 80%", md: "20% 80%", base: "100%" }}
            spacing={1}
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
              marginTop={"20px"}
              marginRight={"20px"}
              marginLeft={"10px"}
              as="form"
              onSubmit={handleSubmit}
            >
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
              <HStack p={3}>
                <Text fontWeight={500}>Rate: </Text>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    as={StarIcon}
                    boxSize={6}
                    color={
                      star <=
                      (rating ? rating : userReview ? userReview.rating : "")
                        ? "teal.500"
                        : "gray.200"
                    }
                    cursor="pointer"
                    onClick={() => handleRatingClick(star)}
                  />
                ))}
                <Text fontSize="lg">
                  {rating ? rating : userReview ? userReview.rating : ""}
                </Text>
              </HStack>
              <FormControl p={3} mt={4}>
                <FormLabel>Review</FormLabel>
                <Textarea
                  value={
                    content ? content : userReview ? userReview.content : ""
                  }
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl p={3} mt={4}>
                <FormLabel>Upload Image</FormLabel>
                <Input
                  type="file"
                  name="image"
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
                {userReview && (
                  <Image
                   
                    boxSize={"100px"}
                    objectFit="contain"
                    // w={"full"}
                    src={process.env.REACT_APP_BASE_API + "/" + userReview.img}
                    alt="Selected"
                  />
                )}
                {image && (
                  <>
                    <Text>Updated Image ⬇</Text>
                    <Image
                      boxSize={"100px"}
                      objectFit="contain"
                      // w={"full"}
                      src={URL.createObjectURL(image)}
                      alt="Selected"
                    />
                  </>
                )}
              </FormControl>
              <Button m={4} type="submit" bgColor={"#ff3e6c"} color={"#ffffff"}>
                {userReview ? "Edit Review" : "Add Review"}
              </Button>
            </Box>
          </Grid>
        ) : (
          <LoadingPage />
        )}
      </Box>
    </>
  );
};

export default ReviewForm;
