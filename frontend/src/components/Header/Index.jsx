import { useState, useEffect } from "react";
import NavMenu from "@components/NavMenu/Index";

import WIP from "@assets/images/Logo-WIP.png";
import style from "@components/Header/Index.module.scss";

function Header() {
  const [burger, setBurger] = useState(false);
  const [actualClass, setActualClass] = useState("off");
  const [actualId1, setActualId1] = useState("off");
  const [actualId2, setActualId2] = useState("off");
  const [actualId3, setActualId3] = useState("off");

  const toggleBurger = () => {
    if (burger) {
      setActualClass("off");
      setActualId1("off");
      setActualId2("off");
      setActualId3("off");
      setBurger(false);
    } else {
      setActualClass("on");
      setActualId1("id1");
      setActualId2("id2");
      setActualId3("id3");
      setBurger(true);
    }
  };

  useEffect(() => {
    if (!burger) {
      setActualClass("off");
      setActualId1("off");
      setActualId2("off");
      setActualId3("off");
    }
  }, [burger]);

  return (
    <>
      <header className={style.header}>
        <section className={style.images}>
          <img src={WIP} alt="Synth-Scribe_Logo" />
          <img src={WIP} alt="Profile_Picture" />
        </section>
        <h1>Home</h1>
        <section className={style.burger_menu}>
          <button type="button" onClick={toggleBurger}>
            <span className={style[actualClass]}>
              <div className={style[actualId1]} />
              <div className={style[actualId2]} />
              <div className={style[actualId3]} />
            </span>
          </button>
        </section>
      </header>
      <NavMenu burger={burger} setBurger={setBurger} />
    </>
  );
}

export default Header;
