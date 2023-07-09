import { useState, useMemo } from "react";
import UserContext from "@contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "@pages/LandingPage";
import "./App.scss";

function App() {
  const [user, setUser] = useState();

  const userContextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
      <UserContext.Provider value={userContextValue}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <h1>
                    You're connected as : {user.nickname} {user.role}
                  </h1>
                ) : (
                  <LandingPage />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
