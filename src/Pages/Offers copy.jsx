import {
  Badge,
  Box,
  Center,
  Container,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/offer/fetchoffers`
        );
        setOffers(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxW="container.lg">
        <Center mt="8">
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <VStack align="start" spacing="8">
              {offers.length > 0 ? (
                offers.map((offer) => (
                  <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="lg"
                  >
                    <Image src={offer.image} alt={offer.text} />

                    <Box p="6">
                      <Box d="flex" alignItems="baseline">
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          {offer.type}
                        </Badge>
                        <Text
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                        >
                          {offer.type === "percent"
                            ? `${offer.value}% Off`
                            : `$${offer.value} Off`}
                        </Text>
                      </Box>

                      <Text
                        mt="1"
                        fontWeight="bold"
                        fontSize="2xl"
                        lineHeight="tight"
                      >
                        {offer.text}
                      </Text>

                      <VStack align="start" mt="2">
                        <HStack>
                          <Text fontSize="sm" color="gray.500">
                            Offer Type:
                          </Text>
                          <Text fontSize="sm">{offer.type}</Text>
                        </HStack>
                        <HStack>
                          <Text fontSize="sm" color="gray.500">
                            Offer Value:
                          </Text>
                          <Text fontSize="sm">{offer.value}</Text>
                        </HStack>
                      </VStack>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box>No offers available</Box>
              )}
            </VStack>
          )}
        </Center>
      </Container>
    </>
  );
};

export default Offers;
