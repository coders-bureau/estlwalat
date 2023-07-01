import { Box, Button, HStack, VStack, Text } from "@chakra-ui/react";
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
      height="100vh"
    >
      <HStack border="2px">
        <Box height="400px" >
          <VStack height="100%" justifyContent="center">
            <Button
              variant={activeTab === "tab1" ? "solid" : "outline"}
              onClick={() => handleTabChange("tab1")}
            >
              Profile
            </Button>
            <Button
              variant={activeTab === "tab2" ? "solid" : "outline"}
              onClick={() => handleTabChange("tab2")}
            >
              Orders
            </Button>
            <Button
              variant={activeTab === "tab3" ? "solid" : "outline"}
              onClick={() => handleTabChange("tab3")}
            >
              Wishlist
            </Button>
          </VStack>
        </Box>
        <VStack p={4} justifyContent="center">
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
