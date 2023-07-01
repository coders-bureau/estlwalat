import { Link } from "react-router-dom";
import styles from "../css/Footer.module.css";
import { Button, Text } from "@chakra-ui/react";

let searches =
  "Makeup  Dresses For Girls  T-Shirts  Sandals  Headphones  Babydolls  Blazers For Men  Handbags  Ladies Watches  Bags  Sport Shoes  Reebok Shoes  Puma Shoes  Boxers  Wallets  Tops  Earrings  Fastrack Watches  Kurtis  Nike  Smart Watches  Titan Watches  Designer Blouse  Gowns  Rings  Cricket Shoes  Forever 21  Eye Makeup  Photo Frames  Punjabi Suits  Bikini  Myntra Fashion Show  Lipstick  Saree  Watches  Dresses  Lehenga  Nike Shoes  Goggles  Bras  Suit  Chinos  Shoes  Adidas Shoes  Woodland Shoes  Jewellery  Designers Sarees";

export default function Footer() {
  return (
    <div style={{ padding: "0px 30px", background: "rgb(224, 234, 236)" }}>
      <div style={{display:"flex"}} className={styles.main}>
        <div>
          <p></p>
          <Text>eStyleWala.com</Text>
          <Text>Step into Style: Discover Endless Possibilities</Text>
          <div>
            <p></p>
            <p>Office Address</p>
            <p>
              Jama Masjid Road Aarif Colony Aurangabad Maharashtra - 431005
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
          Description:
          <br></br>
          <textarea
            style={{
              width: "150px",
              borderRadius: "4px",
              borderColor: "black",
            }}
            placeholder="description"
          ></textarea>
          <br></br>
          Email:
          <br></br>
          <input style={{
            width: "150px",
          }} placeholder="email" />
          <br></br>
          <br></br>
          <Button textColor={"white"} bg={"#ff0051"} type="submit">Submit</Button>
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
