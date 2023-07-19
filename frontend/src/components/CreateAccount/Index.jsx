import { useReducer, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "@contexts/UserContext";
import axios from "@services/axios";
import PropTypes from "prop-types";
import style from "./Index.module.scss";

const registerInitialState = {
  nickname: "",
  email: "",
  password: "",
};

const createAccountForm = (state, action) => {
  switch (action.type) {
    case "insertNickname":
      return { ...state, nickname: action.payload };
    case "insertEmail":
      return { ...state, email: action.payload };
    case "insertPassword":
      return { ...state, password: action.payload };

    default:
      return state;
  }
};

function CreateAccount({ registering, setRegistering }) {
  const [actualClass, setActualClass] = useState("hidden");
  const [formData, dispatch] = useReducer(
    createAccountForm,
    registerInitialState
  );
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleForms = () => {
    if (!registering) {
      setActualClass("visible");
      setRegistering(true);
    } else {
      setActualClass("hidden");
      setRegistering(false);
    }
    // await setRegistering(registering);
  };

  useEffect(() => {
    if (registering) {
      setActualClass("visible");
    }
  }, [registering]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.nickname === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      return alert("Please fill the form !");
    }

    try {
      const createUserData = await axios
        .post("users/register", formData, {
          withCredentials: true,
        })
        .then((response) => response.data)
        .catch(() => {
          alert("Error to create your account, please try again!!!");
        });

      setUser(createUserData[0]);
      dispatch({ type: "RESET_FORM" });
      return navigate("/login");
    } catch (err) {
      if (!err.code) {
        return alert(`Validation error: ${err?.details[0].message}`);
      }
      if (err.code === "ERR_BAD_REQUEST") {
        return alert(err?.response.data);
      }
      return alert(err?.response.data);
    }
  };

  return (
    <span className={`${style.box} ${style[actualClass]}`}>
      <form className={style.form_create_account} onSubmit={handleSubmit}>
        <input
          type="text"
          name="nickname"
          placeholder="Your nickname here..."
          value={formData.nickname}
          onChange={(e) =>
            dispatch({ type: "insertNickname", payload: e.target.value })
          }
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email here..."
          value={formData.email}
          onChange={(e) =>
            dispatch({ type: "insertEmail", payload: e.target.value })
          }
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Your password here..."
          value={formData.password}
          onChange={(e) =>
            dispatch({ type: "insertPassword", payload: e.target.value })
          }
          required
        />
        <hr />
        <span>
          <button type="submit">Create</button>
          <button type="button" onClick={toggleForms}>
            Cancel
          </button>
        </span>
      </form>
    </span>
  );
}

export default CreateAccount;

CreateAccount.propTypes = {
  registering: PropTypes.bool.isRequired,
  setRegistering: PropTypes.func.isRequired,
};
