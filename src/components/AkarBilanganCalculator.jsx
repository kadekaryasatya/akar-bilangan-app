import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const AkarBilanganCalculator = () => {
  const [bilangan, setBilangan] = useState("");
  const [bilanganInput, setBilanganInput] = useState("");
  const [hasil, setHasil] = useState("");
  const [waktuPemrosesan, setWaktuPemrosesan] = useState("");
  const [data, setData] = useState([]);
  const [validasiError, setValidasiError] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [sortDirection, setSortDirection] = useState("asc"); // Default: ascending

  // Fungsi untuk mengganti arah pengurutan
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Fungsi untuk mengurutkan data berdasarkan waktu pemrosesan
  const sortDataByProcessingTime = () => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.waktu_pemrosesan - b.waktu_pemrosesan;
      } else {
        return b.waktu_pemrosesan - a.waktu_pemrosesan;
      }
    });
    setData(sortedData);
    toggleSortDirection(); // Mengganti arah pengurutan setelah pengurutan selesai
  };

  // Menjalankan fungsi pengurutan ketika tombol "Sort" ditekan
  const handleSort = () => {
    sortDataByProcessingTime();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://akar-kuadrat-bilangan.azurewebsites.net/api/get-all-data"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCalculate = async () => {
    // if (!bilangan) {
    //   setValidasiError("Masukkan bilangan terlebih dahulu.");
    //   return;
    // }

    // if (parseFloat(bilangan) < 0) {
    //   setValidasiError("Bilangan harus lebih besar atau sama dengan 0.");
    //   return;
    // }

    try {
      const response = await axios.post(
        "https://akar-kuadrat-bilangan.azurewebsites.net/api/hitung-akar",
        {
          bilangan: bilangan,
        }
      );

      setHasil(response.data.akar);
      setWaktuPemrosesan(response.data.waktu_pemrosesan);
      setBilanganInput(bilangan);
      setValidasiError(false);
      // Setelah berhasil menyimpan data ke database, tambahkan data baru ke state
      setData([...data, response.data]);
      toast.success("Successful input data", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } catch (error) {
      // Handle Axios errors
      if (error.response && error.response.data && error.response.data.error) {
        // If the error response contains an "error" field
        const errorMessage = error.response.data.error.bilangan[0];
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
        setValidasiError(true);
      } else {
        // Handle other errors
        console.error("Error:", error);
        toast.error("An error occurred", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="lg:my-8 lg:mx-28  min-h-screen mx-5 my-5">
      <ToastContainer />
      <div className="shadow-lg p-10 border  ">
        <div className="flex justify-between items-center mb-10">
          <h1 className="lg:text-3xl text-xl font-semibold text-blue-900">
            Kalkulator Akar Bilangan
          </h1>
          <button
            className="px-4 py-2 bg-blue-100 text-white rounded hover:bg-blue-200"
            onClick={handleRefresh} // Tambahkan handler yang sesuai
          >
            <img src="/refresh.png" alt="Refresh" className="w-[20px]" />
          </button>
        </div>

        <div className="">
          <div className="lg:flex gap-4 justify-between items-center">
            <input
              placeholder="Masukkan bilangan"
              type="text"
              className={` border-[2px] rounded px-3 py-2 lg:w-1/2 w-full ${
                validasiError && "border-red-500"
              }`}
              value={bilangan}
              onChange={(e) => setBilangan(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCalculate(); // Panggil fungsi handleCalculate ketika tombol Enter ditekan
                }
              }}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full lg:w-[200px] mt-5 lg:mt-0"
              onClick={handleCalculate}
            >
              Hitung Akar
            </button>
          </div>
          {validasiError && (
            <div className="text-red-500 mt-1">{validasiError}</div>
          )}
        </div>

        {hasil && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <h2 className="text-lg font-semibold mb-1">Hasil </h2>
            <p className="mb-1 ">Bilangan: {bilanganInput}</p>
            <p className="mb-1">Akar: {hasil}</p>
            <p>Waktu Pemrosesan : {waktuPemrosesan}</p>
          </div>
        )}

        {data.length > 0 ? (
          <div className="mt-10  ">
            <div className="flex justify-end"></div>
            <div className=" overflow-x-auto">
              <table
                className="text-sm text-left text-gray-500 dark:text-gray-400"
                style={{ width: "100%", overflowX: "auto" }}
              >
                <thead className="text-xs  uppercase bg-gray-50 dark:bg-blue-900 text-white ">
                  <tr>
                    <th className="lg:px-4 lg:py-2 px-1 py-1 border">
                      Bilangan
                    </th>
                    <th className="lg:px-4 lg:py-2 px-1 py-1 border ">
                      Hasil Akar
                    </th>
                    <th
                      className="lg:px-4 lg:py-2 px-1 py-1 border cursor-pointer"
                      onClick={handleSort}
                    >
                      Waktu Pemrosesan (detik){" "}
                      <span>
                        <button className=" ">
                          <FontAwesomeIcon icon={faSort} />
                        </button>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr
                      key={item.id}
                      className=" border-b border-gray-800  text-gray-800 text-xs lg:text-sm"
                    >
                      <td className="lg:px-4 lg:py-2 px-1 py-1 border">
                        {item.bilangan}
                      </td>
                      <td className="lg:px-4 lg:py-2 px-1 py-1 border">
                        {item.akar}
                      </td>
                      <td className="lg:px-4 lg:py-2 px-1 py-1 border">
                        {item.waktu_pemrosesan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className=" mt-4 ">
                {Array.from({ length: totalPages }, (v, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-2 py-1 mx-[1px] text-xs lg:text-base ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    } rounded`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <h1 className="mt-10 flex justify-center">No data available</h1>
        )}
      </div>
    </div>
  );
};

export default AkarBilanganCalculator;
