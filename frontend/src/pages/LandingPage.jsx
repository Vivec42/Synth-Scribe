import { useReducer, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "@contexts/UserContext";
import CreateAccount from "@components/CreateAccount/Index";
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

const loginInitialState = {
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
  const [registering, setRegistering] = useState(false);
  const [formData, dispatch] = useReducer(loginForm, loginInitialState);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

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

      const fetchedUserData = await axios
        .post("users/login", formData, {
          withCredentials: true,
        })
        .then((response) => response.data);
      if (!fetchedUserData) {
        return alert("Error retrieving user data");
      }

      setUser(fetchedUserData[0]);
      dispatch({ type: "RESET_FORM" });
      return navigate("/");
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
    <section className={style.landing_page}>
      <h1>
        Welcome to <br /> {">"} Synth Scribe
      </h1>
      <CreateAccount
        registering={registering}
        setRegistering={setRegistering}
      />
      <span
        className={`${style.box} ${style[registering ? "hidden" : "visible"]}`}
      >
        <form className={style.form_login} onSubmit={handleSubmit}>
          <input
            type="text"
            name="credentials"
            placeholder="Your nickname/email here..."
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
          <button type="submit">Log In</button>
          <hr />
          <span>
            <p>No account ?</p>
            <button type="button" onClick={() => setRegistering(!registering)}>
              Create one here !
            </button>
          </span>
        </form>
      </span>
    </section>
  );
}

export default LandingPage;
