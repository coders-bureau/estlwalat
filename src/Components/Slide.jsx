import { Box, Divider, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";

const Slide = ({ data3, data2, data1 }) => {
  return (
    <Box
      display={{
        base: "block",
        md: "none",
        lg: "none",
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
              min: 1024,
            },
            items: 3,
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
        {data1.map((item, i) => (
          <Box
            position={"relative"}
            fontWeight={"500"}
            fontSize={"20px"}
            color={"#282c3f"}
            margin={"10px 10px 10px 10px"}
          >
            <Box w={"100%"} h={"45vw"}>
              <Image
                h={"100%"}
                w={"100%"}
                objectFit={"fill"}
                key={item.image + i}
                src={item.image}
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
              <Text>{item.title}</Text>
              <Text>{item.pricetitle}</Text>
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
              min: 1024,
            },
            items: 3,
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
        // slidesToSlide={1}
        swipeable
      >
        {data2.map((item, i) => (
          <Box
            position={"relative"}
            fontWeight={"200"}
            fontSize={"25px"}
            color={"#282c3f"}
            margin={"10px 10px 10px 10px"}
          >
            <Box w={"100%"} h={"55vw"}>
              <Image
                h={"100%"}
                w={"100%"}
                objectFit={"fill"}
                key={item.image + i}
                src={item.image}
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
              <Text margin={"1.2vw"}>{item.title}</Text>
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
        Offers
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
            items: 3,
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
        {data3.map((item, i) => (
          <Box
            position={"relative"}
            fontWeight={"200"}
            fontSize={"2.px"}
            color={"#282c3f"}
            margin={"10px 10px 10px 10px"}
          >
            <Box w={"100%"} h={"55vw"}>
              <Image
                h={"100%"}
                w={"100%"}
                objectFit={"fill"}
                key={item.image + i}
                src={item.image}
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
              <Text>{item.pricetitle}</Text>
              <Text fontSize={"2.5vw"}>{item.title}</Text>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Slide;
