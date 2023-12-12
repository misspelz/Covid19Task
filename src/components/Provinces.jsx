import React, { useEffect, useState } from "react";
import { ListOfProvincesApi } from "../Utils/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import ReusablePaginationControls from "./Pagination";

export const Provinces = () => {
  const dispatch = useDispatch();

  const ProvincesList = useSelector((state) => state.provinces.provinces);
  console.log("ProvincesList", ProvincesList);

  const [loading, setLoading] = useState(true);

  const [getData, setGetData] = useState({});
  console.log("getProvincesData", getData);

  const rowsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  // Function to fetch data from the API and update the Redux store
  const ProvincesData = async () => {
    try {
      setLoading(true);
      let response = await ListOfProvincesApi("CHN");
      console.log("ListOfProvincesApi", response);
      if (response && response.status === 200) {
        setGetData(response?.data);
        dispatch({ type: "PROVINCES", payload: { data: response.data.data } });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const PreviousPage = () => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const LastPage = () => {
    setCurrentPage(ProvincesList?.length / rowsPerPage);
  };

  const indexOfLastData = currentPage * rowsPerPage;
  const indexOfFirstData = indexOfLastData - rowsPerPage;
  const PaginatedData = ProvincesList?.slice(indexOfFirstData, indexOfLastData);

  useEffect(() => {
    ProvincesData();
  }, []);

  return (
    <div className="p-4 lg:px-20 lg:py-4 flex flex-col items-center">
      <h1 className="text-md md:text-lg  lg:text-2xl text-center font-bold uppercase lg:py-6">
        List of Provinces by ISO Code
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="w-full flex flex-col justify-center lg:w-[50%]">
          <table className="border-collapse mt-2 mb-4">
            <thead>
              <tr className="">
                <th className="border border-gray-800 p-2 text-sm md:text-md lg:text-xl ">
                  S/N
                </th>
                <th className="border border-gray-800 p-2 text-sm md:text-md lg:text-xl ">
                  ISO
                </th>
                <th className="border border-gray-800 p-2 text-sm md:text-md lg:text-xl ">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {PaginatedData.map((region, index) => (
                <tr key={index}>
                  <td className="border border-gray-800 p-2 text-center text-sm md:text-md lg:text-xl">
                    {(currentPage - 1) * 20 + index + 1}
                  </td>
                  <td className="border border-gray-800 p-2 text-center text-sm md:text-md lg:text-xl">
                    {region.iso}
                  </td>
                  <td className="border border-gray-800 p-2 text-center text-sm md:text-md lg:text-xl">
                    {region.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {PaginatedData?.length > 1 && (
            <div className="flex justify-between">
              <div></div>
              <ReusablePaginationControls
                currentPage={currentPage}
                totalPages={Math.ceil(ProvincesList?.length / rowsPerPage)}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                PreviousPage={PreviousPage}
                LastPage={LastPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
