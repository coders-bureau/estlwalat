import {
  Box,
  HStack,
  Image,
  Text,
  Badge,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  VStack,
  Icon,
  useDisclosure,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Tag,
  IconButton,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import logo from "../Assets/estyle.png";
import {
  AddIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { CiUser, CiHeart } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import {HiOutlineUser} from "react-icons/hi";
import {PiBag,PiHeartStraight,PiHeartStraightBold,PiHandbagBold} from 'react-icons/pi'
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/AuthReducer/Action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { isAuth } = useSelector((store) => store.AuthReducer);
  const searchRef = useRef();
  const searchRef1 = useRef();

  // const btnRef = React.useRef();

  // ...........................

  const initType = searchParams.get("type");

  // ...........................

  const initCategory = searchParams.getAll("category");

  // ...........................

  const initBrand = searchParams.getAll("brand");

  // ............................

  const initPrice = searchParams.getAll("price");

  // ............................
  const initDiscount = searchParams.get("discount");

  // ............................

  const handleLogOut = () => {
    dispatch(login("logout"));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchRef.current.value) {
      const params = {};
      navigate(`/store`);
      initType && (params.type = initType);
      initCategory && (params.category = initCategory);
      initBrand && (params.brand = initBrand);
      initPrice && (params.price = initPrice);
      initDiscount && (params.discount = initDiscount);
      searchRef.current.value && (params.q = searchRef.current.value);
      navigate({
        pathname: "/store",
        search: `?${createSearchParams(params)}`,
      });
    }
    if (e.key === "Enter" && searchRef1.current.value) {
      const params = {};
      navigate(`/store`);
      initType && (params.type = initType);
      initCategory && (params.category = initCategory);
      initBrand && (params.brand = initBrand);
      initPrice && (params.price = initPrice);
      initDiscount && (params.discount = initDiscount);
      searchRef.current.value && (params.q = searchRef.current.value);
      navigate({
        pathname: "/store",
        search: `?${createSearchParams(params)}`,
      });
    }
  };
  

  return (
    <>
      <Box
        zIndex={"2000"}
        w={"100%"}
        p={{
          base: "5px",
          sm: "5px",
          md: "0px",
          lg: "0px",
        }}
        boxShadow={"lg"}
        position={"sticky"}
        top={0}
        bgColor="rgba(255, 255, 255, 0.97)"
      >
        <VStack spacing={0}>
          <HStack
            display={"flex"}
            w={"95%"}
            m={"auto"}
            justifyContent={"space-between"}
          >
            {/* Menu box */}
            <Box
              my={"7px"}
              display={{
                sm: "inline-block",
                base: "inline-block",
                md: "inline-block",
                lg: "none",
              }}
            >
              <Menu>
                <MenuButton
                  as={IconButton}
                  // aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                />
                <MenuList>
                  {/* <MenuItem icon={<AddIcon />} command="⌘T"> */}
                  <MenuItem
                    fontWeight={"500"}
                    fontSize="15px"
                    color={"#282c3f"}
                    p="20px 40%"
                    // onClick={() => navigate("/store?type=Men")}
                    onClick={() => navigate("/")}
                    cursor="pointer"
                  >
                    {" "}
                    Home
                  </MenuItem>
                  {/* </MenuItem>
                  <MenuItem icon={<ExternalLinkIcon />} command="⌘N"> */}
                  <MenuItem
                    fontWeight={"500"}
                    fontSize="15px"
                    color={"#282c3f"}
                    p="20px 43%"
                    onClick={() => navigate("/store?type=Kids")}
                    cursor="pointer"
                  >
                    Kids
                  </MenuItem>
                  {/* </MenuItem>
                  <MenuItem icon={<RepeatIcon />} command="⌘⇧N"> */}
                  <MenuItem
                    fontWeight={"500"}
                    fontSize="15px"
                    color={"#282c3f"}
                    onClick={() => navigate("/store?type=Offers")}
                    p="20px 40%"
                    cursor="pointer"
                  >
                    Offers
                  </MenuItem>
                  {/* </MenuItem>
                  <MenuItem icon={<EditIcon />} command="⌘O"> */}
                  <MenuItem
                    fontWeight={"500"}
                    fontSize="15px"
                    color={"#282c3f"}
                    p="20px 32%"
                    cursor="pointer"
                  >
                    Contact us
                  </MenuItem>
                  {/* </MenuItem> */}
                </MenuList>
              </Menu>
            </Box>
            {/* logo */}
            <HStack>
              {/* logo....................... */}
              <Box
                display={{ lg:"inline-block",base:"none" }}
                w="100px"
                onClick={() => navigate("/")}
              >
                <Image
                  src={logo}
                  alt="logo"
                  fallbackSrc={"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"}
                  cursor="pointer"
                />
              </Box>
            </HStack>
            {/* category */}
            <HStack justifyContent={"space-between"}>
              {/* box2.............category */}
              <Box
                display={{
                  sm: "none",
                  base: "none",
                  md: "none",
                  lg: "inline-block",
                }}
              >
                <HStack fontSize={"16px"} spacing={"50px"}>
                  <Box
                    _hover={{
                      borderBottom: "5px solid #ff3e6c",
                    }}
                    borderBottom="5px solid rgba(0,0,0,0.0)"
                    cursor="pointer"
                  >
                    <Text
                      fontWeight={"500"}
                      // fontSize="14px"
                      color={"#282c3f"}
                      p="20px 0px"
                      // onClick={() => navigate("/store?type=Men")}
                      onClick={() => navigate("/")}
                    >
                      {" "}
                      Home
                    </Text>
                  </Box>

                  <Box
                    _hover={{
                      borderBottom: "5px solid #ff3e6c",
                    }}
                    borderBottom="5px solid rgba(0,0,0,0.0)"
                    cursor="pointer"
                  >
                    <Text
                      fontWeight={"500"}
                      // fontSize="14px"
                      color={"#282c3f"}
                      p="20px 0px"
                      onClick={() => navigate("/store?type=Kids")}
                    >
                      Kids
                    </Text>
                  </Box>

                  <Box
                    _hover={{
                      borderBottom: "5px solid #ff3e6c",
                    }}
                    borderBottom="5px solid rgba(0,0,0,0.0)"
                    cursor="pointer"
                  >
                    <Text
                      fontWeight={"500"}
                      // fontSize="14px"
                      color={"#282c3f"}
                      onClick={() => navigate("/store?type=Offers")}
                      p="20px 0px"
                    >
                      Offers
                    </Text>
                  </Box>

                  <Box
                    _hover={{
                      borderBottom: "5px solid #ff3e6c",
                    }}
                    borderBottom="5px solid rgba(0,0,0,0.0)"
                    cursor="pointer"
                  >
                    <Text
                      fontWeight={"500"}
                      // fontSize="14px"
                      color={"#282c3f"}
                      p="20px 0px"
                    >
                      Contact us
                    </Text>
                  </Box>

                  {/* <Box
                  _hover={{
                    borderBottom: "5px solid #ff3e6c",
                  }}
                  borderBottom="5px solid rgba(0,0,0,0.0)"
                  cursor="pointer"
                >
                  <Text
                    fontWeight={"500"}
                    fontSize="14px"
                    color={"#282c3f"}
                    p="20px 0px"
                  >
                    BEAUTY
                  </Text>
                </Box>

                <Box
                  _hover={{
                    borderBottom: "5px solid #ff3e6c",
                  }}
                  borderBottom="5px solid rgba(0,0,0,0.0)"
                  cursor="pointer"
                >
                  <Text
                    fontWeight={"500"}
                    fontSize="14px"
                    color={"#282c3f"}
                    p="20px 0px"
                  >
                    STUDIO{" "}
                    <sup>
                      <Badge
                        variant={"subtle"}
                        colorScheme="pink"
                        fontSize={".8em"}
                        ml="0px"
                        padding="0px"
                      >
                        NEW
                      </Badge>
                    </sup>
                  </Text>
                </Box> */}
                </HStack>
              </Box>
            </HStack>
            {/* search bar */}
            <HStack>
              <Stack
                display={{
                  base: "none",
                  md: "inline-block",
                  lg: "inline-block",
                }}
                spacing="4"
              >
                <InputGroup
                  variant="filled"
                  fontWeight={"400"}
                  fontSize="14px"
                  color={"#696e79"}
                >
                  <InputLeftElement
                    fontWeight={"500"}
                    fontSize="14px"
                    color={"#696e79"}
                    children={<SearchIcon />}
                  />

                  <Input
                    fontWeight={"400"}
                    fontSize="14px"
                    color={"#696e79"}
                    type={"text"}
                    w={{
                      lg: "250px",
                      md: "300px",
                    }}
                    textColor="#696e79"
                    focusBorderColor="grey"
                    border={"1px solid"}
                    ref={searchRef}
                    onKeyDown={handleKeyDown}
                    placeholder="Search"
                  />
                </InputGroup>
              </Stack>
            </HStack>
            {/* three icons bag wish profile */}
            <HStack
              fontSize={{
                base: "9px",
                md: "14px",
                lg: "14px",
              }}
              spacing={{
                base: "15px",
                md: "30px",
                lg: "30px",
              }}
            >
              <VStack
                cursor="pointer"
                spacing={"3px"}
                onClick={() => navigate("/cart")}
              >
                
                <Icon
                  as={PiHandbagBold}
                  fontSize="xl"
                  onClick={() => navigate("/cart")}
                />
                <Text
                  _hover={{
                    color: "#ff3e6c",
                  }}
                  fontWeight={"500"}
                  color={"#282c3f"}
                  onClick={() => navigate("/cart")}
                >
                  Bag
                </Text>
              </VStack>
              <VStack
                cursor="pointer"
                spacing={"3px"}
                onClick={() => navigate("/wishlist")}
              >
                
                <Icon
                  onClick={() => navigate("/wishlist")}
                  as={PiHeartStraightBold}
                  fontSize="xl"
                />
                <Text
                  _hover={{
                    color: "#ff3e6c",
                  }}
                  fontWeight={"500"}
                  color={"#282c3f"}
                  onClick={() => navigate("/wishlist")}
                >
                  Wishlist
                </Text>
              </VStack>
              <VStack spacing={"3px"}>
                <Menu >
                  <MenuButton onMouseEnter={onOpen} onMouseLeave={onClose}>
                    <VStack
                      _hover={{
                        color: "#ff3e6c",
                      }}
                      spacing={"3px"}
                    >
                      {/* <FontAwesomeIcon icon="fa-regular fa-user" /> */}
                      <Icon as={HiOutlineUser} fontSize="xl" />
                      <Text fontWeight={"500"} color={"#282c3f"}>
                        Profile
                      </Text>
                    </VStack>
                  </MenuButton>
                  <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                    <MenuItem>
                      <VStack spacing={2} alignItems="flex-start">
                        <Text
                          fontSize={"14px"}
                          color="#333333"
                          fontWeight={"500"}
                        >
                          Welcome
                        </Text>
                        <Text fontSize={"14px"} color="#333333">
                          {isAuth
                            ? "To remove account access"
                            : "To access account and manage orders"}
                        </Text>
                        <Tag
                          variant={"outline"}
                          colorScheme="pink"
                          size={"md"}
                          fontSize={"14px"}
                          onClick={() => {
                            isAuth ? handleLogOut() : navigate("/signup");
                          }}
                        >
                          {isAuth ? "LOGOUT" : " LOGIN/SIGNUP"}
                        </Tag>
                      </VStack>
                    </MenuItem>
                    <hr />
                    <MenuItem
                      fontSize={"13px"}
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem fontSize={"13px"}>Orders</MenuItem>
                    <MenuItem
                      fontSize={"13px"}
                      onClick={() => navigate("/wishlist")}
                    >
                      Wishlist
                    </MenuItem>
                    <MenuItem fontSize={"13px"}>Contact Us</MenuItem>
                  </MenuList>
                </Menu>
              </VStack>
            </HStack>
          </HStack>
          {/* search bar for small screen */}
          <HStack
            w={"95%"}
            display={{
              base: "flex",
              md: "none",
              lg: "none",
            }}
            // spacing="4"
          >
            <InputGroup
              variant="filled"
              fontWeight={"400"}
              fontSize="14px"
              color={"#696e79"}
            >
              <InputLeftElement
                fontWeight={"500"}
                fontSize="14px"
                color={"#696e79"}
                children={<SearchIcon />}
              />

              <Input
                fontWeight={"400"}
                fontSize="14px"
                color={"#696e79"}
                type={"text"}
                // w={{
                //   lg: "300px",
                //   md: "300px",
                // }}
                textColor="#696e79"
                focusBorderColor="grey"
                border={"1px solid"}
                ref={searchRef1}
                onKeyDown={handleKeyDown}
                placeholder="Search"
              />
            </InputGroup>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default Navbar;
