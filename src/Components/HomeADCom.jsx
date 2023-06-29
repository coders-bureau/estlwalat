import { Box, Image, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeADCom = ({
  endpoint,
  spacingX = 0,
  spacingY = 0,
  heading,
  column,
  data1
}) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  console.log(data1);

  // ................................

  useEffect(() => {
    axios({
      url: process.env.REACT_APP_MYNTRA_API + endpoint,
    }).then(({ data }) => {
      setData(data);
    });
  }, []);

  // ................................

  return (
    <>
      {/*  daily deals  */}

      <Box textAlign={"center"}>
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
          fontSize={{lg:"40px", md:"40px" ,sm:"30px"}}
          // color={"#3e4152"}
        >
          {heading}
        </Heading>

        <SimpleGrid
          m={2}
          columns={column}
          spacingX={spacingX}
          spacingY={spacingY}
          
          // onClick={() =>
          //   endpoint === "/DayDeals" ||
          //   endpoint === "/BestExclusiveBrand" ||
          //   endpoint === "/TopPicks"
          //     ? navigate("/store?type=Women")
          //     : navigate("/store?type=Men")
          // }
        >
          {data1.map((item, i) => (
            <Box fontWeight={"500"}
            // fontSize={{base:"13px",sm:"13px",md:"20px",lg:"20px"}}
            fontSize={"2.2vw"}
            color={"#282c3f"}>
              <Image key={item.image + i} src={item.image} />
              <Box
                border={{lg:"7px solid #ff3e6c",md:"7px solid #ff3e6c", sm:"5px solid #ff3e6c"}}
                borderTop={{base:"0px",sm:"0px",md:"0px",lg:"0px"}}
                borderBottomRadius={{lg:"15",md:"10",sm:"10",base:"10"}}
              >
                <Text>{item.title}</Text>
                <Text>{item.pricetitle}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

    </>
  );
};

export default HomeADCom;
