import React, { useState } from "react";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative  ">
      <button className="text-2xl " onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <div className=" absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-md z-50 ">
          <ul className="">
            <li className="py-2 px-5 hover:bg-gray-100 ">
              <Link to="/hitung" onClick={toggleMenu}>
                Hitung Akar
              </Link>
            </li>
            <hr />
            <li className="py-2 px-5 hover:bg-gray-100">
              <Link to="/data-user" onClick={toggleMenu}>
                Data Per User
              </Link>
            </li>
            <hr />

            <li className="py-2 px-5 hover:bg-gray-100">
              <Link to="/ranking" onClick={toggleMenu}>
                Ranking
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
