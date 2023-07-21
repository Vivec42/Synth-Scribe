import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "@services/axios";
import moment from "moment/min/moment-with-locales";

import style from "@components/ThreadsNav/Index.module.scss";

function NavThreads() {
  const [threads, setThreads] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const fetchThreads = async () => {
    try {
      const fetchedThreadsData = await axios
        .get("threads/names", {
          withCredentials: true,
        })
        .then((result) => result.data);

      return setThreads(fetchedThreadsData);
    } catch (err) {
      return alert(err.message);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <ul className={`${style.nav_threads} ${isOpen ? style.open : ""}`}>
      <button
        type="button"
        className={style.arrow}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{">>"}</span>
      </button>
      {threads?.map((thread) => (
        <li key={thread.id}>
          <Link
            style={{ color: "white" }}
            to={`/threads/${thread.id}`}
            onClick={() => setIsOpen(false)}
          >
            <h2>{thread.title} </h2>
            <span>
              {moment(thread.creationDate).format("MMMM Do YYYY, hh:mm:ss")}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavThreads;
