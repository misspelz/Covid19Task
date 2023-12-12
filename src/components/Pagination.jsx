import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

const ReusablePaginationControls = ({
  currentPage,
  handlePreviousPage,
  handleNextPage,
  LastPage,
  PreviousPage,
  totalPages,
}) => (
  <div className="flex items-center text-gray-700 text-sm">
    {currentPage > 1 && (
      <div
        className="bg-white p-2 text-gray-700 text-base cursor-pointer font-bold"
        onClick={PreviousPage}
      >
        <AiOutlineDoubleLeft />
      </div>
    )}

    {currentPage > 1 && (
      <div
        className="bg-white p-2 text-gray-700 text-base cursor-pointer font-bold"
        onClick={handlePreviousPage}
      >
        <MdKeyboardArrowLeft />
      </div>
    )}

    <span className="font-semibold">
      {Math.ceil(currentPage)}/{totalPages}
    </span>

    <div
      className="bg-white p-2 text-gray-700 text-base cursor-pointer font-bold"
      onClick={handleNextPage}
    >
      <MdKeyboardArrowRight />
    </div>

    <div
      className="bg-white p-2 text-gray-700 text-base cursor-pointer font-bold"
      onClick={LastPage}
    >
      <AiOutlineDoubleRight />
    </div>
  </div>
);

export default ReusablePaginationControls;
