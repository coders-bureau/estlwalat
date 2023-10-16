import styles from "../css/SingleProductCom.module.css";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   faMagnifyingGlass,
//   faUser,
//   faHeart,
//   faBagShopping,
// } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Circle,
  Text,
  useToast,
  Icon,
  Image,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { BsHandbag, BsHeart } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

import { getUserDetails } from "../Redux/UserReducer/Action";
import loading from "../Assets/loading.gif";
import { userloginStatus } from "../Redux/AuthReducer/Action";

// library.add(faMagnifyingGlass, faUser, faHeart, faBagShopping);

export default function SingleProductCom(el) {
  const mobileNumber = localStorage.getItem("MbNumber");
  const [loadingadd, setLoadingadd] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const [addedToWish, setAddedToWish] = useState(false);

  const { user } = useSelector((store) => store.UserReducer);
  const dispatch = useDispatch();
  const [userId, setUserID] = useState("");

  const {
    MRP,
    discount,
    _id,
    brand,
    img,
    price,
    rating,
    ratingT,
    size,
    title,
    offer,
    currentSize,
  } = el;
  const [showWish, setShowWish] = useState(false);
  const navigate = useNavigate();
  const { isAuth } = useSelector((store) => store.AuthReducer);
  const toast = useToast();

  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails(mobileNumber));
    } else {
      setUserID(user._id);
    }
  }, [user, dispatch]);

  const handleAddCart = (el) => {
    if (isAuth) {
      setLoadingadd(true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_API}/user/addcart`,
        data: {
          productId: el._id,
          currentSize: size[0],
        },
      })
        .then((res) => {
          setLoadingadd(false);
          setAddedToBag(true);
          // dispatch(getUserDetails());
          // {res.data.message}
          console.log(res.data.message);
          toast({
            title: res.data.message,
            status: "success",
            duration: 1500,
            isClosable: true,
            variant: "top-accent",
            position: "top-left",
          });
        })
        .catch((err) => {
          setLoadingadd(false);
          console.log(err);

          // Check for a specific error response
          if (err.response && err.response.status === 401) {
            if (err.response.data.message === "Token expired") {
              // Token expired, display "Login session expired" toast
              toast({
                title: "Login session expired",
                status: "warning",
                duration: 1500,
                isClosable: true,
                variant: "top-accent",
                position: "top-left",
              });

              // Redirect to the login page (replace '/login' with your actual login route)
              navigate("/login", {
                state: `/store`,
                replace: true,
              });
            } else {
              // Handle other 401 errors here
              // For example, if it's not a token expiration error
              // you can display a different message
              toast({
                title: "Unauthorized",
                status: "error",
                duration: 1500,
                isClosable: true,
                variant: "top-accent",
                position: "top-left",
              });
            }
          } else {
            // Handle other errors here
            toast({
              title: "Product already present in the cart.",
              status: "warning",
              duration: 1500,
              isClosable: true,
              variant: "top-accent",
              position: "top-left",
            });
          }
        });
    } else {
      navigate("/login", {
        state: `/store`,
        replace: true,
      });
    }
  };

  const handleWishlist = () => {
    if (isAuth) {
      setLoadingadd(true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_API}/user/wishlist/${_id}`,
      })
        .then((res) => {
          dispatch(getUserDetails());
          setLoadingadd(false);
          setAddedToWish(true);
          toast({
            duration: 1500,
            status: "info",
            title: "item successfully added in wishlist",
            isClosable: true,
            variant: "top-accent",
            position: "top-right",
          });
        })
        .catch((err) => {
          setLoadingadd(false);
          setAddedToWish(true);
          console.log(err);
          if (err.response && err.response.status === 401) {
            // Token expired, navigate to the login page
            toast({
              duration: 1500,
              status: "warning",
              title: "Login session expired",
              isClosable: true,
              variant: "top-accent",
              position: "top-right",
            });

            navigate("/login", {
              state: `/store`,
              replace: true,
            });
          } else if (err.response && err.response.status === 400) {
            // Product already in wishlist
            toast({
              duration: 1500,
              status: "warning",
              title: "Product already in wishlist",
              isClosable: true,
              variant: "top-accent",
              position: "top-right",
            });
          } else {
            // Handle other errors here
            console.log(err);
            // Display a generic error message
            toast({
              duration: 1500,
              status: "error",
              title: "An error occurred",
              isClosable: true,
              variant: "top-accent",
              position: "top-right",
            });
          }
        });
    } else {
      navigate("/login", {
        state: `/store`,
        replace: true,
      });
    }
  };

  return (
    <>
      {loadingadd && (
        <Box
          // height={"200px"}
          zIndex={99999}
          borderRadius={100}
          boxShadow={
            "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
          }
          position={"fixed"}
          top={{ lg: "50%", md: "50%", base: "40%" }}
          left={{ lg: "50%", md: "50%", base: "50%" }}
          transform={"translate(-50% , -50%)"}
        >
          <Image
            w={"50px"}
            m={"auto"}
            align={"center"}
            src={loading}
            alt="loading"
          />
        </Box>
      )}
      <div
        className={styles.main}
        onMouseEnter={() => setShowWish(true)}
        onMouseLeave={() => setShowWish(false)}
      >
        {}

        <Box
          w={{ lg: "100%", md: "100%", base: "100%" }}
          justifyContent={"right"}
        >
          <Circle
            zIndex={1}
            onClick={() => handleWishlist()}
            cursor={"pointer"}
            position="relative"
            display={"flex"}
            p="4px 4px"
            marginLeft="auto"
            marginRight={"3px"}
            size={{ lg: "9", md: "9", base: "9" }}
            // left={{ lg: "88%", md: "73%", base: "77%" }}
            top={"40px"}
          >
            <Icon
              className="fa-border"
              as={FaHeart}
              fill={addedToWish ? "#ff3e6f" : "#ffffff"}
              fontSize={"3xl"}
              style={{
                // opacity: 0.8,
                filter: "drop-shadow(0px 0px 1px black)",
              }}
            />

            {/* <Icon
            as={CiHeart}
            fill={"#ff3e6f"}
            fontSize={{ lg: "3xl", md: "2xl", base: "3xl" }}
            dropShadow={"10px 10px 20px #000000"}
          /> */}
          </Circle>
          {/* <Box display={"flex"}
          width={"max-content"}
          position={"relative"}
          // left={"200px"}
          // top={"40px"}
          zIndex={1}
          >
            
              <Icon
                className="fa-border"
                as={FaHeart}
                fill={addedToWish ? "#ff3e6f" : "#ffffff"}
                fontSize={{ lg: "3xl", md: "2xl", base: "3xl" }}
                style={{
                  opacity: 0.8,
                  // filter: "drop-shadow(3px 3px 3px black)",
                  filter: "drop-shadow(0px 0px 1px black)",
                  // boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.1)", // Add your shadow CSS here
                }}
              />
            </Box> */}
          {/* <Image
            onClick={() => navigate(`../single_product/${_id}`)}
            src={process.env.REACT_APP_BASE_API + "/" + img}
            // src={img}
            alt=""
            // boxSize="50px"
            boxSize={{ lg: "24vw", md: "28vw", base: "53vw" }}
            // width={"40vw"}
            objectFit="contain"
          /> */}
          <Box
            w={"full"}
            onClick={() => navigate(`../single_product/${_id}`)}
            display="flex"
            alignItems="center"
            justifyContent="center"
            // bg="gray.200" // Set the background color to light gray
            // overflow="hidden" // Hide any content that overflows the box size
            // borderRadius="md" // Optional: Add border radius for rounded corners
          >
            <Image
              src={process.env.REACT_APP_BASE_API + "/" + img}
              alt=""
              objectFit="contain"
              w={"full"}
              boxSize={{ lg: "24vw", md: "32vw", base: "53vw" }}
            />
          </Box>
          {!showWish && (
            <div className={styles.rating}>
              <div>
                <span>{rating}</span> &nbsp;
                <span className={styles.star}>&#9733; </span>
              </div>
              <div> |</div>
              <div>{ratingT}</div>
            </div>
          )}
        </Box>

        <div>
          {showWish && (
            <div className={styles.hoverWish}>
              <div
                className={addedToBag ? styles.wishlistadd : styles.wishlist}
                onClick={() => handleAddCart(el)}
              >
                <Icon as={BsHandbag} fontSize="xl" />
                <div className={styles.wishlistWord}>
                  {addedToBag ? "Added to Bag" : "Add to Bag"}
                </div>
              </div>
            </div>
          )}
          {showWish && (
            <div
              onClick={() => navigate(`../single_product/${_id}`)}
              className={styles.size}
            >
              {/* <p>Sizes: {size.join(", ")} </p> */}
              <p>Sizes: {size[0]} </p>
            </div>
          )}
          {!showWish && (
            <Text
              isTruncated
              onClick={() => navigate(`../single_product/${_id}`)}
              className={styles.title}
              fontSize={{ md: "16px", base: "14px" }}
            >
              {title}
            </Text>
          )}
          {!showWish && (
            <Text
              // m={"2px 0px"}
              fontWeight="400"
              color={"#53575f"}
              onClick={() => navigate(`../single_product/${_id}`)}
              isTruncated
              fontSize={{ md: "14px", base: "12px" }}
            >
              {brand}
            </Text>
          )}
          <div
            onClick={() => navigate(`../single_product/${_id}`)}
            className={styles.prc}
          >
            <Text fontSize={{ md: "14px", base: "11px" }}>Rs.{price}</Text>
            <Text fontSize={{ md: "14px", base: "11px" }}>
              <span>Rs.</span>
              {MRP}
            </Text>
            <Text
              display={{ lg: "flex", md: "flex", base: "flex" }}
              color={"#ff905a"}
              fontSize={{ md: "12px", base: "10px" }}
              // fontSize={"13px"}
            >
              {/* {`(${offer.text} OFF)`} */}
              {Math.round(((MRP - price) / MRP) * 100)}% OFF
            </Text>
          </div>
          {/* <Text
            display={{ lg: "none", md: "none", base: "flex" }}
            color={"#ff905a"}
            fontSize={"13px"}
          >{`(${offer.text}% OFF)`}</Text> */}
        </div>
      </div>
    </>
  );
}
