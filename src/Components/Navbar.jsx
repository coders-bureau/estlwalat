import {
  Box,
  HStack,
  Image,
  Text,
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
  Badge,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import logo from "../Assets/estylebg.png";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { HiOutlineUser } from "react-icons/hi";
import { PiHeartStraightBold, PiHandbagBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/AuthReducer/Action";
import axios from "axios";
import { getUserDetails } from "../Redux/UserReducer/Action";
import { useCart } from "../Pages/CartContext";

export const Navbar = () => {
  const { cartCount } = useCart();
  const { onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { user } = useSelector((store) => store.UserReducer);
  const { isAuth } = useSelector((store) => store.AuthReducer);
  let itemscount = 0;
  // console.log(user);
  const searchRef = useRef();
  const searchRef1 = useRef();

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
    // localStorage.clear();
    // dispatch(login("logout"));

    const auth_token = localStorage.getItem("authToken");
    // axios.defaults.headers.common["auth_token"] = `${auth_token}`;
    axios
      .get(`${process.env.REACT_APP_BASE_API}/user/account/logout`, {
        headers: {
          auth_token: auth_token,
        },
      })
      .then((response) => {
        // setisAuth(true);
        dispatch(login("logout"));
        localStorage.clear();
        // console.log("hii")
        // console.log(response);
      })
      .catch((error) => {
        // setisAuth(false);
        dispatch(login("logout"));
        localStorage.clear();
        console.error("Error: ", error);
      });
    dispatch(login("logout"));
    localStorage.clear();
    // navigate("/");
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
  const [cartcount, setCartcount] = useState(0);
  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails);
    }
    if (user) {
      itemscount = user.cart.length;
      console.log(itemscount);
      setCartcount(itemscount);
    }
  }, [user]);

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
                  icon={<HamburgerIcon />}
                  variant="outline"
                />
                <MenuList>
                  <MenuItem
                    fontWeight={"500"}
                    fontSize="15px"
                    color={"#282c3f"}
                    p="20px 40%"
                    onClick={() => navigate("/")}
                    cursor="pointer"
                  >
                    {" "}
                    Home
                  </MenuItem>

                  <MenuItem
                    fontWeight={"500"}
                    fontSize="15px"
                    color={"#282c3f"}
                    p="20px 43%"
                    onClick={() => navigate("/store")}
                    // onClick={() => navigate("/store?type=Kids")}
                    cursor="pointer"
                  >
                    {/* Kids */}
                    Store
                  </MenuItem>
                  <MenuItem
                    fontWeight={"500"}
                    fontSize="15px"
                    color={"#282c3f"}
                    onClick={() => navigate("/offers")}
                    p="20px 40%"
                    cursor="pointer"
                  >
                    Offers
                  </MenuItem>

                  <MenuItem
                    fontWeight={"500"}
                    fontSize="15px"
                    color={"#282c3f"}
                    p="20px 32%"
                    cursor="pointer"
                    onClick={() => navigate("/contact")}
                  >
                    Contact us
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
            {/* logo */}
            <HStack>
              {/* logo....................... */}
              <Box
                bgColor={"white"}
                display={{ lg: "inline-block", base: "inline-block" }}
                w="100px"
                onClick={() => navigate("/")}
              >
                <Image
                  src={logo}
                  alt="eStyleWala"
                  // mixBlendMode={"darken"}
                  // fallbackSrc={
                  //   "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                  // }
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
                      color={"#282c3f"}
                      p="20px 0px"
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
                      color={"#282c3f"}
                      p="20px 0px"
                      // onClick={() => navigate("/store?type=Kids")}
                      onClick={() => navigate("/store")}
                    >
                      {/* Kids */}
                      Store
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
                      color={"#282c3f"}
                      onClick={() => navigate("/offers")}
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
                    onClick={() => navigate("/contact")}
                  >
                    <Text fontWeight={"500"} color={"#282c3f"} p="20px 0px">
                      Contact us
                    </Text>
                  </Box>
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
                position="relative"
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
                {cartCount > 0 && (
                  <Badge
                    borderRadius={"full"}
                    color={"white"}
                    bg={"#ff3e6c"}
                    colorScheme="red" // You can adjust the color
                    fontSize="0.9em" // You can adjust the font size
                    position="absolute"
                    top="-7px" // Adjust the position based on your styling
                    right="-6px" // Adjust the position based on your styling
                  >
                    {cartCount
                    }
                  </Badge>
                )}
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
                <Menu>
                  <MenuButton onMouseEnter={onOpen} onMouseLeave={onClose}>
                    <VStack
                      _hover={{
                        color: "#ff3e6c",
                      }}
                      spacing={"3px"}
                    >
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
                          _hover={{ fontWeight: "700" }}
                          variant={"outline"}
                          colorScheme="pink"
                          size={"md"}
                          fontSize={"14px"}
                          onClick={() => {
                            isAuth
                              ? handleLogOut()
                              : navigate("/login", {
                                  state: window.location.pathname,
                                  replace: true,
                                });
                          }}
                        >
                          {isAuth ? "LOGOUT" : " LOGIN/SIGNUP"}
                        </Tag>
                      </VStack>
                    </MenuItem>
                    <hr />

                    <MenuItem
                      _hover={{ fontWeight: "500" }}
                      fontSize={"13px"}
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      _hover={{ fontWeight: "500" }}
                      fontSize={"13px"}
                      onClick={() => navigate("/Orders")}
                    >
                      Orders
                    </MenuItem>
                    <MenuItem
                      _hover={{ fontWeight: "500" }}
                      fontSize={"13px"}
                      onClick={() => navigate("/wishlist")}
                    >
                      Wishlist
                    </MenuItem>
                    {/* <MenuItem _hover={{ fontWeight: "500" }} fontSize={"13px"}  onClick={() => navigate("/admin-dashboard")}>
                      Admin
                    </MenuItem> */}
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
