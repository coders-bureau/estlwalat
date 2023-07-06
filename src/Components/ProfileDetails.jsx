import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

const ProfileDetails = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [contactNumber, setContactNumber] = useState("1234567890");
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
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} onChange={handleChangeName} />
          </FormControl>
          <FormControl>
            <FormLabel>Contact Number</FormLabel>
            <Input
              type="text"
              value={contactNumber}
              onChange={handleChangeContactNumber}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="text" value={email} onChange={handleChangeEmail} />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input type="text" value={address} onChange={handleChangeAddress} />
          </FormControl>
          <FormControl>
            <FormLabel>Date of Birth</FormLabel>
            <Input
              type="date"
              value={dateOfBirth}
              onChange={handleChangeDateOfBirth}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select value={gender} onChange={handleChangeGender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </FormControl>
          <Button mt={"2"} onClick={handleSave} mr={2}>
            Save
          </Button>
          <Button mt={"2"} onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      ) : (
        <Box>
          <Text>Name: {name}</Text>
          <Text>Contact Number: {contactNumber}</Text>
          <Text>Email: {email}</Text>
          <Text>Address: {address}</Text>
          <Text>Date of Birth: {dateOfBirth}</Text>
          <Text>Gender: {gender}</Text>
          <Button
            color={"#ff3e6c"}
            bgColor={"#ffffff"}
            onClick={handleEdit}
            mt={4}
          >
            Edit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProfileDetails;
