import React, { useEffect, useState } from "react";
import axios from "axios";

const AkarBilanganCalculator = () => {
  const [bilangan, setBilangan] = useState("");
  const [bilanganInput, setBilanganInput] = useState("");
  const [hasil, setHasil] = useState("");
  const [waktuPemrosesan, setWaktuPemrosesan] = useState("");
  const [data, setData] = useState([]);
  const [validasiError, setValidasiError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/get-all-data"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCalculate = async () => {
    if (!bilangan) {
      setValidasiError("Masukkan bilangan terlebih dahulu.");
      return;
    }

    if (parseFloat(bilangan) < 0) {
      setValidasiError("Bilangan harus lebih besar atau sama dengan 0.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/hitung-akar",
        {
          bilangan: parseFloat(bilangan),
        }
      );

      setHasil(response.data.akar);
      setWaktuPemrosesan(response.data.waktu_pemrosesan);
      setBilanganInput(bilangan);
      setValidasiError(""); // Hapus pesan validasi jika berhasil
      setBilangan("");
      // Setelah berhasil menyimpan data ke database, tambahkan data baru ke state
      setData([...data, response.data]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="my-8 lg:mx-28 mx-10 min-h-screen ">
      <div className="shadow-lg p-10 border  ">
        <h1 className="text-3xl font-semibold mb-10">
          Kalkulator Akar Bilangan
        </h1>
        <div className="">
          <div className="flex gap-4 justify-between items-center">
            <input
              placeholder="Masukkan bilangan"
              type="number"
              className={`border rounded px-3 py-2 w-[400px] ${
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

        {data.length > 0 && (
          <div className="mt-10 ">
            <div className=" ">
              <table
                className="text-sm text-left text-gray-500 dark:text-gray-400 "
                style={{ width: "100%" }}
              >
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-2 border">Bilangan</th>
                    <th className="px-4 py-2 border ">Hasil Akar</th>
                    <th className="px-4 py-2 border">
                      Waktu Pemrosesan (detik)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr
                      key={item.id}
                      className=" border-b border-gray-800  text-gray-800"
                    >
                      <td className="px-4 py-2 border">{item.bilangan}</td>
                      <td className="px-4 py-2 border">{item.akar}</td>
                      <td className="px-4 py-2 border">
                        {item.waktu_pemrosesan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AkarBilanganCalculator;
