import React, { useRef, useState } from "react";
import getThemeColors from "../Themes/Theme";
import "../Navbar.css";

export default function SubNavBar(props) {
  const darkBackground = getThemeColors().darkBackground;
  const greyColor = getThemeColors().greyColor;
  const [labelText, setLabelText] = useState("Title...");
  const [titleText, setTitleText] = useState("");
  const titleElement = useRef();

  const handleTitleChange = (event) => {
    let title = event.target.value;
    setTitleText(title);
    if (title.length > 0) {
      setLabelText("");
    } else {
      setLabelText("Title...");
    }

    updateHeight();
  };

  const updateHeight = () => {
    if (titleElement.current.scrollHeight >= 64) {
      titleElement.current.style.height = "1px";
      titleElement.current.style.height = `${titleElement.current.scrollHeight}px`;
    }
  };

  return (
    <>
      <div className='container my-3'>
        <button
          className={`btn type1-button my-2 my-sm-0 mx-2 text-${
            props.mode === "light" ? "black" : "white"
          }`}>
          <i className='far fa-image'></i> Set Cover{" "}
        </button>
        <button
          className={`btn type1-button my-2 my-sm-0 mx-2 text-${
            props.mode === "light" ? "black" : "white"
          }`}>
          <i className='fas fa-hashtag'></i> Add Tags{" "}
        </button>
      </div>
      <div className='form-floating mx-3'>
        <textarea
          className='form-control'
          rows='1'
          id='floatingTextarea1'
          onChange={handleTitleChange}
          value={titleText}
          ref={titleElement}
          style={{
            fontSize: "1.5rem",
            minHeight: "120px",
            resize: "none",
            overflowY: "hidden",
            fontWeight: "bold",
            color: props.mode === "light" ? "black" : "white",
            border: "none",
            boxShadow: "none",
            backgroundColor: `${
              props.mode === "light" ? "white" : darkBackground
            }`,
          }}></textarea>
        <label
          htmlFor='floatingTextarea2'
          style={{
            color: props.mode === "light" ? greyColor : "white",
            fontSize: "30px",
            paddingTop: "30px",
          }}>
          <strong>{labelText}</strong>
        </label>
      </div>
    </>
  );
}
