/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import axios from "axios";

export const monthsArr = [
  { value: 1, name: "January" },
  { value: 2, name: "February" },
  { value: 3, name: "March" },
  { value: 4, name: "April" },
  { value: 5, name: "May" },
  { value: 6, name: "June" },
  { value: 7, name: "July" },
  { value: 8, name: "August" },
  { value: 9, name: "September" },
  { value: 10, name: "October" },
  { value: 11, name: "November" },
  { value: 12, name: "December" },
];

const DataTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/all?search=${search}&month=${month}&page=${page}`
        );
        setData(response.data.transactions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search, month, page]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3 bg-purple-200"
        />
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className=" border text-gray-700 text-sm rounded-lg  block  p-2.5 font-semibold"
        >
          <option value="" className="text-gray-800 font-semibold">
            All Months
          </option>
          {monthsArr.map((month) => (
            <option
              key={month.value}
              value={month.value}
              className="text-gray-800 font-semibold"
            >
              {month.name}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-purple-600 text-white font-bold">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Sold</th>
              <th className="py-2 px-4 border">Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-sm font-semibold">
                <td className="py-2 px-4 border">{item.id}</td>
                <td className="py-2 px-4 border">{item.title}</td>
                <td className="py-2 px-4 border hidden md:block ">
                  {item.description}
                </td>
                <td className="py-2 px-4 border">${item.price}</td>
                <td className="py-2 px-4 border">{item.category}</td>
                <td className="py-2 px-4 border">{item.sold ? "Yes" : "No"}</td>
                <td className="py-2 px-4 border">
                  {new Date(item.dateOfSale).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:bg-purple-200"
        >
          Previous
        </button>
        <span >
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:bg-purple-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
