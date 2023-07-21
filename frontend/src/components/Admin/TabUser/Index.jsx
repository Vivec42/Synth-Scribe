import { useState, useEffect } from "react";
import axios from "@services/axios";

import style from "@components/Admin/TabUser/Index.module.scss";

function TabUser() {
  const [userList, setUserList] = useState([]);

  const fetchUser = async () => {
    try {
      const fetchedUsersData = await axios
        .get("users", {
          withCredentials: true,
        })
        .then((result) => result.data);
      return setUserList(fetchedUsersData);
    } catch (err) {
      return alert(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const banUser = async (id) => {
    try {
      const banUserStatus = await axios.put(
        `users/ban/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      alert(banUserStatus.data);
      return fetchUser();
    } catch (err) {
      return alert(err.message);
    }
  };

  return (
    <section className={style.tab_user}>
      <ul>
        {userList.map((user) => (
          <li key={user.id}>
            {user.nickname}{" "}
            <button type="button" onClick={() => banUser(user.id)}>
              {user.banned ? "NAB REMMAH" : "BAN HAMMER"}
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TabUser;
