import { useContext } from "react";
import UserContext from "@contexts/UserContext";

import style from "@pages/HomePage.module.scss";

function HomePage() {
  const { user } = useContext(UserContext);
  return <h1 className={style.wip}>You're connected as : {user?.nickname}</h1>;
}

export default HomePage;
