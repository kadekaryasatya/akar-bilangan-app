import React, { useState, useEffect } from "react";
import axios from "axios";
import HamburgerMenu from "./Hamburger";

function Ranking() {
  const [waktuTercepat, setWaktuTercepat] = useState(null);
  const [waktuTerlambat, setWaktuTerlambat] = useState(null);
  const [rataRata, setRataRata] = useState(null);

  useEffect(() => {
    // Fetch data for fastest processing time
    axios
      .get("http://127.0.0.1:8000/api/get-lowest-processing-time")
      .then((response) => {
        setWaktuTercepat(response.data.waktu_pemrosesan);
      });

    // Fetch data for slowest processing time
    axios
      .get("http://127.0.0.1:8000/api/get-highest-processing-time")
      .then((response) => {
        setWaktuTerlambat(response.data.waktu_pemrosesan);
      });

    // Fetch data for average processing time
    axios
      .get("http://127.0.0.1:8000/api/average-processing-time")
      .then((response) => {
        setRataRata(response.data.rata_rata_waktu_pemrosesan);
      });
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="lg:my-8 lg:mx-28  min-h-screen mx-5 my-5 ">
      <div className="flex justify-between mb-10 text-lg">
        <h1 className="lg:text-3xl text-xl font-semibold text-blue-900">
          Ranking
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
        <table
          className="text-lg  text-gray-500 dark:text-gray-400  text-center"
          style={{ width: "100%", overflowX: "auto" }}
        >
          <thead className="text-xs uppercase bg-gray-50 dark:bg-blue-900 text-white">
            <tr>
              <th className="lg:px-4 lg:py-2 px-1 py-1 border lg:text-lg ">
                Waktu Pemrosesan Tercepat (detik)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800 text-gray-800 text-xs lg:text-lg">
              <td className="lg:px-4 lg:py-2 px-1 py-1 border-2 font-semibold ">
                {waktuTercepat}
              </td>
            </tr>
          </tbody>
        </table>

        <table
          className="text-lg text-center text-gray-500 dark:text-gray-400 mt-5"
          style={{ width: "100%", overflowX: "auto" }}
        >
          <thead className="text-xs uppercase bg-gray-50 dark:bg-blue-900 text-white">
            <tr>
              <th className="lg:px-4 lg:py-2 px-1 py-1 border lg:text-lg">
                Waktu Pemrosesan Terlambat (detik)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800 text-gray-800 text-xs lg:text-lg">
              <td className="lg:px-4 lg:py-2 px-1 py-1 border-2 font-semibold">
                {waktuTerlambat}
              </td>
            </tr>
          </tbody>
        </table>

        <table
          className="text-lg text-center text-gray-500 dark:text-gray-400 mt-5"
          style={{ width: "100%", overflowX: "auto" }}
        >
          <thead className="text-xs uppercase bg-gray-50 dark:bg-blue-900 text-white">
            <tr>
              <th className="lg:px-4 lg:py-2 px-1 py-1 border lg:text-lg">
                Rata-rata Waktu Pemrosesan (detik)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800 text-gray-800 text-xs lg:text-lg">
              <td className="lg:px-4 lg:py-2 px-1 py-1 border-2 font-semibold">
                {rataRata}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ranking;
