import { Box, Image } from "@chakra-ui/react";
import React from "react";
import loading from "../Assets/loading.gif"
const LoadingPage = () => {
  return <div>
    
    <Box position={"fixed" } top={"50%"}  left={"50%"} transform={"translate(-50% , -50%)"}>
          <Image w={"200px"} m={"auto"} align={"center"} src={loading} alt="loading" />
    </Box>
  </div>;
};

export default LoadingPage;
