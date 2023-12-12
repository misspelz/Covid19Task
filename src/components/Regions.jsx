import React, { useEffect, useState } from "react";
import { ListOfRegionsApi } from "../Utils/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import ReusablePaginationControls from "./Pagination";

export const Regions = () => {
  const dispatch = useDispatch();

  const RegionsList = useSelector((state) => state.regions.regions);

  const [getData, setGetData] = useState({});
  // console.log("getData", getData);

  const [loading, setLoading] = useState(true);

  const totalNoOfPages = getData.total;

  const rowsPerPage = 20;

  const [currentPage, setCurrentPage] = useState(1);

  const RegionsData = async () => {
    try {
      setLoading(true);
      let response = await ListOfRegionsApi(rowsPerPage);
      // console.log("res", response);
      if (response && response.status === 200) {
        setGetData(response?.data);
        dispatch({
          type: "REGIONS",
          payload: {
            data: response.data.data,
          },
        });
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

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const PreviousPage = () => {
    setCurrentPage(1);
  };

  const LastPage = () => {
    setCurrentPage(totalNoOfPages / rowsPerPage);
  };

  useEffect(() => {
    RegionsData(currentPage);
  }, [currentPage]);

  return (
    <div className="p-4 lg:px-20 lg:py-4 flex flex-col items-center">
      <h1 className="text-md md:text-lg lg:text-2xl text-center font-bold uppercase lg:py-6">
        List of Region
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="w-full flex flex-col justify-center lg:w-[50%]">
          <table className="border-collapse mt-2 mb-4">
            <thead>
              <tr className="">
                <th className="border border-gray-800 p-2 text-sm md:text-md lg:text-xl">
                  S/N
                </th>
                <th className="border border-gray-800 p-2 text-sm md:text-md lg:text-xl">
                  ISO
                </th>
                <th className="border border-gray-800 p-2 text-sm md:text-md lg:text-xl">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {RegionsList.map((region, index) => (
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

          {RegionsList?.length > 1 && (
            <div className="flex justify-between">
              <div></div>
              <ReusablePaginationControls
                currentPage={currentPage}
                totalPages={getData.last_page}
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
