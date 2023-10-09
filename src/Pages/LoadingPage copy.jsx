import { Box, Image } from "@chakra-ui/react";
import React from "react";
import loading from "../Assets/loading.gif";
const LoadingPage = () => {
  return (
    <div>
      <Box
      w={"100%"}
      h={"100%"}
      zIndex={10000}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      bgColor={"rgba(0, 0, 0, 0.5)"}
      opacity={"0.5"}
      // borderRadius={100}
        // boxShadow={
        //   "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
        // }
        backgroundColor={"white"}
        position={"fixed"}
        top={{ lg: "50%", md: "50%", base: "40%" }}
        left={{ lg: "50%", md: "50%", base: "50%" }}
        transform={"translate(-50% , -50%)"}
      >
        <Image
        opacity={"1"}
          w={"50px"}
          m={"auto"}
          align={"center"}
          src={loading}
          alt="loading"
        />
      </Box>
    </div>
  );
};

export default LoadingPage;
