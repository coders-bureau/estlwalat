import styles from "../css/SingleProductCom.module.css";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faUser,
  faHeart,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Circle,
  Text,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { getUserDetails } from "../Redux/UserReducer/Action";

library.add(faMagnifyingGlass, faUser, faHeart, faBagShopping);

export default function SingleProductCom(el) {
  const mobileNumber = localStorage.getItem("MbNumber");
  
  const { user } = useSelector((store) => store.UserReducer);
  const dispatch = useDispatch();
  const [userId,setUserID] =useState("");

  const { MRP, discount, _id, brand, img, price, rating, ratingT, size, title } =
    el;
  const [showWish, setShowWish] = useState(false);
  const navigate = useNavigate();
  const { isAuth } = useSelector((store) => store.AuthReducer);
  const toast = useToast();

  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails(mobileNumber));
    }else{
      setUserID(user._id)
    }
  }, [user, dispatch]);
  const handleAddCart = (el) => {
    if (isAuth) {
      // axios({
      //   url: process.env.REACT_APP_MYNTRA_API + "/cart",
      //   method: "post",
      //   data: el,
      // })
      axios({
        method: "post",
        url: `http://localhost:5000/user/`+userId+`/cart/`+el._id,
      })
        .then((res) => {
          toast({
            title: "Product added in the cart.",
            status: "success",
            duration: 1500,
            isClosable: true,
            variant: "top-accent",
            position: "top-right",
          });
        })
        .catch((err) => {
          toast({
            title: "Product already present in the cart.",
            status: "warning",
            duration: 1500,
            isClosable: true,
            variant: "top-accent",
            position: "top-right",
          });
        });
    } else {
      navigate("/signup");
    }
  };

  return (
    <>
      <div
        // className={styles.main}
        onMouseEnter={() => setShowWish(true)}
        onMouseLeave={() => setShowWish(false)}
      >
        <Circle
          left={"80%"}
          zIndex={1}
          onClick={() => {
            if (isAuth) {
              axios({
                method: "post",
                url: `http://localhost:5000/user/`+userId+`/wishlist/`+_id,
              })
                .then((res) => {
                  dispatch(getUserDetails(mobileNumber));
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
          bgColor={"#eeeded"}
          cursor={"pointer"}
          position="relative"
          display={"flex"}
          _
          p="4px 4px"
          size={{ lg: "9", md: "8", base: "9" }}
          top={{ lg: "4vw", md: "5vw", base: "6vw" }}
        >
          <Icon as={CiHeart} fontSize={{ lg: "4xl", md: "3xl", base: "4xl" }} />
        </Circle>
        <div style={{ w_idth: "100%" }}>
          <img
            onClick={() => navigate(`../single_product/${_id}`)}
            src={img}
            alt=""
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
        </div>

        <div>
          {showWish && (
            <div className={styles.hoverWish}>
              <div
                className={styles.wishlist}
                onClick={() => handleAddCart(el)}
              >
                <Icon as={BsHandbag} fontSize="xl" />
                <div className={styles.wishlistWord}>Add to Cart</div>
              </div>
            </div>
          )}
          {showWish && (
            <div
              onClick={() => navigate(`../single_product/${_id}`)}
              className={styles.size}
            >
              <p>Sizes: {size.join(", ")} </p>
            </div>
          )}
          {!showWish && (
            <Text
              isTruncated
              onClick={() => navigate(`../single_product/${_id}`)}
              className={styles.title}
            >
              {brand}
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
              {title}
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
            >{`(${discount}% OFF)`}</Text>
          </div>
          <Text
            display={{ lg: "none", md: "none", base: "flex" }}
            color={"#ff905a"}
            fontSize={"13px"}
          >{`(${discount}% OFF)`}</Text>
        </div>
      </div>
    </>
  );
}
