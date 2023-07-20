import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import UserContext from "@contexts/UserContext";

import WIP from "@assets/images/Logo-WIP.png";
import style from "@components/NavMenu/Index.module.scss";

function NavMenu({ burger, setBurger }) {
  const [actualClass, setActualClass] = useState("hidden");
  const { user } = useContext(UserContext);

  const toggleNavMenu = () => {
    if (burger) {
      setActualClass("hidden");
      setBurger(false);
    } else {
      setActualClass("visible");
      setBurger(true);
    }
  };

  useEffect(() => {
    if (burger) {
      setActualClass("visible");
    } else {
      setActualClass("hidden");
    }
  }, [burger]);

  return (
    <span className={style.nav_box}>
      <nav className={`${style.nav} ${style[actualClass]}`}>
        <Link to="/threads" onClick={toggleNavMenu}>
          Threads
        </Link>
        <Link to="/chat" onClick={toggleNavMenu}>
          Chat <img src={WIP} alt="" />
        </Link>
        <Link to="/profile" onClick={toggleNavMenu}>
          Profile <img src={WIP} alt="" />
        </Link>
        <Link to="/support" onClick={toggleNavMenu}>
          Support <img src={WIP} alt="" />
        </Link>
        {user?.role === "MODO" ||
          (user?.role === "ADMIN" && (
            <Link to="/modo-panel" onClick={toggleNavMenu}>
              Modo Panel <img src={WIP} alt="" />
            </Link>
          ))}
        {user?.role === "ADMIN" && (
          <Link to="/admin-panel" onClick={toggleNavMenu}>
            Admin Panel
          </Link>
        )}
      </nav>
    </span>
  );
}

export default NavMenu;

NavMenu.propTypes = {
  burger: PropTypes.bool.isRequired,
  setBurger: PropTypes.func.isRequired,
};
