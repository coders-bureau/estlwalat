import { Box, Image } from "@chakra-ui/react";
import React from "react";
import loading from "../Assets/loading.gif"
const LoadingPage = () => {
  return <div>
    
    <Box position={"fixed"} top={{ lg: "50%", md: "50%", base: "30%" }}  left={{ lg: "60%", md: "60%", base: "50%" }} transform={"translate(-50% , -50%)"}>
          <Image w={"50px"} m={"auto"} align={"center"} src={loading} alt="loading" />
    </Box>
  </div>;
};

export default LoadingPage;
