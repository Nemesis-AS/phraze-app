import React from "react";
import "../Navbar.css";
import getThemeColors from "../Themes/Theme.js";
import WritePadBtn from "../Utils/WritePadBtn";

export default function WritePadBar(props) {
  const lightGrey = getThemeColors().lightGrey;
  const secondaryDark = getThemeColors().darkSecondary;
  const lightBorder = getThemeColors().lightBorder;
  const darkBorder = getThemeColors().darkBorder;

  const handleMarkDownButtons = (event) => {
    props.appendTextBody(event);
  };

  return (
    <div className='container my-3'>
      <div
        className='alert alert-primary'
        style={{
          backgroundColor: props.mode === "light" ? lightGrey : secondaryDark,
          border: `1px solid ${
            props.mode === "light" ? lightBorder : darkBorder
          }`,
        }}>
        <div className='row'>
          <div className='col'>
            <button
              onClick={e => props.onTabSwitch("write")}
              className={`btn btn-sm type1-button my-2 my-sm-0 mx-2 text-${
                props.mode === "light" ? "black" : "white"
              }`}>
              <i className='fa fa-pen'></i> Write{" "}
            </button>
            <button
              onClick={e => props.onTabSwitch("preview")}
              className={`btn btn-sm type1-button my-2 my-sm-0 mx-2 text-${
                props.mode === "light" ? "black" : "white"
              }`}>
              <i className='fa fa-eye'></i> Preview{" "}
            </button>
            <button
              onClick={e => props.onTabSwitch("guide")}
              className={`btn btn-sm type1-button my-2 my-sm-0 mx-2 text-${
                props.mode === "light" ? "black" : "white"
              }`}>
              <i className='fa fa-book'></i> Guide{" "}
            </button>
          </div>

          {props.showButtons && (<div className='col'>
            <button
              className={`btn btn-sm type1-button dropdown-toggle my-2 my-sm-0 mx-2 text-${
                props.mode === "light" ? "black" : "white"
              }`}
              id='dropdownMenuButton1'
              data-bs-toggle='dropdown'
              aria-expanded='false'>
              <i className='fas fa-heading'></i>
            </button>
            <ul
              className={`dropdown-menu bg-${
                props.mode === "light" ? "light" : "dark"
              }`}
              aria-labelledby='dropdownMenuLink'>
              <li>
                <button
                  className={`dropdown-item text-${
                    props.mode === "light" ? "blakc" : "white"
                  }`}
                  id='H1'
                  onClick={handleMarkDownButtons}>
                  H1
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item text-${
                    props.mode === "light" ? "blakc" : "white"
                  }`}
                  id='H2'
   
                  onClick={handleMarkDownButtons}>
                  H2
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item text-${
                    props.mode === "light" ? "blakc" : "white"
                  }`}
                  id='H3'
                  onClick={handleMarkDownButtons}>
                  H3
                </button>
              </li>
            </ul>
            <WritePadBtn icon="bold" id="bold" mode={props.mode} onClickEvent={handleMarkDownButtons} />
            <WritePadBtn icon="italic" id="italic" mode={props.mode} onClickEvent={handleMarkDownButtons} />
            <WritePadBtn icon="quote-left" id="quote" mode={props.mode} onClickEvent={handleMarkDownButtons} />
            <WritePadBtn icon="code" id="code" mode={props.mode} onClickEvent={handleMarkDownButtons} />
            <WritePadBtn icon="brackets-curly" id="embed" mode={props.mode} onClickEvent={handleMarkDownButtons} />
            <WritePadBtn icon="link" id="link" mode={props.mode} onClickEvent={handleMarkDownButtons} />
            <WritePadBtn icon="list" id="list" mode={props.mode} onClickEvent={handleMarkDownButtons} />
            <WritePadBtn icon="list-ol" id="list-ol" mode={props.mode} onClickEvent={handleMarkDownButtons} />
            <WritePadBtn icon="camera" id="image" mode={props.mode} onClickEvent={handleMarkDownButtons} />
          </div>)}
        </div>
      </div>
    </div>
  );
}
