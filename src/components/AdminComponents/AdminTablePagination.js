import Pagination from "components/UI/Pagination";
import React, { useState } from "react";

const AdminTablePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const OnIncreaseHandler = () => {
    if (currentPage > totalPages - 1) return null;
    setCurrentPage(currentPage + 1);
  };

  const onDecreaseHandler = () => {
    if (currentPage < 2) return null;
    setCurrentPage(currentPage - 1);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onIncrease={OnIncreaseHandler}
      onDecrease={onDecreaseHandler}
    />
  );
};

export default AdminTablePagination;
