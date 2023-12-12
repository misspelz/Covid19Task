import React, { useEffect, useState } from "react";
import { ListOfReportsApi } from "../Utils/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import ReusablePaginationControls from "./Pagination";

export const Reports = () => {
  const dispatch = useDispatch();

  const ReportsList = useSelector((state) => state.reports.reports);

  const [getData, setGetData] = useState({});
  console.log("getReportsData", getData);

  const [loading, setLoading] = useState(true);

  const totalNoOfPages = getData.total;

  const rowsPerPage = 20;

  const [currentPage, setCurrentPage] = useState(1);

  const ReportsData = async () => {
    try {
      setLoading(true);
      let response = await ListOfReportsApi(rowsPerPage);
      console.log("reports", response);
      if (response && response.status === 200) {
        setGetData(response?.data);
        dispatch({
          type: "REPORTS",
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
    ReportsData(currentPage);
  }, [currentPage]);

  return (
    <div className="p-4 lg:px-20 lg:py-4 flex flex-col items-center">
      <h1 className="text-md md:text-lg lg:text-2xl text-center font-bold uppercase lg:py-6">
        List of Reports
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="w-full flex flex-col justify-center overflow-x-scroll lg:overflow-hidden">
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
                <th className="border border-gray-800 p-2 text-sm md:text-md lg:text-xl">
                  Active
                </th>
                <th className="border border-gray-800 p-2 text-sm md:text-md lg:text-xl">
                  Confirmed
                </th>
                <th className="border border-gray-800 p-2 text-sm md:text-md lg:text-xl">
                  Deaths
                </th>
                <th className="border border-gray-800 p-2 text-sm md:text-md lg:text-xl">
                  Fatality Rate
                </th>
                <th className="border border-gray-800 p-2 text-sm md:text-md lg:text-xl">
                  Last Update
                </th>
              </tr>
            </thead>
            <tbody>
              {ReportsList.map((report, index) => (
                <tr key={index}>
                  <td className="border border-gray-800 p-2 text-center text-sm md:text-md lg:text-xl">
                    {(currentPage - 1) * 20 + index + 1}
                  </td>
                  <td className="border border-gray-800 p-2 text-center text-sm md:text-md lg:text-xl">
                    {report.iso}
                  </td>
                  <td className="border border-gray-800 p-2 text-center text-sm md:text-md lg:text-xl">
                    {report.name}
                  </td>
                  <td className="border border-gray-800 p-2 text-center text-sm md:text-md lg:text-xl">
                    {report.active}
                  </td>
                  <td className="border border-gray-800 p-2 text-center text-sm md:text-md lg:text-xl">
                    {report.confirmed}
                  </td>
                  <td className="border border-gray-800 p-2 text-center text-sm md:text-md lg:text-xl">
                    {report.deaths}
                  </td>
                  <td className="border border-gray-800 p-2 text-center text-sm md:text-md lg:text-xl">
                    {report.fatality_rate}
                  </td>
                  <td className="border border-gray-800 p-2 text-center text-sm md:text-md lg:text-xl">
                    {report.last_update}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {ReportsList?.length > 1 && (
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
