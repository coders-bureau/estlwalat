import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from "@chakra-ui/react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const FAQ = () => {
  const faqData = [
    {
      question: "How do I place an order?",
      answer:
        "To place an order on eStyleWala, follow these steps:\n1. Browse our collection and select the desired item.\n2. Choose the appropriate size, color, and quantity.\n3. Add the item to your shopping cart.\n4. Review your cart and proceed to checkout.\n5. Provide your shipping and payment information.\n6. Review your order details and confirm the purchase.\n7. You will receive an order confirmation email with the details of your purchase.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods, including credit cards (Visa, MasterCard, American Express), debit cards, and PayPal. We ensure that all transactions are secure and your payment information is protected.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, we will provide you with a tracking number and a link to track your package. You can enter the tracking number on our website or the courier company's website to get real-time updates on the status of your order.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We have a hassle-free return policy. If you are not satisfied with your purchase, you can return the item within 30 days of delivery. Please ensure that the item is unused, in its original condition, and with all tags and packaging intact. Contact our customer support team to initiate the return process.",
    },
    {
      question:
        "Why are there different prices for the same product? Is it legal?",
      answer:
        "eStyleWala is an online marketplace platform that enables independent sellers to sell their products to buyers. The prices are solely decided by the sellers, and eStyleWala does not interfere in the same. There could be a possibility that the same product is sold by different sellers at different prices. eStyleWala rightfully fulfils all legal compliances of onboarding multiple sellers on its forum as it is a marketplace platform.",
    },
    {
      question: "How do I login on eStyleWala??",
      answer:
        'Enter your mobile number and OTP, then choose your method of login under "Already have an account?". Once you have entered the details, you will be logged in to your account. Next time onwards, you can use your mobile and OTP for easy login.',
    },

    // Add more FAQ data here...
  ];

  return (
    <>
    <Navbar/>
      <Box padding={{lg: "50px 200px" ,md: "25px 50px" ,base: "20px 30px" }}>
        <Box borderBottomColor={"black"} borderBottom={"2px"}>
          <Heading textAlign={"center"} as="h1" mb={4}>
            Frequently Asked Questions
          </Heading>
        </Box>
        <br />
        <Accordion allowMultiple>
          {faqData.map((faq, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {faq.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
      <Footer />
    </>
  );
};

export default FAQ;
