import React, { useEffect, useState } from "react";
import CarouselCom from "../Components/Carousel";
import { Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import Footer from "../Components/Footer";
import Slide from "../Components/Slide";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import LoadingPage from "./LoadingPage";

const homePageCarousel = [
  "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/8/1/70a3d1a4-f16a-45ca-9bb4-64dc2315352b1659297228544-Desktop-Banners_unisex-with-kids.jpg",
  "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/28/84b6a214-9eb3-49eb-9f9d-72cec56ec5d71659019908592-Indian-Wear_DK--1-.jpg",
  "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/28/6107d28b-2bcb-44e6-9743-655b54550b8f1659020199598-Workwear_Desk--1-.jpg",
  "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/28/0174e4d7-448c-4746-8572-69461ad5be101659020268081-Tops---Tees_Desk.jpg",
  "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/b656a7f4-4688-4997-bb7c-54b78793981e1658752386588-Western-Wear_Desk.jpg",
];

const data1 = [
  {
    image:
      "https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/19453196/2022/8/9/c89bfda0-df52-484a-b789-e5ad542503ae1660057066247KurtaSets1.jpg",
    title: "Kids wear",
    pricetitle: "Under 400",
  },
  {
    image: "https://images.meesho.com/images/products/261005360/gyans_400.webp",
    title: "Kids wear",
    pricetitle: "Under 599",
  },
  {
    image:
      "https://cdn.fcglcdn.com/brainbees/images/products/438x531/13281526a.webp",
    title: "Kids wear",
    pricetitle: "Under 399",
  },
  {
    image:
      "https://cdn.fcglcdn.com/brainbees/images/products/438x531/13281526a.webp",
    title: "Kids wear",
    pricetitle: "Under 359",
  },
  {
    image:
      "https://cdn.fcglcdn.com/brainbees/images/products/438x531/13281526a.webp",
    title: "Kids wear",
    pricetitle: "Under 539",
  },
];

const data2 = [
  {
    image: "https://m.media-amazon.com/images/I/61Mw4M+mHwL._AC._SR360,460.jpg",
    title: "Mens",
  },
  {
    image: "https://m.media-amazon.com/images/I/61Mw4M+mHwL._AC._SR360,460.jpg",
    title: "Women",
  },
  {
    image: "https://m.media-amazon.com/images/I/61Mw4M+mHwL._AC._SR360,460.jpg",
    title: "Kids",
  },
  {
    image: "https://m.media-amazon.com/images/I/61Mw4M+mHwL._AC._SR360,460.jpg",
    title: "Boys",
  },
  {
    image: "https://m.media-amazon.com/images/I/61Mw4M+mHwL._AC._SR360,460.jpg",
    title: "Girls",
  },
];

const data3 = [
  {
    image:
      "https://cdn.fcglcdn.com/brainbees/images/products/438x531/10839201a.webp",
    title: "Kids wear",
    pricetitle: "Flat 300",
  },
  {
    image: "https://images.meesho.com/images/products/261005360/gyans_400.webp",
    title: "Gym wear",
    pricetitle: "Flat 159",
  },
  {
    image:
      "https://cdn.fcglcdn.com/brainbees/images/products/438x531/13281526a.webp",
    title: "Casual",
    pricetitle: "Flat 359",
  },
  {
    image:
      "https://cdn.fcglcdn.com/brainbees/images/products/438x531/13281526a.webp",
    title: "Formal",
    pricetitle: "Flat 559",
  },
  {
    image:
      "https://cdn.fcglcdn.com/brainbees/images/products/438x531/13281526a.webp",
    title: "Foot wear",
    pricetitle: "Flat 199",
  },
];
const Home = () => {
  const navigate = useNavigate();
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
            {/* MOBILE VIEW SLIDE CAROUSEL */}
            {/* <Slide data2={categories} data1={offers} data3={offers} /> */}

            {/* Desktop VIEW SLIDE */}
            {/* Get Ready for the Daily Deal Deligth! */}
            {/* <Box
          display={{
            base: "none",
            md: "inline-block",
            lg: "inline-block",
          }}
          textAlign={"center"}
        >
          <Heading
            bgGradient="linear(to-b,#fff,#00507a)"
            bgClip="text"
            as={"h2"}
            m={{
              sm: "25px 0px 10px 0px",
              base: "20px 0px 7px 0px",
              md: "50px 0px 20px 0px",
              lg: "50px 0px 20px 0px",
            }}
            fontWeight={700}
            fontSize={{ lg: "40px", md: "40px", sm: "30px" }}
          >
            Get Ready for the Daily Deal Deligth!
          </Heading>

          <SimpleGrid
            m={2}
            // columns={5}
            gridTemplateColumns={"repeat(5, minmax(0, 1fr))"}
            spacingX={{ base: "3", sm: "3", md: "10", lg: "10" }}
            spacingY={{ sm: "0" }}
          >
            {offers
              .filter((item) => item.type === "deal")
              .map((item, i) => (
                <Box
                  cursor="pointer"
                  position={"relative"}
                  fontWeight={"500"}
                  fontSize={"2.2vw"}
                  color={"#282c3f"}
                  onClick={() =>
                    navigate(
                      `store?offerType1=percent&offerValue=${item.value}`
                    )
                  }
                >
                  <Box w={"100%"} h={"17vw"}>
                    <Image
                      h={"100%"}
                      w={"100%"}
                      objectFit={"fill"}
                      key={item.image + i}
                      src={process.env.REACT_APP_BASE_API + `/${item.image}`}
                    />
                  </Box>
                  <Box
                    border={{
                      lg: "7px solid #ff3e6c",
                      md: "7px solid #ff3e6c",
                      sm: "5px solid #ff3e6c",
                    }}
                    borderTop={{ base: "0px", sm: "0px", md: "0px", lg: "0px" }}
                    borderBottomRadius={{
                      lg: "15",
                      md: "10",
                      sm: "10",
                      base: "10",
                    }}
                  >
                    <Text>Under</Text>
                    <Text>{item.value}</Text>
                  </Box>
                </Box>
              ))}
          </SimpleGrid>
        </Box> */}

            {/*  shop by category  */}
            {/* <Box
          display={{
            // sm: "none",
            // base: "none",
            md: "grid",
            lg: "grid",
          }}
          textAlign={"center"}
        >
          <Heading
            display={"block"}
            bgGradient="linear(to-b,#fff,#00507a)"
            bgClip="text"
            as={"h2"}
            m={{
              md: "30px 0px 13px 0px",
              lg: "50px 0px 20px 0px",
            }}
            fontWeight={700}
            fontSize={{ lg: "40px", md: "40px", sm: "25px" }}
          >
            Shop by Category
          </Heading>
          <SimpleGrid
            m={2}
            gridTemplateColumns={"repeat(5, minmax(0, 1fr))"}
            spacingX={{ base: "3", sm: "3", md: "10", lg: "10" }}
            spacingY={{ sm: "0" }}
          >
            {categories.map((item, i) => (
              <Box
                position={"relative"}
                fontWeight={"500"}
                fontSize={"2.2vw"}
                color={"#282c3f"}
                onClick={() => navigate(`store?category=${item.name}`)}
                cursor="pointer"
              >
                <Box w={"100%"} h={"17vw"}>
                  <Image
                    h={"100%"}
                    w={"100%"}
                    objectFit={"fill"}
                    key={item.image + i}
                    src={process.env.REACT_APP_BASE_API + `/${item.image}`}
                  />
                </Box>

                <Box
                  textAlign={"center"}
                  justifyContent={"center"}
                  width={"80%"}
                  height={"20%"}
                  bg="#fff"
                  position={"absolute"}
                  top={"80%"}
                  left={"50%"}
                  transform={"translate(-50%, -50%)"}
                  fontWeight={"500"}
                  color={"#282c3f"}
                  boxShadow="dark-lg"
                  rounded="md"
                >
                  <Text>{item.name}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box> */}

            {/* Offers */}
            {/* <Box
          display={{
            sm: "none",
            base: "none",
            md: "grid",
            lg: "grid",
          }}
          textAlign={"center"}
          paddingBottom={"40px"}
        >
          <Heading
            display={"block"}
            bgGradient="linear(to-b,#1414e3,#b0b0ff)"
            bgClip="text"
            as={"h2"}
            m={{
              md: "30px 0px 13px 0px",
              lg: "50px 0px 20px 0px",
            }}
            // m={"50px 0px 20px 0px"}
            fontWeight={700}
            fontSize={{ lg: "40px", md: "40px" }}
          >
            Discount Offers
          </Heading>
          <SimpleGrid
            m={2}
            // column={5}
            gridTemplateColumns={"repeat(5, minmax(0, 1fr))"}
            spacingX={{ base: "3", sm: "3", md: "10", lg: "10" }}
            spacingY={{ sm: "0" }}

            // onClick={() =>
            //   endpoint === "/DayDeals" ||
            //   endpoint === "/BestExclusiveBrand" ||
            //   endpoint === "/TopPicks"
            //     ? navigate("/store?type=Women")
            //     : navigate("/store?type=Men")
            // }
          >
            {offers
              .filter((item) => item.type === "percent")
              .map((item, i) => (
                <Box
                  // onClick={() => navigate(`store?category=${item.name}`)}
                  cursor="pointer"
                  position={"relative"}
                  fontWeight={"500"}
                  // fontSize={{ base: "13px", sm: "13px", md: "20px", lg: "20px" }}
                  fontSize={"1.7vw"}
                  color={"#282c3f"}
                  onClick={() =>
                    navigate(
                      `store?offerType1=percent&offerValue=${item.value}`
                    )
                  }
                >
                  <Box w={"100%"} h={"17vw"}>
                    <Image
                      h={"100%"}
                      w={"100%"}
                      objectFit={"fill"}
                      key={item.image + i}
                      src={process.env.REACT_APP_BASE_API + `/${item.image}`}
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
                    fontWeight={"500"}
                    // fontSize="20px"
                    color={"#282c3f"}
                    boxShadow="dark-lg"
                    // p="1"
                    rounded="md"
                  >
                    <Text>{item.text}</Text>
                    <Text fontSize={"1vw"}>"OFF"</Text>
                  </Box>
                </Box>
              ))}
          </SimpleGrid>
        </Box> */}

            {/* <Box
          display={{
            sm: "none",
            base: "none",
            md: "grid",
            lg: "grid",
          }}
          textAlign={"center"}
          paddingBottom={"40px"}
        >
          <Heading
            display={"block"}
            bgGradient="linear(to-b,#1414e3,#b0b0ff)"
            bgClip="text"
            as={"h2"}
            m={{
              md: "30px 0px 13px 0px",
              lg: "50px 0px 20px 0px",
            }}
            // m={"50px 0px 20px 0px"}
            fontWeight={700}
            fontSize={{ lg: "40px", md: "40px" }}
          >
            Flat OFFERS
          </Heading>
          <SimpleGrid
            m={2}
            // column={5}
            gridTemplateColumns={"repeat(5, minmax(0, 1fr))"}
            spacingX={{ base: "3", sm: "3", md: "10", lg: "10" }}
            spacingY={{ sm: "0" }}

            // onClick={() =>
            //   endpoint === "/DayDeals" ||
            //   endpoint === "/BestExclusiveBrand" ||
            //   endpoint === "/TopPicks"
            //     ? navigate("/store?type=Women")
            //     : navigate("/store?type=Men")
            // }
          >
            {offers
              .filter((item) => item.type === "flat")
              .map((item, i) => (
                <Box
                  position={"relative"}
                  fontWeight={"500"}
                  // fontSize={{ base: "13px", sm: "13px", md: "20px", lg: "20px" }}
                  fontSize={"1.7vw"}
                  color={"#282c3f"}
                  onClick={() =>
                    navigate(`store?offerType1=flat&offerValue=${item.value}`)
                  }
                  cursor={"pointer"}
                >
                  <Box w={"100%"} h={"17vw"}>
                    <Image
                      h={"100%"}
                      w={"100%"}
                      objectFit={"fill"}
                      key={item.image + i}
                      src={process.env.REACT_APP_BASE_API + `/${item.image}`}
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
                    fontWeight={"500"}
                    // fontSize="20px"
                    color={"#282c3f"}
                    boxShadow="dark-lg"
                    // p="1"
                    rounded="md"
                  >
                    <Text>{item.text}</Text>
                    <Text fontSize={"1vw"}>"OFF"</Text>
                  </Box>
                </Box>
              ))}
          </SimpleGrid>
        </Box> */}

            <Box paddingBottom={"40px"} textAlign={"center"}>
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
                      fontWeight={"500"}
                      fontSize={{ md: "1.7vw", base: "5vw" }}
                      color={"#282c3f"}
                      onClick={() => navigate(`store?pricelte=${item.value}`)}
                      my={{ base: "10px", md: "10px", lg: "10px" }}
                      mx={{ base: "10px", md: "10px", lg: "20px" }}
                      mt={"10px"}
                    >
                      <Box w={"100%"} h={{ md: "17vw", base: "50vw" }}>
                        <Image
                          h={"100%"}
                          w={"100%"}
                          objectFit={"fill"}
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
            </Box>

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
                      min: 464,
                    },
                    items: 2,
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
                    position={"relative"}
                    fontWeight={"200"}
                    fontSize={{ md: "1.7vw", base: "5vw" }}
                    color={"#282c3f"}
                    // margin={"10px 10px 10px 10px"}
                    onClick={() => navigate(`store?category=${item.name}`)}
                    cursor="pointer"
                    my={{ base: "10px", lg: "10px" }}
                    mx={{ base: "10px", lg: "20px" }}
                  >
                    <Box w={"100%"} h={{ md: "17vw", base: "50vw" }}>
                      <Image
                        h={"100%"}
                        w={"100%"}
                        objectFit={"fill"}
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
                      fontWeight={"500"}
                      color={"#282c3f"}
                      boxShadow="dark-lg"
                      rounded="md"
                    >
                      <Text margin={{ lg: "0", base: "1.2vw" }}>
                        {item.name}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Carousel>
            </Box>

            {/* Discont and Flat Offers */}

            <Box
              // display={{
              //   base: "grid",
              //   md: "grid",
              //   lg: "grid",
              // }}
              display={"grid"}
              textAlign={"center"}
              paddingBottom={"40px"}
            >
              <Heading
                display={"block"}
                bgGradient="linear(to-b,#1414e3,#b0b0ff)"
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
                      fontWeight={"500"}
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
                      <Box w={"100%"} h={{ md: "17vw", base: "50vw" }}>
                        <Image
                          h={"100%"}
                          w={"100%"}
                          objectFit={"fill"}
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
                        fontWeight={"500"}
                        // fontSize="20px"
                        color={"#282c3f"}
                        boxShadow="dark-lg"
                        // p="1"
                        rounded="md"
                      >
                        <Text>{item.text}</Text>
                        <Text fontSize={{ md: "1vw", base: "3.7vw" }}>
                          "OFF"
                        </Text>
                      </Box>
                    </Box>
                  ))}
              </Carousel>
            </Box>

            <Box
              // display={{
              //   base: "grid",
              //   md: "grid",
              //   lg: "grid",
              // }}
              display={"grid"}
              textAlign={"center"}
              paddingBottom={"40px"}
            >
              <Heading
                display={"block"}
                bgGradient="linear(to-b,#1414e3,#b0b0ff)"
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
                      fontWeight={"500"}
                      fontSize={{ md: "1.7vw", base: "5vw" }}
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
                      <Box w={"100%"} h={{ md: "17vw", base: "50vw" }}>
                        <Image
                          h={"100%"}
                          w={"100%"}
                          objectFit={"fill"}
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
                        fontWeight={"500"}
                        // fontSize="20px"
                        color={"#282c3f"}
                        boxShadow="dark-lg"
                        // p="1"
                        rounded="md"
                      >
                        <Text>{item.text}</Text>
                        <Text fontSize={{ md: "1vw", base: "3.7vw" }}>
                          "OFF"
                        </Text>
                      </Box>
                    </Box>
                  ))}
              </Carousel>
            </Box>
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
{
  /* <SimpleGrid columns={5} spacing={10}>
            <Box position={"relative"}>
              <Image
                src={
                  "https://cdn.fcglcdn.com/brainbees/images/products/438x531/10839201a.webp"
                }
              />
              <Box
                width={"80%"}
                height={"20%"}
                bg="#fff"
                position={"absolute"}
                top={"100%"}
                left={"50%"}
                transform={"translate(-50%, -50%)"}
                fontWeight={"500"}
                fontSize="20px"
                color={"#282c3f"}
                boxShadow="dark-lg"
                p="1"
                rounded="md"
              >
                <Text>Flat 300</Text>
                <Text fontSize={"14px"}>Kids Wear</Text>
              </Box>
            </Box>
            <Box position={"relative"}>
              <Image
                src={
                  "https://cdn.fcglcdn.com/brainbees/images/products/438x531/10839201a.webp"
                }
              />
              <Box
                width={"80%"}
                height={"20%"}
                bg="#fff"
                position={"absolute"}
                top={"100%"}
                left={"50%"}
                transform={"translate(-50%, -50%)"}
                fontWeight={"500"}
                fontSize="20px"
                color={"#282c3f"}
                boxShadow="dark-lg"
                p="1"
                rounded="md"
              >
                <Text>Flat 159</Text>
                <Text fontSize={"14px"}>Gym Wear</Text>
              </Box>
            </Box>
            <Box position={"relative"}>
              <Image
                src={
                  "https://cdn.fcglcdn.com/brainbees/images/products/438x531/10839201a.webp"
                }
              />
              <Box
                width={"80%"}
                height={"20%"}
                bg="#fff"
                position={"absolute"}
                top={"100%"}
                left={"50%"}
                transform={"translate(-50%, -50%)"}
                fontWeight={"500"}
                fontSize="20px"
                color={"#282c3f"}
                boxShadow="dark-lg"
                p="1"
                rounded="md"
              >
                <Text>Flat 359</Text>
                <Text fontSize={"14px"}>Casual</Text>
              </Box>
            </Box>
            <Box position={"relative"}>
              <Image
                src={
                  "https://cdn.fcglcdn.com/brainbees/images/products/438x531/10839201a.webp"
                }
              />
              <Box
                width={"80%"}
                height={"20%"}
                bg="#fff"
                position={"absolute"}
                top={"100%"}
                left={"50%"}
                transform={"translate(-50%, -50%)"}
                fontWeight={"500"}
                fontSize="20px"
                color={"#282c3f"}
                boxShadow="dark-lg"
                p="1"
                rounded="md"
              >
                <Text>Flat 599</Text>
                <Text fontSize={"14px"}>Formal</Text>
              </Box>
            </Box>
            <Box position={"relative"}>
              <Image
                src={
                  "https://cdn.fcglcdn.com/brainbees/images/products/438x531/10839201a.webp"
                }
              />
              <Box
                width={"80%"}
                height={"20%"}
                bg="#fff"
                position={"absolute"}
                top={"100%"}
                left={"50%"}
                transform={"translate(-50%, -50%)"}
                fontWeight={"500"}
                fontSize="20px"
                color={"#282c3f"}
                boxShadow="dark-lg"
                p="1"
                rounded="md"
              >
                <Text>Flat 199</Text>
                <Text fontSize={"14px"}>Foot Wear</Text>
              </Box>
            </Box>
          </SimpleGrid> */
}
