import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { navigationItems } from "../assets/data/constants";
import { Fade } from "hamburger-react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const location = useLocation();

  const [openNavigation, setOpenNavigation] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex gap-10 justify-between px-5 items-center pt-3 md:pb-2 bg-gradient-to-b z-50 from-main to-95% to-secondary text-[#fff] w-full shadow-[2px_0px_30px_white] rounded-b-md ">
      {/* Logo Box */}
      <div className="md:w-fit px-5">
        <Link to="/">
          <h1 className="font-AS-3D-Bold text-3xl whitespace-nowrap hover:scale-105 ">
            Ash <span className="text-2xl">& </span>Moon
          </h1>
        </Link>
      </div>
      {/* Navigation */}
      <nav className="lg:flex lg:w-full">
        {/* Nivbatioan button for Smaller Screens */}
        <button className="lg:hidden ">
          <Fade
            toggled={openNavigation}
            toggle={setOpenNavigation}
            direction="right"
            size={25}
          />
        </button>
        <ul
          className={`bg-gradient-to-b from-secondary to-main absolute w-full rounded-b-[30px] shadow-bg-light/80 shadow-lg left-0 text-center py-2 lg:static  lg:bg-none lg:flex  lg:items-center lg:justify-arounds lg:shadow-none  ${
            openNavigation ? "z-50" : "hidden"
          }`}
        >
          <div className="md:flex md:w-full md:justify-center md:gap-10 ">
            {navigationItems.map((item) => (
              <Link
                to={item.link}
                key={item.id}
                onClick={() => setOpenNavigation(false)}
              >
                <li
                  className={`my-2 font-AS text-2xl tracking-widest  ${
                    location.pathname === item.link
                      ? "font-AS text-accent"
                      : "font-AS-Outline hover:font-AS-Bullet"
                  } `}
                >
                  {item.title}
                </li>
              </Link>
            ))}
          </div>
          <div className="py-2 flex items-center  justify-center gap-4 text-2xl md:gap-6 md:pl-auto px-5 flex-col md:flex-row ">
            <div className="flex gap-5 items-center">
              <Link to="/cart" onClick={() => setOpenNavigation(false)}>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className={` ${
                    location.pathname === "/cart" ? "text-accent" : ""
                  }`}
                />
              </Link>
              {user && user.role === "admin" ? (
                <Link
                  to="addNew"
                  className={`my-2 font-AS text-6xl tracking-widest ${
                    location.pathname === "/addNew"
                      ? "font-AS"
                      : "font-AS-Outline hover:font-AS-Bullet"
                  }`}
                >
                  +
                </Link>
              ) : null}
            </div>
            {user ? (
              // If the user is logged in, show Profile Button
              <>
                <Link to="/profile" onClick={() => setOpenNavigation(false)}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className={` ${
                      location.pathname === "/profile" ? "text-accent" : ""
                    }`}
                  />
                </Link>
              </>
            ) : (
              // If the user is not logged in, show Login Button
              <Link
                to="/login"
                onClick={() => setOpenNavigation(false)}
                className="whitespace-nowrap text-2xl pl-3 pr-4 py-1 font-AS-3D border-2 rounded-lg hover:bg-white hover:font-AS-3D-Bold hover:text-main"
              >
                Log In
              </Link>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
