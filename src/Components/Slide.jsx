import { Box, Divider, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";

const Slide = ({ data3, data2, data1 }) => {
  // console.log(data1, data2, data3);
  const navigate = useNavigate();
  return (
    <Box
      display={{
        base: "block",
        md: "block",
        lg: "block",
      }}
      mt={"10px"}
      background={"#ffffff"}
    >
      {/* 1st slide home page */}
      <Heading
        bgGradient="linear(to-b,#fff,#00507a)"
        bgClip="text"
        as={"h2"}
        fontWeight={700}
        fontSize={"40px"}
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
        {data1
          .filter((item) => item.type === "deal")
          .map((item, i) => (
            <Box
              position={"relative"}
              fontWeight={"500"}
              fontSize={{ md: "2.2vw", base: "5vw" }}
              color={"#282c3f"}
              onClick={() =>
                navigate(`store?offerType1=percent&offerValue=${item.value}`)
              }
              my={{ base: "10px", md: "10px", lg: "10px" }}
              mx={{ base: "10px", md: "10px", lg: "20px" }}
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

      <Divider my={"15px"} />

      {/* 2nd slide home page */}
      <Heading
        bgGradient="linear(to-b,#ff0051,#fac0d3)"
        bgClip="text"
        as={"h2"}
        fontWeight={700}
        fontSize={"40px"}
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
        {data2.map((item, i) => (
          <Box
            position={"relative"}
            fontWeight={"200"}
            fontSize={{ md: "2.2vw", base: "5vw" }}
            color={"#282c3f"}
            // margin={"10px 10px 10px 10px"}
            onClick={() => navigate(`store?category=${item.name}`)}
            cursor="pointer"
            my={{ base: "10px", md: "10px", lg: "10px" }}
            mx={{ base: "10px", md: "10px", lg: "20px" }}
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
              <Text margin={{ lg: "0", base: "1.2vw" }}>{item.name}</Text>
            </Box>
          </Box>
        ))}
      </Carousel>
      <Divider my={"15px"} />

      {/* 3nd slide home page */}
      <Heading
        bgGradient="linear(to-b,#1414e3,#b0b0ff)"
        bgClip="text"
        as={"h2"}
        fontWeight={700}
        fontSize={"40px"}
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
              min: 767,
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
        swipeable
      >
        {data3
          .filter((item) => item.type === "percent")
          .map((item, i) => (
            <Box
              position={"relative"}
              fontWeight={"200"}
              fontSize={{ md: "2.2vw", base: "5vw" }}
              color={"#282c3f"}
              // margin={"10px 10px 10px 10px"}
              my={{ base: "10px", md: "10px", lg: "10px" }}
              mx={{ base: "10px", md: "10px", lg: "20px" }}
            >
              <Box w={"100%"} h={{ lg: "17vw", base: "50vw" }}>
                <Image
                  h={"100%"}
                  w={"100%"}
                  objectFit={"fill"}
                  key={item.image + i}
                  src={process.env.REACT_APP_BASE_API + `/${item.image}`}
                />
              </Box>
              <Box
                justifyContent={"center"}
                textAlign={"center"}
                width={"80%"}
                height={"25%"}
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
                <Text>{item.text}</Text>
                <Text>"OFF"</Text>
              </Box>
            </Box>
          ))}
      </Carousel>
      <Divider my={"15px"} />

      {/* 4th slide home page */}
      <Heading
        bgGradient="linear(to-b,#1414e3,#b0b0ff)"
        bgClip="text"
        as={"h2"}
        fontWeight={700}
        fontSize={"40px"}
      >
        Flat Offers
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
              min: 1024,
            },
            items: 5,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
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
        swipeable
      >
        {data3
          .filter((item) => item.type === "flat")
          .map((item, i) => (
            <Box
              position={"relative"}
              fontWeight={"200"}
              fontSize={{ md: "2.2vw", base: "5vw" }}
              color={"#282c3f"}
              // margin={"10px 10px 10px 10px"}
              my={{ base: "10px", md: "40px", lg: "50px" }}
              mx={{ base: "10px", md: "10px", lg: "20px" }}
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
                height={"25%"}
                bg="#fff"
                position={"absolute"}
                // top={"80%"}
                left={"50%"}
                transform={"translate(-50%, -50%)"}
                fontWeight={"500"}
                color={"#282c3f"}
                boxShadow="dark-lg"
                rounded="md"
              >
                <Text>{item.text}</Text>
                <Text fontSize={"1vw"}>"OFF"</Text>
              </Box>
            </Box>
          ))}
      </Carousel>
    </Box>
  );
};

export default Slide;
