import { Box, Heading, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
import CarouselCom from "../Components/Carousel";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import LoadingPage from "./LoadingPage";
import Products from "../Components/Products";
import HomeProducts from "../Components/HomeProducts";
import { getAllProductsData } from "../Redux/AppReducer/Action";
import { useDispatch } from "react-redux";
// import { userloginStatus } from "../Redux/AuthReducer/Action";

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getAllProductsData());
  },[])
  const [imageData, setImageData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchImageData();
    fetchCategories();
    fetchOffers();
  }, []);

  const fetchImageData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/slider/getImageData`
      );
      setImageData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.error("Error fetching image data:", error);
    }
  };
  const fetchCategories = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/allcategories`
      ); // Adjust the endpoint accordingly
      setCategories(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsLoading(false);
    }
  };
  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/offer/fetchoffers`
      );
      setOffers(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching offers:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {/* home page Carousel */}

      {!isLoading ? (
        <>
          {" "}
          <CarouselCom data={imageData} />
          <Box
            m={{
              sm: "0px 25px 0px 25px",
              base: "0px 10px 0px 10px",
              md: "0px 55px 0px 55px",
              lg: "0px 55px 0px 55px",
            }}
          >
            {/* <Box paddingBottom={"40px"} textAlign={"center"}>
              <Heading
                bgGradient="linear(to-b,#fff,#00507a)"
                bgClip="text"
                as={"h2"}
                m={{
                  md: "30px 0px 13px 0px",
                  lg: "50px 0px 20px 0px",
                }}
                fontWeight={700}
                fontSize={{ md: "40px", base: "50px" }}
              >
                Get Ready for the Daily Deal Deligth!
              </Heading>
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite={false}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 768,
                    },
                    items: 5,
                    partialVisibilityGutter: 40,
                  },
                  mobile: {
                    breakpoint: {
                      max: 767,
                      min: 0,
                    },
                    items: 2,
                    partialVisibilityGutter: 30,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 768,
                    },
                    items: 5,
                    partialVisibilityGutter: 30,
                  },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                swipeable
              >
                {offers
                  .filter((item) => item.type === "deal")
                  .map((item, i) => (
                    <Box
                      position={"relative"}
                      fontWeight={"600"}
                      fontSize={{ md: "1.7vw", base: "5vw" }}
                      color={"#282c3f"}
                      onClick={() => navigate(`store?pricelte=${item.value}`)}
                      my={{ base: "10px", md: "10px", lg: "10px" }}
                      mx={{ base: "10px", md: "10px", lg: "20px" }}
                      mt={"10px"}
                    >
                      <Box
                        w={"full"}
                        // h={{ md: "17vw", base: "50vw" }}
                      >
                        <Image
                          // h={"100%"}
                          w={"full"}
                          boxSize={{ md: "19vw", base: "50vw" }}
                          objectFit={"cover"}
                          // objectFit={"fill"}
                          key={item.image + i}
                          src={
                            process.env.REACT_APP_BASE_API + `/${item.image}`
                          }
                        />
                      </Box>
                      <Box
                        border={{
                          lg: "7px solid #ff3e6c",
                          md: "7px solid #ff3e6c",
                          base: "5px solid #ff3e6c",
                        }}
                        borderTop={{ base: "0px", md: "0px", lg: "0px" }}
                        borderBottomRadius={{
                          lg: "15",
                          md: "10",
                          base: "10",
                        }}
                      >
                        <Text>Under</Text>
                        <Text>{item.value}</Text>
                      </Box>
                    </Box>
                  ))}
              </Carousel>
            </Box> */}

            {/* Shop By Category */}
            <Box textAlign={"center"} display={"grid"} paddingBottom={"40px"}>
              <Heading
                bgGradient="linear(to-b,#ff0051,#fac0d3)"
                bgClip="text"
                as={"h2"}
                fontWeight={700}
                fontSize={{ md: "40px", base: "50px" }}
                m={{
                  md: "30px 0px 13px 0px",
                  lg: "50px 0px 20px 0px",
                }}
              >
                Shop By Category
              </Heading>
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite={false}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 768,
                    },
                    items: 5,
                    partialVisibilityGutter: 40,
                  },
                  mobile: {
                    breakpoint: {
                      max: 767,
                      min: 0,
                    },
                    items: 2,
                    partialVisibilityGutter: 30,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 768,
                    },
                    items: 5,
                    partialVisibilityGutter: 30,
                  },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                // slidesToSlide={1}
                swipeable
              >
                {categories.map((item, i) => (
                  <Box
                    key={i}
                    position={"relative"}
                    fontWeight={"650"}
                    fontSize={{ md: "1.7vw", base: "5vw" }}
                    color={"#282c3f"}
                    // margin={"10px 10px 10px 10px"}
                    onClick={() => navigate(`store?category=${item.name}`)}
                    cursor="pointer"
                    my={{ base: "10px", md: "10px", lg: "10px" }}
                    mx={{ base: "10px", md: "10px", lg: "20px" }}
                  >
                    <Box
                      w={"full"}

                      // h={{ md: "17vw", base: "50vw" }}
                    >
                      <Image
                        // h={"100%"}
                        // w={"100%"}
                        // objectFit={"fill"}
                        w={"full"}
                        boxSize={{ md: "18vw", base: "50vw" }}
                        objectFit={"cover"}
                        key={item.image + i}
                        src={process.env.REACT_APP_BASE_API + `/${item.image}`}
                      />
                    </Box>
                    <Box
                      textAlign={"center"}
                      width={"80%"}
                      height={"20%"}
                      bg="#fff"
                      position={"absolute"}
                      top={"80%"}
                      left={"50%"}
                      transform={"translate(-50%, -50%)"}
                      color={"#282c3f"}
                      boxShadow="dark-lg"
                      rounded="md"
                    >
                      <Text margin={{ lg: "2", md: "1", base: "1.2vw" }}>
                        {item.name}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Carousel>
            </Box>

            {/* Discont and Flat Offers */}

            {/* <Box
              // display={{
              //   base: "grid",
              //   md: "grid",
              //   lg: "grid",
              // }}
              display={"grid"}
              textAlign={"center"}
              // paddingBottom={"40px"}
            >
              <Heading
                display={"block"}
                bgGradient="linear(to-b,#0700FF,#D5D4FF)"
                bgClip="text"
                as={"h2"}
                m={{
                  md: "30px 0px 13px 0px",
                  lg: "50px 0px 20px 0px",
                }}
                // m={"50px 0px 20px 0px"}
                fontWeight={700}
                fontSize={{ md: "40px", base: "50px" }}
              >
                Discount Offers
              </Heading>
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite={false}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 768,
                    },
                    items: 5,
                    // partialVisibilityGutter: 40,
                  },
                  mobile: {
                    breakpoint: {
                      max: 767,
                      min: 0,
                    },
                    items: 2,
                    // partialVisibilityGutter: 30,
                  },
                  tablet: {
                    breakpoint: {
                      max: 767,
                      min: 767,
                    },
                    items: 2,
                    // partialVisibilityGutter: 30,
                  },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                swipeable
              >
                {offers
                  .filter((item) => item.type === "percent")
                  .map((item, i) => (
                    <Box
                      position={"relative"}
                      fontWeight={"650"}
                      fontSize={{ md: "1.7vw", base: "5vw" }}
                      // fontSize={{ base: "13px", sm: "13px", md: "20px", lg: "20px" }}
                      // fontSize={"1.7vw"}
                      color={"#282c3f"}
                      onClick={() =>
                        navigate(
                          `store?offerType1=percent&offerValue=${item.value}`
                        )
                      }
                      cursor={"pointer"}
                      mx={{ lg: "20px", base: "10px" }}
                      mb={{ lg: "90px", base: "90px" }}
                      mt={"10px"}
                    >
                      <Box w={"full"}>
                        <Image
                          // h={"100%"}
                          // w={"100%"}
                          // objectFit={"fill"}
                          w={"full"}
                          boxSize={{ md: "19vw", base: "50vw" }}
                          objectFit={"cover"}
                          key={item.image + i}
                          src={
                            process.env.REACT_APP_BASE_API + `/${item.image}`
                          }
                        />
                      </Box>
                      <Box
                        textAlign={"center"}
                        justifyContent={"center"}
                        width={"80%"}
                        height={"25%"}
                        bg="#fff"
                        position={"absolute"}
                        // top={"100%"}
                        left={"50%"}
                        transform={"translate(-50%, -50%)"}
                        // fontSize="20px"
                        color={"#282c3f"}
                        boxShadow="dark-lg"
                        // p="1"
                        rounded="md"
                      >
                        <Text>{item.text}</Text>
                        <Text
                          fontWeight={"650"}
                          fontSize={{ md: "1vw", base: "3.7vw" }}
                        >
                          "OFF"
                        </Text>
                      </Box>
                    </Box>
                  ))}
              </Carousel>
            </Box> */}

            {/* <Box
              display={"grid"}
              textAlign={"center"}
              paddingBottom={"40px"}
            >
              <Heading
                display={"block"}
                bgGradient="linear(to-b,#F2840D,#ffdba3)"
                bgClip="text"
                as={"h2"}
                m={{
                  md: "30px 0px 13px 0px",
                  lg: "50px 0px 20px 0px",
                }}
                // m={"50px 0px 20px 0px"}
                fontWeight={700}
                fontSize={{ md: "40px", base: "50px" }}
              >
                Flat OFFERS
              </Heading>
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite={false}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 768,
                    },
                    items: 5,
                    // partialVisibilityGutter: 40,
                  },
                  mobile: {
                    breakpoint: {
                      max: 767,
                      min: 0,
                    },
                    items: 2,
                    // partialVisibilityGutter: 30,
                  },
                  tablet: {
                    breakpoint: {
                      max: 767,
                      min: 767,
                    },
                    items: 2,
                    // partialVisibilityGutter: 30,
                  },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                swipeable
              >
                {offers
                  .filter((item) => item.type === "flat")
                  .map((item, i) => (
                    <Box
                      position={"relative"}
                      fontSize={{ md: "1.7vw", base: "5vw" }}
                      fontWeight={"550"}
                      // fontSize={{ base: "13px", sm: "13px", md: "20px", lg: "20px" }}
                      // fontSize={"1.7vw"}
                      color={"#282c3f"}
                      onClick={() =>
                        navigate(
                          `store?offerType1=flat&offerValue=${item.value}`
                        )
                      }
                      cursor={"pointer"}
                      mx={{ lg: "20px", base: "10px" }}
                      mb={{ lg: "90px", base: "90px" }}
                      mt={"10px"}
                    >
                      <Box w={"full"}>
                        <Image
                          // h={"100%"}
                          // w={"100%"}
                          // objectFit={"fill"}
                          w={"full"}
                          boxSize={{ md: "18vw", base: "50vw" }}
                          objectFit={"cover"}
                          key={item.image + i}
                          src={
                            process.env.REACT_APP_BASE_API + `/${item.image}`
                          }
                        />
                      </Box>
                      <Box
                        textAlign={"center"}
                        justifyContent={"center"}
                        width={"80%"}
                        height={"25%"}
                        bg="#fff"
                        position={"absolute"}
                        // top={"100%"}
                        left={"50%"}
                        transform={"translate(-50%, -50%)"}
                        // fontWeight={"500"}
                        // fontSize="20px"
                        color={"#282c3f"}
                        boxShadow="dark-lg"
                        // p="1"
                        rounded="md"
                      >
                        <Text>{item.text}</Text>
                        <Text
                          fontWeight={"650"}
                          fontSize={{ md: "1vw", base: "3.7vw" }}
                        >
                          "OFF"
                        </Text>
                      </Box>
                    </Box>
                  ))}
              </Carousel>
            </Box> */}

            <HomeProducts />
          </Box>
          <Box mt={16}>
            <Footer />
          </Box>
        </>
      ) : (
        <Box height={"600px"}>
          <LoadingPage />
        </Box>
      )}
    </>
  );
};

export default Home;
