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

    if (parseInt(bilangan) < 0) {
      setValidasiError("Bilangan harus lebih besar atau sama dengan 0.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/hitung-akar",
        {
          bilangan: parseInt(bilangan),
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
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-semibold mb-4">Kalkulator Akar Bilangan</h1>
      <div className="mb-4">
        <label className="block mb-2">Masukkan Bilangan :</label>
        <div className="flex gap-4 justify-center items-center">
          <input
            type="number"
            className={`border rounded px-3 py-2 ${
              validasiError && "border-red-500"
            }`}
            value={bilangan}
            onChange={(e) => setBilangan(e.target.value)}
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
          <h2 className="text-xl font-semibold mb-2">Hasil Akar Bilangan</h2>
          <p className="mb-2 ">Bilangan: {bilanganInput}</p>
          <p className="mb-2">Akar: {hasil}</p>
          <p>Waktu Pemrosesan : {waktuPemrosesan}</p>
        </div>
      )}

      {data.length > 0 && (
        <div className="mt-10 ">
          <h2 className="text-xl font-semibold mb-2">Semua Data</h2>
          <div className=" flex justify-center">
            <table className="text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-2 border">Bilangan</th>
                  <th className="px-4 py-2 border ">Hasil Akar</th>
                  <th className="px-4 py-2 border">Waktu Pemrosesan (detik)</th>
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
  );
};

export default AkarBilanganCalculator;
