import { useState, useMemo, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import UserContext from "@contexts/UserContext";
import LandingPage from "@pages/LandingPage";
import HomePage from "@pages/HomePage";
import Header from "@components/Header/Index";
import Footer from "@components/Footer/Index";
import synthBG from "@assets/videos/synth_bg.mp4";
import "./App.scss";
import "@assets/fonts/BTTF.ttf";
import "@assets/fonts/zekton.otf";

function App() {
  const [user, setUser] = useState({});

  const checkConnection = async () => {
    try {
      const data = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}users/refreshToken`, {
          withCredentials: true,
        })
        .then((result) => result.data);
      return setUser(data);
    } catch (err) {
      return alert(err.data, "error");
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <main className="App">
      <video autoPlay muted loop disablePictureInPicture className="synth-bg">
        <source src={synthBG} type="video/mp4" />
      </video>

      <UserContext.Provider
        value={useMemo(() => ({ user, setUser }), [user, setUser])}
      >
        <BrowserRouter>
          {user.id && <Header />}
          <Routes>
            <Route
              path="/login"
              element={!user?.id ? <LandingPage /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={!user?.id ? <Navigate to="/login" /> : <HomePage />}
            />
            {/* {user?.role === "ADMIN" && <Route
              path="/admin"
              element={<AdminPage />}
            />} */}
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      <Footer />
    </main>
  );
}

export default App;
