// Coupons.js

import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import {
  Container,
  VStack,
  Text,
  Box,
  Badge,
  Spinner,
  Center,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import Footer from "../Components/Footer";

const Offers = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/offer/fetchcoupons`
        );
        setCoupons(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <div style={{ flex: 1 , marginBottom:"40px" }}>
          <Navbar />
          <Container maxW="container.lg" maxH={"100vw"}>
            <Center mt="8">
              {loading ? (
                <Spinner size="xl" />
              ) : (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing="8"
                  align="start"
                >
                  {coupons.length > 0 ? (
                    coupons.map((coupon) => (
                      <Box
                        key={coupon._id}
                        p="6"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="md"
                      >
                        <Text fontSize="xl" fontWeight="bold">
                          {coupon.text}
                        </Text>
                        <Text my={"5px"} fontSize="md">
                          <Badge colorScheme="teal">
                            {coupon.value}{" "}
                            {coupon.type === "percent"
                              ? "percent off"
                              : "percent off"}
                          </Badge>
                        </Text>
                        <Text fontSize="md">
                          Minimum Applicable Price:
                          <b> {coupon.minapplicableprice}</b>
                        </Text>
                      </Box>
                    ))
                  ) : (
                    <Box>No coupons available</Box>
                  )}
                </SimpleGrid>
              )}
            </Center>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Offers;
