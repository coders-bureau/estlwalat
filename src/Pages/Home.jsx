import React from "react";
import CarouselCom from "../Components/Carousel";
import { Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import Footer from "../Components/Footer";
import Slide from "../Components/Slide";

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
  return (
    <>
      {/* home page Carousel */}
      <CarouselCom data={homePageCarousel} />
      <Box
        m={{
          sm: "0px 25px 0px 25px",
          base: "0px 10px 0px 10px",
          md: "0px 55px 0px 55px",
          lg: "0px 55px 0px 55px",
        }}
      >
        {/* MOBILE VIEW SLIDE CAROUSEL */}
        <Slide data2={data2} data1={data1} data3={data3} />

        {/* Desktop VIEW SLIDE */}
        {/* Get Ready for the Daily Deal Deligth! */}
        <Box
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
            columns={5}
            spacingX={{ base: "3", sm: "3", md: "10", lg: "10" }}
            spacingY={{ sm: "0" }}
          >
            {data1.map((item, i) => (
              <Box fontWeight={"500"} fontSize={"2.2vw"} color={"#282c3f"}>
                <Box w={"100%"} h={"17vw"}>
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
                  <Text>{item.title}</Text>
                  <Text>{item.pricetitle}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/*  shop by category  */}
        <Box
          display={{
            sm: "none",
            base: "none",
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
            {data2.map((item, i) => (
              <Box
                position={"relative"}
                fontWeight={"500"}
                fontSize={"2.2vw"}
                color={"#282c3f"}
              >
                <Box w={"100%"} h={"17vw"}>
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
                  <Text>{item.title}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
        {/* Offers */}
        <Box
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
            OFFERS
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
            {data3.map((item, i) => (
              <Box
                position={"relative"}
                fontWeight={"500"}
                // fontSize={{ base: "13px", sm: "13px", md: "20px", lg: "20px" }}
                fontSize={"1.7vw"}
                color={"#282c3f"}
              >
                <Box w={"100%"} h={"17vw"}>
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
                  <Text>{item.pricetitle}</Text>
                  <Text fontSize={"1vw"}>{item.title}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
          {/* <SimpleGrid columns={5} spacing={10}>
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
          </SimpleGrid> */}
        </Box>
      </Box>
      <Box mt={16}>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
