import { useReducer, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "@contexts/UserContext";
import axios from "@services/axios";
import style from "@pages/LandingPage.module.scss";
import { schemaLoginNickname, schemaLoginEmail } from "../joiSchemas";

const determineCredentials = (credentials) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(credentials)) {
    return "email";
  }
  return "nickname";
};

const initialState = {
  credentials: "",
  password: "",
};

const loginForm = (state, action) => {
  switch (action.type) {
    case "updateCredentials":
      return { ...state, credentials: action.payload };
    case "updatePassword":
      return { ...state, password: action.payload };

    default:
      return state;
  }
};

function LandingPage() {
  const [formData, dispatch] = useReducer(loginForm, initialState);
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.credentials === "" || formData.password === "") {
      return alert("Please fill the form !");
    }
    try {
      const credentialType = determineCredentials(formData.credentials);
      const validData =
        credentialType === "email"
          ? await schemaLoginEmail.validateAsync(formData)
          : await schemaLoginNickname.validateAsync(formData);
      if (!validData) {
        return alert("Please fill the form or review your credentials !");
      }

      const userData = await axios
        .post("users/login", formData, {
          withCredentials: true,
        })
        .then((response) => response.data);
      if (!userData) {
        return alert("Error retrieving user data");
      }

      setUser(userData[0]);
      dispatch({ type: "RESET_FORM" });
      return Navigate("/");
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
    <section className={style.section_login}>
      <h2>Welcome to Synth Scribe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="credentials"
          placeholder="Your nickname here..."
          value={formData.credentials}
          onChange={(e) =>
            dispatch({ type: "updateCredentials", payload: e.target.value })
          }
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Your password here..."
          value={formData.password}
          onChange={(e) =>
            dispatch({ type: "updatePassword", payload: e.target.value })
          }
          required
        />
        <button type="submit">Sign in</button>
        <span>
          <p>No account ?</p>
          <button type="button">Create one here !</button>
        </span>
      </form>
    </section>
  );
}

export default LandingPage;
