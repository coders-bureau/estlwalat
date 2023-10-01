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
          toast({
            title: "Product already present in the cart.",
            status: "warning",
            duration: 1500,
            isClosable: true,
            variant: "top-accent",
            position: "top-left",
          });
        });
    } else {
      navigate("/login");
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
        <Circle
            // boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
          zIndex={1}
          onClick={() => {
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
                  toast({
                    duration: 1500,
                    status: "warning",
                    title: "item already present in wishlist",
                    isClosable: true,
                    variant: "top-accent",
                    position: "top-right",
                  });
                });
            } else {
              navigate("/signup");
            }
          }}
          // bgColor={"white"}
          cursor={"pointer"}
          position="relative"
          display={"flex"}
          // borderColor="gray.300"
          // borderWidth="1px"
          p="4px 4px"
          size={{ lg: "9", md: "8", base: "9" }}
          left={{lg:"88%",md:"73%",base:"77%"}}
          top={{ lg: "1vw", md: "5vw", base: "10vw" }}
        >
          <Icon as={FaHeart} fill={addedToWish ? "#ff3e6f" : "gray.500"} fontSize={{ lg: "3xl", md: "2xl", base: "3xl" }} />
          {/* <Icon
            as={FaHeart}
            fill={"#ff3e6f"}
            fontSize={{ lg: "3xl", md: "2xl", base: "3xl" }}
          /> */}
        </Circle>

        <Box w={{ lg: "100%", md: "100%", base: "100%" }}>
          <Image
            onClick={() => navigate(`../single_product/${_id}`)}
            src={process.env.REACT_APP_BASE_API + "/" + img}
            // src={img}
            alt=""
            // boxSize="50px"
            boxSize={{ lg: "24vw", md: "28vw", base: "53vw" }}
            // width={"40vw"}
            objectFit="contain"
          />
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
            >
              {title}
            </Text>
          )}
          {!showWish && (
            <Text
              m={"2px 0px"}
              fontWeight="400"
              color={"#53575f"}
              fontSize="14px"
              onClick={() => navigate(`../single_product/${_id}`)}
              isTruncated
            >
              {brand}
            </Text>
          )}
          <div
            onClick={() => navigate(`../single_product/${_id}`)}
            className={styles.prc}
          >
            <p>Rs.{price}</p>
            <p>
              <span>Rs.</span>
              {MRP}
            </p>
            <Text
              display={{ lg: "flex", md: "flex", base: "none" }}
              color={"#ff905a"}
              fontSize={"13px"}
            >{`(${offer.text} OFF)`}</Text>
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
