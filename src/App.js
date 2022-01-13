import "./App.css";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import { useState } from "react";
import CreateBlog from "./components/CreateBlog/CreateBlog";
import Landing from "./components/LandingPage/Landing";
import login from "./login.js";

function App() {
  const [theme, setTheme] = useState("light");
  const toggleMode = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.style.backgroundColor = "#2d3237";
    } else {
      setTheme("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const loginWithDeSo = () => {
    login();
  };

  let navbarContent = {
    toogleSwitch: true,
    settingButton: true,
    publishButton: true,
    loginButton: false,
  }; // for /create navbar component

  return (
    <Router>
      <Switch>
        <Route
          path='/'
          element={
            <>
              <Navbar
                mode={theme}
                toggleMode={toggleMode}
                loginWithDeSo={loginWithDeSo}
              />
              <Landing mode={theme} loginWithDeso={loginWithDeSo} />
            </>
          }></Route>
        <Route
          path='/create'
          element={
            <>
              <Navbar
                mode={theme}
                toggleMode={toggleMode}
                navbarContent={navbarContent}
              />
              <CreateBlog mode={theme} />
            </>
          }></Route>
      </Switch>
    </Router>
  );
}

export default App;
