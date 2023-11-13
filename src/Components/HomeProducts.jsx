// import { Box, Image, SimpleGrid, Spinner } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import loading from "../Assets/loading.gif";
// import noItem from "../Assets/noitems.jpeg";
// import PageNotFound from "../Pages/PageNotFound";
// import SingleProductCom from "./SingleProductCom";

// const PAGE_SIZE = 12;

// function shuffleArray(array) {
//   // Create a copy of the array
//   const shuffledArray = array.slice();
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//   }
//   return shuffledArray;
// }

// const HomeProducts = () => {
//   const { Products, isLoading, isError } = useSelector(
//     (store) => store.AppReducer
//   );
//   const [page, setPage] = useState(1); // Track the current page
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [shuffledProducts, setShuffledProducts] = useState([]);

//   const loadMoreProducts = () => {
//     setLoadingMore(true);
//     setTimeout(() => {
//       const start = (page - 1) * PAGE_SIZE;
//       const end = page * PAGE_SIZE;
//       setDisplayedProducts([
//         ...displayedProducts,
//         ...shuffledProducts.slice(start, end),
//       ]);
//       setPage(page + 1);
//       setLoadingMore(false);
//     }, 1000); // Simulated delay, you can replace this with your API request
//   };

//   useEffect(() => {
//     // Shuffle the Products array when the component mounts
//     setShuffledProducts(shuffleArray(Products));
//   }, [Products]);

//   useEffect(() => {
//     loadMoreProducts(); // Load the first set of products
//   }, [shuffledProducts]);

//   console.log(Products, shuffledProducts, displayedProducts);
//   if (isLoading)
//     return (
//       <>
//         <Box
//           // height={"200px"}
//           borderRadius={100}
//           boxShadow={
//             "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
//           }
//           position={"fixed"}
//           top={{ lg: "50%", md: "50%", base: "40%" }}
//           left={{ lg: "50%", md: "50%", base: "50%" }}
//           transform={"translate(-50% , -50%)"}
//         >
//           <Image
//             w={"50px"}
//             m={"auto"}
//             align={"center"}
//             src={loading}
//             alt="loading"
//           />
//         </Box>
//         <SimpleGrid
//           w="100%"
//           h={"66vh"}
//           // p="0px 20px 20px 20px"
//         ></SimpleGrid>
//       </>
//     );
//   if (isError)
//     return (
//       <>
//         <PageNotFound />
//       </>
//     );
//   return (
//     <>
//       {Products.length !== 0 ? (
//         <Box>
//           <SimpleGrid
//             px={"5vw"}
//             columns={{ lg: "4", md: "3", base: "2" }}
//             spacingX={{ lg: "40px", md: "40px", base: "10px" }}
//             spacingY={{ lg: "30px", md: "30px", base: "10px" }}
//             w="100%"
//             // p="0px 20px 20px 20px"
//           >
//             {displayedProducts?.map((el) => {
//               return <SingleProductCom key={el._id} {...el} />;
//             })}
//           </SimpleGrid>
//           {productsToShow < shuffledProducts.length && (
//             <Box w="100%" textAlign="center">
//               <Button onClick={loadMoreProducts}>Load More</Button>
//             </Box>
//           )}
//           {loadingMore && (
//             <Box w="100%" textAlign="center">
//               <Spinner size="lg" color="teal" mt={4} />
//             </Box>
//           )}

//           {displayedProducts.length === shuffledProducts.length && (
//             <Box textAlign="center" my={4}>
//               <p>No more products to load.</p>
//             </Box>
//           )}
//         </Box>
//       ) : (
//         <Box alignItems="center" display="flex" flexDirection="column">
//           <p>No Items Found</p>
//           <Image
//             p={10}
//             width={{ lg: "20%", base: "100%" }}
//             src={noItem}
//             alt="No Items Found"
//           />
//         </Box>
//       )}
//     </>
//   );
// };

// export default HomeProducts;

import { Box, Image, SimpleGrid, Spinner, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import loading from "../Assets/loading.gif";
import noItem from "../Assets/noitems.jpeg";
import PageNotFound from "../Pages/PageNotFound";
import SingleProductCom from "./SingleProductCom";

const PAGE_SIZE = 12;

function shuffleArray(array) {
  // Create a copy of the array
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const HomeProducts = () => {
  const { Products, isLoading, isError } = useSelector(
    (store) => store.AppReducer
  );
  // const [page, setPage] = useState(1); // Track the current page
  const [loadingMore, setLoadingMore] = useState(false);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState(PAGE_SIZE);

  // const loadMoreProducts = () => {
  //   setLoadingMore(true);
  //   setTimeout(() => {
  //     setProductsToShow(productsToShow + PAGE_SIZE);
  //     setLoadingMore(false);
  //   }, 1000); // Simulated delay, you can replace this with your API request
  // };

  const loadMoreProducts = () => {
    setLoadingMore(true);
    setTimeout(() => {
      const nextProductsToShow = productsToShow + PAGE_SIZE;
      
      if (nextProductsToShow < shuffledProducts.length) {
        setProductsToShow(nextProductsToShow);
      } else {
        // You've reached the end, so reset back to the beginning
        setProductsToShow(PAGE_SIZE);
      }
      
      setLoadingMore(false);
    }, 1000); // Simulated delay, you can replace this with your API request
  };
  console.log('shuffleArray:',shuffledProducts);
  console.log('ara',productsToShow);

  useEffect(() => {
    // Shuffle the Products array when the component mounts
    setShuffledProducts(shuffleArray(Products));
  }, [Products]);

  useEffect(() => {
    setProductsToShow(PAGE_SIZE); // Reset productsToShow when Products change
  }, [shuffledProducts]);

  // console.log(Products, shuffledProducts, displayedProducts);
  if (isLoading)
    return (
      <>
        <Box
          // height={"200px"}
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
        <SimpleGrid
          w="100%"
          h={"66vh"}
          // p="0px 20px 20px 20px"
        ></SimpleGrid>
      </>
    );
  if (isError)
    return (
      <>
        <PageNotFound />
      </>
    );
  return (
    <>
      {Products.length !== 0 ? (
        <Box>
          <SimpleGrid
            px={{ base: "10px", md: "10px", lg: "20px" }}
            columns={{ lg: "4", md: "3", base: "2" }}
            spacingX={{ lg: "40px", md: "40px", base: "10px" }}
            spacingY={{ lg: "30px", md: "30px", base: "10px" }}
            w="100%"
            // p="0px 20px 20px 20px"
          >
            {shuffledProducts.slice(0, productsToShow).map((el) => {
              return <SingleProductCom key={el._id} {...el} />;
            })}
          </SimpleGrid>
          {productsToShow < shuffledProducts.length && (
            <Box padding={10} w="100%" textAlign="center">
              <Button onClick={loadMoreProducts}>Load More</Button>
            </Box>
          )}
          {loadingMore && (
            <Box w="100%" textAlign="center">
              <Spinner size="lg" color="teal" mt={4} />
            </Box>
          )}
        </Box>
      ) : (
        <Box alignItems="center" display="flex" flexDirection="column">
          <p>No Items Found</p>
          <Image
            p={10}
            width={{ lg: "20%", base: "100%" }}
            src={noItem}
            alt="No Items Found"
          />
        </Box>
      )}
    </>
  );
};

export default HomeProducts;

