import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "@services/axios";
import NavThreads from "@components/ThreadsNav/Index";

import style from "@pages/ThreadsPage.module.scss";

function ThreadPage() {
  const [thread, setThread] = useState({});
  const { id } = useParams();

  const fetchThread = async () => {
    try {
      const fetchedThreadData = await axios
        .get(`threads/${id}`, {
          withCredentials: true,
        })
        .then((result) => result.data);

      return setThread(fetchedThreadData);
    } catch (err) {
      return alert(err.message);
    }
  };

  useEffect(() => {
    fetchThread();
  }, [id]);

  return (
    <section className={style.thread}>
      <NavThreads />
      {thread.id && (
        <div>
          <h1 style={{ color: "white", fontSize: "42px" }}>
            {thread.id} - {thread.title} by {thread.nickname}
          </h1>
          <p>{thread.description}</p>
        </div>
      )}
    </section>
  );
}

export default ThreadPage;
