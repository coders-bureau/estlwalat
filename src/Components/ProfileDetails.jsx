import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

const ProfileDetails = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [contactNumber, setContactNumber] = useState(localStorage.getItem("MbNumber"));
  const [email, setEmail] = useState("johndoe@example.com");
  const [address, setAddress] = useState("123 Main St");
  const [dateOfBirth, setDateOfBirth] = useState("1990-01-01");
  const [gender, setGender] = useState("Male");

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    // Perform save logic here (e.g., make API request to update the data)
  };

  const handleCancel = () => {
    setEditing(false);
    // Reset the form values if needed
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeContactNumber = (event) => {
    setContactNumber(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleChangeDateOfBirth = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  return (
    <Box>
      <Text fontSize="2xl">Profile</Text>
      {editing ? (
        <Box>
          <FormControl>
            <HStack  width="100%" align="center">
              <FormLabel flex="20%" textAlign="left">
                Name
              </FormLabel>
              <Input type="text"  flex={"80%"} value={name} onChange={handleChangeName} />
            </HStack>
          </FormControl>
          <FormControl>
          <HStack  width="100%" align="center">
              <FormLabel textAlign="left" flex={"20%"}>
                Contact Number
              </FormLabel>
              <Input
                type="text"
                flex={"80%"}
                value={contactNumber}
                onChange={handleChangeContactNumber}
              />
            </HStack>
          </FormControl>
          <FormControl>
            <HStack  width="100%" align="center">
              <FormLabel flex={"20%"} textAlign="left" >
                Email
              </FormLabel>
              <Input type="text"   flex={"80%"} value={email} onChange={handleChangeEmail} />
            </HStack >
          </FormControl>
          <FormControl>
            <HStack  width="100%" align="center">
              <FormLabel flex={"20%"} textAlign="left" >
                Address
              </FormLabel>
              <Input
               flex={"80%"}
                type="text"
                value={address}
                onChange={handleChangeAddress}
              />
            </HStack >
          </FormControl>
          <FormControl>
            <HStack  width="100%" align="center">
              <FormLabel flex={"20%"} textAlign="left" >
                Date of Birth
              </FormLabel>
              <Input
               flex={"80%"}
                type="date"
                value={dateOfBirth}
                onChange={handleChangeDateOfBirth}
              />
            </HStack >
          </FormControl>
          <FormControl>
            <HStack  width="100%" align="center">
              <FormLabel flex={"20%"} textAlign="left" >
                Gender
              </FormLabel>
              <Select flex={"80%"} value={gender} onChange={handleChangeGender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </HStack >
          </FormControl>
          <Button mt={2} onClick={handleSave} mr={2}>
            Save
          </Button>
          <Button mt={2} onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      ) : (
        <Box>
          <Text textAlign="left">Name: <b>{name}</b></Text>
          <Text textAlign="left">Contact Number: <b>{contactNumber}</b></Text>
          <Text textAlign="left">Email: <b>{email}</b></Text>
          <Text textAlign="left">Address: <b>{address}</b></Text>
          <Text textAlign="left">Date of Birth: <b>{dateOfBirth}</b></Text>
          <Text textAlign="left">Gender: <b>{gender}</b></Text>
          <Button color="#ff3e6c" bgColor="#ffffff" onClick={handleEdit} mt={4}>
            Edit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProfileDetails;
