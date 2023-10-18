import styles from "../css/Footer.module.css";
import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function Footer() {
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform submit logic here, e.g., send data to backend or display a success message
    console.log("Form submitted!");
    console.log("Description:", description);
    console.log("Email:", email);
    // Reset form fields
    setDescription("");
    setEmail("");
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/allcategories`
      ); // Adjust the endpoint accordingly
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  return (
    <div style={{ padding: "0px 30px", background: "rgb(224, 234, 236)" }}>
      <div style={{ display: "flex" }} className={styles.main}>
        <div>
          <p></p>
          <div style={{ display: "flex" }}>
            <p></p>
            <Text fontSize={{ lg: "47px", base: "30px" }}>e</Text>
            <Text fontSize={{ lg: "47px", base: "30px" }} color={"#ff3e6c"}>
              Style
            </Text>
            <Text fontSize={{ lg: "47px", base: "30px" }}>Wala.com</Text>
          </div>
          <Text textAlign="center">
            Step into Style: Discover Endless Possibilities
          </Text>
          <br />
          {/* <div>
            <p>Office Address</p>
            <p>
              Jama Masjid Road <br></br> Aarif Colony<br></br> Aurangabad{" "}
              <br></br>Maharashtra - 431005<br></br>
              India
            </p>
          </div> */}
        </div>
        <div>
          <p>Shop</p>
          {/* <p onClick={() => navigate("/store?type=Men")}>Men</p>
          <p onClick={() => navigate("/store?type=Women")}>Women</p>
          <p onClick={() => navigate("/store?type=Kids")}>Kids</p>
          <p onClick={() => navigate("/store?q=Baby")}>Baby Care</p>
          <p onClick={() => navigate("/store?q=Beauty")}>Beauty</p> */}
          {categories.map((category, i) => (
            <p key={i} onClick={()=> navigate(`store?category=${category.name}`)}>{category.name}</p>
          ))}
        </div>
        <div>
          <p>Customer Policies</p>
          <p onClick={() => navigate(`/faqs`)}>FAQ</p>
          <p onClick={() => navigate(`/tac`)}>T&C</p>
          <p onClick={() => navigate(`/termsofuse`)}>Terms Of Use</p>
          <p onClick={() => navigate(`/shipping`)}>Shipping</p>
          <p onClick={() => navigate(`/orders`)}>Orders</p>
          <p onClick={() => navigate(`/cancellation`)}>Cancellation</p>
          <p onClick={() => navigate(`/return`)}>Returns</p>
          <p onClick={() => navigate(`/privacypolicy`)}>Privacy policy</p>
        </div>
        <div>
          <p>Social Media</p>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Youtube</p>
          <p>Twitter</p>
        </div>
        {/* <div>
          <p>Contact Us</p>
          <form onSubmit={handleSubmit}>
            <div>
              <textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="   description"
                required
                style={{ width: "100%" }}
              />
            </div>
            <br></br>

            <div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="   email"
                required
                style={{ width: "100%" }}
              />
            </div>
            <br></br>
            <Button
              width={"100%"}
              textColor={"white"}
              bg={"#ff3e6c"}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div> */}
      </div>
      <div className={styles.hr}>
        <div>
          <hr />
        </div>
      </div>

      <div>
        <div>
          <p>
            © 2023 www.estylewala.com Manage by Shirazi Kids Wear. All rights
            reserved
          </p>
        </div>
      </div>

      <div className={styles.hr}>
        <hr />
      </div>
    </div>
  );
}
