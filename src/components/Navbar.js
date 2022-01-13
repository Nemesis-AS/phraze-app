import React from "react";
import loginWithDeso from "../assets/images/loginWithDeso.svg";
export default function Navbar(props) {
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${
          props.mode
        } ${props.mode === "light" ? "" : "navnar-darkTheme"}`}>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            <img
              src='https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg'
              alt=''
              width='30'
              height='24'
              className='d-inline-block align-text-top'
            />
          </a>

          <a className='navbar-brand' href='/'>
            Zettr
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <a className='nav-link active' aria-current='page' href='/'>
                  Home
                </a>
              </li>
            </ul>
            {props.navbarContent.toogleSwitch ? (
              <div
                className={`form-check form-switch text-${
                  props.mode === "light" ? "black" : "white"
                }`}>
                <input
                  className='form-check-input'
                  onClick={props.toggleMode}
                  type='checkbox'
                  id='flexSwitchCheckDefault'
                />
              </div>
            ) : (
              <div></div>
            )}

            {props.navbarContent.settingButton ? (
              <button
                className={`btn type1-button my-2 my-sm-0 mx-2 text-${
                  props.mode === "light" ? "black" : "white"
                }`}>
                <i className='fa fa-cog'></i> Settings{" "}
              </button>
            ) : (
              <div></div>
            )}

            {props.navbarContent.publishButton ? (
              <button className='btn shadow-sm btn-outline-primary'>
                Publish
              </button>
            ) : (
              <div></div>
            )}

            {props.navbarContent.loginButton ? (
              <button
                className='btn btn-primary btn-lg shadow-sm'
                onClick={props.loginWithDeSo}>
                Login with <img src={loginWithDeso} className='login-btn'></img>
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

Navbar.defaultProps = {
  navbarContent: {
    toogleSwitch: true,
    settingButton: false,
    publishButton: false,
    loginButton: true,
  },
};