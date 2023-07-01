import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};
const images = [
  "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
];

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
      {/* <Carousel
      ssr
      partialVisbile
      deviceType='mobile'
      itemClass="image-item"
      responsive={responsive}
    >
      {images.slice(0, 5).map(image => {
        return (
          <Image
            draggable={false}
            style={{ width: "100%", height: "100%" }}
            src={image}
          />
        );
      })}
    </Carousel> */}
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
        // slidesToSlide={1}
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
              borderTop={{ base: "0px", sm: "0px", md: "0px", lg: "0px" }}
              borderBottomRadius={{
                lg: "15",
                md: "10",
                sm: "10",
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
              //   justifyContent={"center"}
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

      <Heading
        bgGradient="linear(to-b,#1414e3,#b0b0ff)"
        bgClip="text"
        as={"h2"}
        // m={"50px 0px 20px 0px"}
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
        // slidesToSlide={1}
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
              //   justifyContent={"center"}
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
              {/* <Text margin={"1.2vw"}>{item.title}</Text> */}
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Slide;
