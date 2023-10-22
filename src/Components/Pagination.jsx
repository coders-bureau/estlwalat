import { Box, Button } from "@chakra-ui/react";
import React from "react";

const Pagination = ({
  setCurrentPage,
  handlePage,
  currentPage,
  totalPages,
}) => {
  // totalPages = Math.ceil(+totalPages / 12);
  // console.log("cp",currentPage,"tp",totalPages);
  let buttonArr = [];

  const maxVisibleButtons = 10; // The maximum number of buttons to display
  const halfMaxVisibleButtons = Math.floor(maxVisibleButtons / 2);

  const calculatePageRange = () => {
    let startPage = Math.max(1, currentPage - halfMaxVisibleButtons);
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    // Adjust startPage when the endPage is at the maximum limit
    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxVisibleButtons + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  buttonArr = calculatePageRange();

  // for (let i = 0; i < +totalPages; i++) {
  //   buttonArr.push(i + 1);
  // }

  const handlePageChange = (page) => {
    handlePage(page);
  };

  // console.log(currentPage , totalPages)
  return (
    <div>
      <Box mt={"2rem"} mb={"1rem"}>
        <Button
          p={2}
          fontSize={{ sm: "0.7rem", lg: "1rem" }}
          isDisabled={currentPage === 1}
          onClick={() => handlePageChange(-1)}
        >
          Previous
        </Button>
        {buttonArr.map((btn, i) => (
          <Button
            // _hover={{ backgroundColor: "", color: "white" }}
            display={{ base: "none", md: "inline-block" }}
            p={2}
            fontSize={{ sm: "0.7rem" }}
            onClick={() => setCurrentPage(btn)}
            m={"0 0.2rem"}
            key={i}
            style={
              currentPage === btn
                ? { backgroundColor: "#ff3e6f", color: "white" }
                : null
            }
          >
            {btn}
          </Button>
        ))}
        <Button display={{ md: "none", base: "inline-block" }} isDisabled>
          {currentPage}
        </Button>
        <Button
          p={2}
          fontSize={{ sm: "0.7rem", lg: "1rem" }}
          isDisabled={currentPage === totalPages || totalPages === 0}
          onClick={() => handlePageChange(1)}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default Pagination;
