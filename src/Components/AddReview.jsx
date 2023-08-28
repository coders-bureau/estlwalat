import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";

const AddReview = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleImageChange = (event) => {
    // Handle image upload here
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = () => {
    // Perform validation and submit the review data
    const reviewData = {
      rating,
      content,
      image,
    };

    onSubmit(reviewData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Rating input */}
          {/* Content input */}
          {/* Image upload input */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddReview;
