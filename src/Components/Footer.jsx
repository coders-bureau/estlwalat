import { Link } from "react-router-dom";
import styles from "../css/Footer.module.css";
import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";
let searches =
  "Makeup  Dresses For Girls  T-Shirts  Sandals  Headphones  Babydolls  Blazers For Men  Handbags  Ladies Watches  Bags  Sport Shoes  Reebok Shoes  Puma Shoes  Boxers  Wallets  Tops  Earrings  Fastrack Watches  Kurtis  Nike  Smart Watches  Titan Watches  Designer Blouse  Gowns  Rings  Cricket Shoes  Forever 21  Eye Makeup  Photo Frames  Punjabi Suits  Bikini  Myntra Fashion Show  Lipstick  Saree  Watches  Dresses  Lehenga  Nike Shoes  Goggles  Bras  Suit  Chinos  Shoes  Adidas Shoes  Woodland Shoes  Jewellery  Designers Sarees";

export default function Footer() {
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

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
  return (
    <div style={{ padding: "0px 30px", background: "rgb(224, 234, 236)" }}>
      <div style={{ display: "flex" }} className={styles.main}>
        <div>
          <p></p>
          <div style={{ display: "flex"}}>
            <p></p>
            <Text  fontSize={{lg:"47px",base:"30px"}}>e</Text><Text   fontSize={{lg:"47px",base:"30px"}} color={"#ff3e6c"}>Style</Text><Text   fontSize={{lg:"47px",base:"30px"}}>Wala.com</Text>
          </div>
            <Text textAlign= "center" >Step into Style: Discover Endless Possibilities</Text>
<br />
          <div>

            <p>Office Address</p>
            <p>
              Jama Masjid Road <br></br> Aarif Colony<br></br> Aurangabad{" "}
              <br></br>Maharashtra - 431005<br></br>
              India
            </p>
          </div>
        </div>
        <div>
          <p>Shop</p>
          <p>Men</p>
          <p>Women</p>
          <p>Kids</p>
          <p>Home & Living</p>
          <p>Beauty</p>
          <p>Gift Cards</p>
          <p>Myntra Insider</p>
        </div>
        <div>
          <p>Customer Policies</p>
          <p>FAQ</p>
          <p>T&C</p>
          <p>Terms Of Use</p>
          <p>Shipping</p>
          <p>Track Orders</p>
          <p>Cancellation</p>
          <p>Returns</p>
          <p>Privacy policy</p>
        </div>
        <div>
          <p>Social Media</p>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Youtube</p>
          <p>Twitter</p>
        </div>
        <div>
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
        </div>
      </div>
      <div className={styles.hr}>
        <div>
          <hr />
        </div>
      </div>

      <div>
        <div>
          <p>© 2023 www.estylewala.com. All rights reserved</p>
        </div>
      </div>

      <div className={styles.hr}>
        <hr />
      </div>
    </div>
  );
}
