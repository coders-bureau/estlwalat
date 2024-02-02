import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  VStack,
} from "@chakra-ui/react";
import {isMobile} from 'react-device-detect';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import OrderDetails from "../Components/OrderDetails";
import LoadingPage from "./LoadingPage";
const mobileNumber = localStorage.getItem("MbNumber");
const options = { year: "numeric", month: "long", day: "numeric" };
// console.log(mobileNumber);

const Orders = () => {
  const [isLoading, setisLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingo, setLoadingo] = useState(false);

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    setisLoading(true);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_API}/order/orders`,
    })
      .then((res) => {
        setisLoading(false);

        setOrders(res.data.data);
      })
      .catch((err) => {
        setisLoading(false);

        console.log(err);
      });
  };

  const invoiceGenerate = async (orderNo) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/user/order/invoice`,
        {
          responseType: "blob", // Specify the response type as a blob
          params: {
            orderNo: orderNo, // Pass the orderNo as a query parameter
          },
        }
      );
      if (response) {
        setLoading(false);
      }

      // Create a blob URL for the PDF
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF", error);
      setLoading(false);
    }
  };
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleCancelOrder = async (orderId) => {
    try {
      setLoadingo(true);

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API}/user/cancelorder/${orderId}`
      );

      if (response.data.success) {
        getOrders();
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    } finally {
      setLoadingo(false);
    }
  };

  if (isLoading)
    return (
      <Box height={"200px"}>
        <Navbar />
        <LoadingPage />
      </Box>
    );

  return (
    <>
      <Navbar />
      <VStack
        overflow={"auto"}
        boxShadow={
          "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
        }
        p={4}
      >
        {orders ? (
          <Accordion defaultIndex={orders.map((_, index) => index)}>
            {orders.map((order, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton
                    borderRadius={"5px"}
                    // boxShadow={
                    //   "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
                    // }
                    height={"10vh"}
                    width={{ md: "70vw", base: "90vw" }}
                  >
                   
                  Order #{order.orderNo}{!isMobile? <a>|</a>: <>&nbsp;|&nbsp;</>}{isMobile? null:null}{!isMobile? <a>&nbsp;</a>:null}{" "}
                      {monthNames [parseInt(new Date(order.orderDate)
                        .toLocaleDateString()
                        .split("/")[1]) -1] +
                        " " +
                       
                          new Date(order.orderDate)
                            .toLocaleDateString()
                            .split("/")[0] 
                        +
                        "," +
                        new Date(order.orderDate)
                          .toLocaleDateString()
                          .split("/")[2]}

                        
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  width={{ md: "70vw", base: "90vw" }}
                  pb={"10px"}
                >
                  {order.items.map((item, i) => (
                    <OrderDetails
                      order={order}
                      item={item}
                      i={i}
                      invoiceGenerate={invoiceGenerate}
                      handleCancelOrder={handleCancelOrder}
                      loading={loading}
                      loadingo={loadingo}
                    />
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <>No Orders Yet!</>
        )}
      </VStack>
    </>
  );
};

export default Orders;
