import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Image,
} from "@chakra-ui/react";

const Review = ({ review }) => {
  const review1 = review ? review : [];
  const [showDrawer, setShowDrawer] = useState(false);
  // console.log(review.slice(0,3));
  // Sample review data, you can replace this with actual review data
  // const reviews = [
  //   { id: 1, title: "Review 1", content: "Content of review 1" },
  //   { id: 2, title: "Review 2", content: "Content of review 2" },
  //   { id: 3, title: "Review 3", content: "Content of review 3" },
  //   { id: 4, title: "Review 4", content: "Content of review 4" },
  //   { id: 5, title: "Review 5", content: "Content of review 5" },
  //   { id: 6, title: "Review 6", content: "Content of review 6" },
  //   { id: 7, title: "Review 7", content: "Content of review 7" },
  //   { id: 8, title: "Review 8", content: "Content of review 8" },
  //   { id: 9, title: "Review 9", content: "Content of review 9" },
  //   { id: 10, title: "Review 10", content: "Content of review 10" },
  //   { id: 11, title: "Review 11", content: "Content of review 11" },
  //   { id: 12, title: "Review 12", content: "Content of review 12" },
  //   { id: 13, title: "Review 13", content: "Content of review 13" },
  //   { id: 14, title: "Review 14", content: "Content of review 14" },
  //   { id: 15, title: "Review 15", content: "Content of review 15" },
  //   { id: 16, title: "Review 16", content: "Content of review 16" },
  //   { id: 17, title: "Review 17", content: "Content of review 17" },
  //   { id: 18, title: "Review 18", content: "Content of review 18" },
  //   { id: 19, title: "Review 19", content: "Content of review 19" },
  //   { id: 20, title: "Review 20", content: "Content of review 20" },
  //   { id: 21, title: "Review 21", content: "Content of review 21" },
  //   { id: 22, title: "Review 22", content: "Content of review 22" },
  //   { id: 23, title: "Review 23", content: "Content of review 23" },
  //   { id: 24, title: "Review 24", content: "Content of review 24" },
  //   { id: 25, title: "Review 25", content: "Content of review 25" },
  //   { id: 26, title: "Review 26", content: "Content of review 26" },
  //   { id: 27, title: "Review 27", content: "Content of review 27" },
  //   { id: 28, title: "Review 28", content: "Content of review 28" },
  //   { id: 29, title: "Review 29", content: "Content of review 29" },
  //   { id: 30, title: "Review 30", content: "Content of review 30" },
  //   { id: 31, title: "Review 31", content: "Content of review 31" },
  //   { id: 32, title: "Review 32", content: "Content of review 32" },
  //   { id: 33, title: "Review 33", content: "Content of review 33" },
  //   { id: 34, title: "Review 34", content: "Content of review 34" },
  //   { id: 35, title: "Review 35", content: "Content of review 35" },
  //   { id: 36, title: "Review 36", content: "Content of review 36" },
  //   { id: 37, title: "Review 37", content: "Content of review 37" },
  //   { id: 38, title: "Review 38", content: "Content of review 38" },
  //   { id: 39, title: "Review 39", content: "Content of review 39" },
  //   { id: 40, title: "Review 40", content: "Content of review 40" },
  // ];
  // const reviews = review;
  // const lenload = review1.length;

  const [loadedReviews, setLoadedReviews] = useState(review1);
  console.log(loadedReviews);
  const initialReviewsToShow = 10;
  const [numReviewsToShow, setNumReviewsToShow] =
    useState(initialReviewsToShow);

  const firstReviews = review1.slice(0, 3);

  const handleViewMore = () => {
    setLoadedReviews(review1.slice(0, 10));
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  const loadMoreReviews = () => {
    const nextReviewsToShow = numReviewsToShow + initialReviewsToShow;
    setNumReviewsToShow(nextReviewsToShow);
    setLoadedReviews(review1.slice(0, nextReviewsToShow));
  };

  return (
    <Box w="full" p={4} borderWidth="1px" borderRadius="md">
      <Heading fontSize="xl" mb={2}>
        Customer Reviews
      </Heading>
      <VStack align="flex-start" spacing={4}>
        {firstReviews.map((review) => (
          <Box key={review.id}>
            <Text fontWeight={500} fontSize="lg">{review.name}</Text>
            <Text>{review.content}</Text>
            <Image src={review.image} w="10%" />
            <br />
            <hr />
          </Box>
        ))}
        {review1.length > 3 && (
          <Button
            variant="link"
            color="#ff3e6c"
            onClick={handleViewMore}
            colorScheme="blue"
          >
            View More Reviews
          </Button>
        )}
      </VStack>

      {/* Drawer for all reviews */}
      <Drawer isOpen={showDrawer} onClose={handleCloseDrawer} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Customer Reviews</DrawerHeader>
          <DrawerBody>
            <VStack align="flex-start" spacing={4}>
              {loadedReviews.map((review) => (
                <Box key={review.id}>
                  <Text fontWeight={500} fontSize="lg">{review.name}</Text>
                  <Text>{review.content}</Text>
                  <Image src={review.image} w="10%" />
                  <br />
                  <hr />
                </Box>
              ))}
              {numReviewsToShow < review1.length && (
                <Button
                  w="full"
                  onClick={loadMoreReviews}
                  borderTopWidth="1px"
                  py={3}
                  color="#ff3e6c"
                  bgColor="#ffffff"
                >
                  View More Reviews
                </Button>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* */}

      {/* Review Section */}
      {/* <Box w="full" p="50px 30px">
        <Text textAlign="left" my={8} fontWeight="bold" color="#282c3f">
          REVIEWS
        </Text>

        <VStack align="flex-start" w="full" spacing={6}>
          {review.slice(0, visibleReviews).map((review) => (
            <Box key={review.id} w="full">
              <Heading fontWeight="600" as="h2" color="#282c3f" fontSize="20px">
                {review.title}
              </Heading>
              <Text>{review.content}</Text>
            </Box>
          ))}

          {review.length > visibleReviews && (
            <Button variant="link" onClick={handleViewMore} color="#ff3e6c">
              View More Reviews 
            </Button>
          )}
        </VStack>
      </Box> */}

      {/* Review Drawer */}
      {/* <Drawer isOpen={showDrawer} placement="right" onClose={handleCloseDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>More Reviews</DrawerHeader>

          <DrawerBody>
            <VStack align="flex-start" w="full" spacing={6}>
              {review.slice(visibleReviews).map((review) => (
                <Box key={review.id} w="full">
                  <Heading fontWeight="600" as="h2" color="#282c3f" fontSize="20px">
                    {review.title}
                  </Heading>
                  <Text>{review.content}</Text>
                </Box>
              ))}
            </VStack>
          </DrawerBody>

          {review.length > visibleReviews && (
            <Button
              w="full"
              borderTop="1px solid #ccc"
              onClick={handleLoadMoreReviews}
              color="#ff3e6c"
            >
              Load More
            </Button>
          )}
        </DrawerContent>
      </Drawer> */}
    </Box>
  );
};

export default Review;
