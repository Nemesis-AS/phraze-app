import "./App.css";
import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import CreateBlog from "./components/CreateBlog/CreateBlog";
import Landing from "./components/LandingPage/Landing";
import Feed from "./components/Feed/Feed";
import Post from "./components/Post/Post";

import DesoIdentity from './utils/desoIdentity';
import DesoApi from './utils/desoApi';
const IdentityUsersKey = "identityUsersV2";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const [loggedIn, setLoggedIn] = useState(false);
  const [publicKey, setSetPublicKey] = useState(null);
  const [desoIdentity, setDesoIdentity] = useState(null);
  const [desoApi, setDesoApi] = useState(null);
  const [alerts, setAlerts] = useState(null);

  useEffect(() => {
    const di = new DesoIdentity();
    setDesoIdentity(di);
    const da = new DesoApi();
    setDesoApi(da);

    let user = {};
    if (localStorage.getItem(IdentityUsersKey) === 'undefined'){
      user = {};
    } else if (localStorage.getItem(IdentityUsersKey)){
      user = JSON.parse(localStorage.getItem(IdentityUsersKey) || '{}');
    };

    if(user.publicKey){
        setLoggedIn(true);
        setSetPublicKey(user.publicKey);
    };

    // Little Theme fix
    document.body.style.backgroundColor = theme === "light" ? "white" : "#2d3237";
  }, [theme]);

  const login = async () => {
    const user = await desoIdentity.loginAsync(3);
    setSetPublicKey(user.publicKey);
    setLoggedIn(true);
  };

  const logout = async () => {
    const result = await desoIdentity.logout(publicKey);
    setSetPublicKey(null);
    setLoggedIn(false);
  };

  const submitPost = async ({ title, tags, coverImg, body }) => {
    console.log("Submitting...");
    const publicKey = JSON.parse(localStorage.getItem(IdentityUsersKey)).publicKey;

    // Upload Image
    const jwt = await desoIdentity.getJWT();
    let imgPayload = await desoApi.uploadImage(coverImg, publicKey, jwt);

    const submittedPost = await desoApi.submitPost(publicKey, body, {title, tags: JSON.stringify(tags)}, "", [imgPayload.ImageURL]);
    const transactionHex = submittedPost.TransactionHex;
    const signedTransaction = await desoIdentity.signTxAsync(transactionHex);
    const submitTransaction = await desoApi.submitTransaction(signedTransaction);
    createAlert("success", "Blog Published Successfully!");
  };

  const createAlert = (theme, text) => {
    let alertEl = (<div className={`alert alert-${theme} alert-dismissible fade show`} role="alert">
      {text}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>);
    setAlerts(alertEl);
  };

  const toggleMode = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.style.backgroundColor = "#2d3237";
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.body.style.backgroundColor = "white";
      localStorage.setItem("theme", "light");
    }
  };

  let navbarContent = {
    toogleSwitch: true,
    settingButton: true,
    publishButton: true,
    loginButton: false,
    createPost: true,

  }; // for /create navbar component

  return (
    <>
    <Router>
      <Switch>
        <Route
          path='/'
          element={
            loggedIn ? (<>         
            <Navbar
              mode={theme}
              toggleMode={toggleMode}
              navbarContent={navbarContent}
            /> <Feed mode={theme} /></>) : (<>
              <Navbar
                mode={theme}
                toggleMode={toggleMode}
                loginWithDeSo={login}
              />
              <Landing mode={theme} loginWithDeso={login} loginStatus={loggedIn} />
            </>)
          }
        ></Route>
        <Route
          path='/create'
          element={
            localStorage.getItem(IdentityUsersKey) ?
            <>
              <Navbar
                mode={theme}
                toggleMode={toggleMode}
                navbarContent={navbarContent}
              />
              {alerts}
              <CreateBlog mode={theme} submitPost={submitPost} />
            </> : <Navigate to="/" />
          }
        ></Route>
        <Route
          path="/post/:id"
          element={
            <>
              <Navbar
                mode={theme}
                toggleMode={toggleMode}
                navbarContent={navbarContent}
              />
              <Post mode={theme} />
            </>
          }
        ></Route>
      </Switch>
    </Router>
  </>
  );
}

export default App;
