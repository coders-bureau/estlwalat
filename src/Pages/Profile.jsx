import { Box, Button, HStack, VStack, Text, Divider } from "@chakra-ui/react";
import React, { useState } from "react";
import ProfileDetails from "../Components/ProfileDetails";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={{lg:"100vh",md:"100vh"}}
      mt={{lg:"0px",md:"0px",base:"30px"}}
    >
      <VStack
        display={{ lg: "none", md: "none", base: "flex" }}
        border="2px"
        spacing={2}
        borderRadius={"10px"}
      >
        <Box borderBottom={"2px"}>
          <HStack m={"10px"} justifyContent="center">
            <Button
              borderColor="black"
              variant={activeTab === "tab1" ? "outline" : "solid"}
              onClick={() => handleTabChange("tab1")}
            >
              Profile
            </Button>
            <Button
              borderColor="black"
              variant={activeTab === "tab2" ? "outline" : "solid"}
              onClick={() => handleTabChange("tab2")}
            >
              Orders
            </Button>
            <Button
              borderColor="black"
              variant={activeTab === "tab3" ? "outline" : "solid"}
              onClick={() => handleTabChange("tab3")}
            >
              Wishlist
            </Button>
          </HStack>
        </Box>
        <VStack p={4} justifyContent="center">
          {activeTab === "tab1" && <ProfileDetails />}
          {activeTab === "tab2" && <Tab2Content />}
          {activeTab === "tab3" && <Tab3Content />}
        </VStack>
      </VStack>

      <HStack
        display={{ lg: "flex", md: "flex", base: "none" }}
        border="2px"
        spacing={2}
        borderRadius={"10px"}
      >
        <Box>
          <VStack m={"10px"} height="100%" justifyContent="center">
            <Button
              borderColor="black"
              variant={activeTab === "tab1" ? "outline" : "solid"}
              onClick={() => handleTabChange("tab1")}
            >
              Profile
            </Button>
            <Button
              borderColor="black"
              variant={activeTab === "tab2" ? "outline" : "solid"}
              onClick={() => handleTabChange("tab2")}
            >
              Orders
            </Button>
            <Button
              borderColor="black"
              variant={activeTab === "tab3" ? "outline" : "solid"}
              onClick={() => handleTabChange("tab3")}
            >
              Wishlist
            </Button>
          </VStack>
        </Box>
        <VStack borderLeft={"2px"} p={4} justifyContent="center">
          {activeTab === "tab1" && <ProfileDetails />}
          {activeTab === "tab2" && <Tab2Content />}
          {activeTab === "tab3" && <Tab3Content />}
        </VStack>
      </HStack>
    </Box>
  );
};

const Tab1Content = () => {
  return <Text fontSize="xl">Tab 1 Content</Text>;
};

const Tab2Content = () => {
  return <Text fontSize="xl">Tab 2 Content</Text>;
};

const Tab3Content = () => {
  return <Text fontSize="xl">Tab 3 Content</Text>;
};

export default Profile;
