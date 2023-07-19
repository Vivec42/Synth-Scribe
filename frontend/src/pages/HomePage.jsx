import { useContext } from "react";
import UserContext from "@contexts/UserContext";

function HomePage() {
  const { user } = useContext(UserContext);
  return <h1>You're connected as : {user?.nickname}</h1>;
}

export default HomePage;
