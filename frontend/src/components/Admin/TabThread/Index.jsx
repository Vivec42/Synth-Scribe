import { useState, useEffect, useContext } from "react";
import UserContext from "@contexts/UserContext";
import axios from "@services/axios";

import style from "@components/Admin/TabThread/Index.module.scss";

function TabThread() {
  const { user } = useContext(UserContext);
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState(false);
  const [editThread, setEditThread] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

  const fetchThread = async (id) => {
    try {
      const fetchedThreadData = await axios
        .get(`threads/${id}`, {
          withCredentials: true,
        })
        .then((result) => result.data);

      setTitle(fetchedThreadData.title);
      return setDescription(fetchedThreadData.description);
    } catch (err) {
      return alert(err.message);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const handlePost = async (e, edit = false) => {
    e.preventDefault();
    try {
      if (edit) {
        const postResult = await axios.put(
          `threads/${editThread}`,
          { title, description },
          { withCredentials: true }
        );
        if (!postResult) {
          return alert("Error while editing thread");
        }
        alert("Thread edited!");
        setTitle("");
        setDescription("");
        setEditThread(null);
        return fetchThreads();
      }

      const postResult = await axios.post(
        "threads",
        { title, description, user_id: user.id },
        { withCredentials: true }
      );
      if (!postResult) {
        return alert("Error while posting thread");
      }
      alert("New thread posted!");
      setTitle("");
      setDescription("");
      setNewThread(false);
      return fetchThreads();
    } catch (err) {
      return alert(err.message);
    }
  };

  const deleteThread = async (id) => {
    try {
      const result = await axios.delete(`threads/${id}`, {
        withCredentials: true,
      });
      alert(result.data);
      return fetchThreads();
    } catch (err) {
      return alert(err.message);
    }
  };

  return (
    <section className={style.tab_thread}>
      <button
        className={style.new_thread}
        type="button"
        onClick={() => setNewThread(!newThread)}
      >
        {newThread ? "Cancel" : "New Thread"}
      </button>
      {(newThread || editThread) && (
        <form
          onSubmit={(e) =>
            editThread !== null ? handlePost(e, true) : handlePost(e)
          }
        >
          <label>
            <p>Title :</p>
            <input
              type="text"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <p>Description :</p>
            <textarea
              cols="30"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button type="submit">POST</button>
        </form>
      )}
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            {thread.title}{" "}
            <button
              type="button"
              onClick={() => {
                fetchThread(thread.id);
                return setEditThread(thread.id);
              }}
            >
              Edit
            </button>
            <button type="button" onClick={() => deleteThread(thread.id)}>
              Delete the thread !
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TabThread;
