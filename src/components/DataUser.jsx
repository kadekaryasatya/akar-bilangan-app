import React, { useState, useEffect } from "react";
import axios from "axios";
import HamburgerMenu from "./Hamburger";

function DataUser() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user-data");
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="lg:my-8 lg:mx-28  min-h-screen mx-5 my-5 ">
      <div className="flex justify-between mb-10 text-lg">
        <h1 className="lg:text-3xl text-xl font-semibold text-blue-900">
          Data per user
        </h1>
        <HamburgerMenu />
      </div>
      <div className="shadow-lg lg:p-10 p-5 border">
        <button
          className="px-4 py-2 bg-blue-100 text-white rounded hover:bg-blue-200 mb-5 "
          onClick={handleRefresh} // Tambahkan handler yang sesuai
        >
          <img src="/refresh.png" alt="Refresh" className="w-[20px]" />
        </button>
        <div className="overflow-x-auto">
          <table
            className="text-sm text-left text-gray-500 dark:text-gray-400"
            style={{ width: "100%", overflowX: "auto" }}
          >
            <thead className="text-xs uppercase bg-gray-50 dark:bg-blue-900 text-white">
              <tr>
                <th className="lg:px-4 lg:py-2 px-1 py-1 border">NIM</th>
                <th className="lg:px-4 lg:py-2 px-1 py-1 border">
                  Jumlah Input
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.nim} // Gunakan field yang sesuai dengan ID user
                  className="border-b border-gray-800 text-gray-800 text-xs lg:text-sm"
                >
                  <td className="lg:px-4 lg:py-2 px-1 py-1 border">
                    {item.nim}{" "}
                    {/* Ubah menjadi field NIM sesuai dengan respons API */}
                  </td>
                  <td className="lg:px-4 lg:py-2 px-1 py-1 border">
                    {item.jumlah_bilangan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DataUser;
