import React from "react";
import { useState, useRef, useEffect } from "react/cjs/react.development";
import getThemeColors from "../Themes/Theme";
import WritePadBar from "./WritePadBar";
import PreviewMarkdown from "../Markdown/PreviewMarkdown";

export default function WritePad(props) {
  const [bodyText, setBodyText] = useState("");
  const [bodyLabel, setBodyLabel] = useState("Write you story...");
  const [currentTab, setCurrentTab] = useState("write"); // Possible Values: write, preview, guide

  const darkBackground = getThemeColors().darkBackground;
  const greyColor = getThemeColors().greyColor;
  const bodyTextArea = useRef();

  const appendBodyActions = {
    H1: {
      text: "# || ",
      textPosition: 0 // Relative to Pointer
    },
    H2: {
      text: "## || ",
      textPosition: 0
    },
    H3: {
      text: "### || ",
      textPosition: 0
    },
    bold: {
      text: "**||**"
    },
    italic: {
      text: "*||*"
    },
    quote: {
      text: "\n> || "
    },
    code: {
      text: "\n```\n||```"
    },
    link: {
      text: "[||](Link)"
    },
    embed: {
      text: "%[||]"
    },
    list: {
      text: "\n- || "
    },
    "list-ol": {
      text: "\n1. || "
    }
  }

  const handleBodyChange = (event) => {
    let bodyValue = event.target.value;
    setBodyText(bodyValue);
    updateHeight();    
    if (bodyValue.length > 0) {
      setBodyLabel("");
    } else {
      setBodyLabel("Write your story...");
    }
  };

  const handleTabChange = tab => {
    setCurrentTab(tab);
  };

  const [selection, setSelection] = useState();

  useEffect(() => {
    updateHeight();
    if (!selection) return; // prevent running on start
    const { start, end } = selection;
    bodyTextArea.current.focus();
    bodyTextArea.current.setSelectionRange(start, end);
  }, [selection]);

  const focusInput = (beg, end=beg) => {
    setSelection({ start: beg, end: end });
  };

  const appendTextBody = (event) => {
    let action = event.target.id;
    setBodyLabel("");
    bodyTextArea.current.focus();
    let startBegin = bodyTextArea.current.selectionStart;
    let startEnd = bodyTextArea.current.selectionEnd;
    let actionInfo = appendBodyActions[action];

    if (startBegin === startEnd) {
        const splitText = actionInfo.text.split("||");
        if (splitText[1] === " ") splitText[1] = "";
        let pointerOffset = splitText[0].length;
        setBodyText(bodyText + splitText.join(""));
        focusInput(startBegin + pointerOffset);
    } else {
      setBodyText(getFormattedString(actionInfo.text, startBegin, startEnd));
    }

    updateHeight();
  };

  const updateHeight = () => {
    // Change the height of the textarea if the content is larger
    if (bodyTextArea.current.scrollHeight >= 96) bodyTextArea.current.style.height = `${bodyTextArea.current.scrollHeight}px`;
  }

  const getFormattedString = (text, pointerStart, pointerEnd) => {
    let textToAdd = text.split("||");
    if (textToAdd[1] === " ") textToAdd[1] = "";
    let finalText = bodyText.substring(0, pointerStart - textToAdd[0].length) + textToAdd[0] + bodyText.substring(pointerStart - textToAdd[0].length, pointerEnd) + textToAdd[1] + bodyText.substring(pointerEnd);
    return finalText;
  }

  return (
    <div className='container'>
      <WritePadBar mode={props.mode} appendTextBody={appendTextBody} onTabSwitch={handleTabChange} showButtons={currentTab === "write"} />
      {currentTab === "write" ? (
        <div className='form-floating mx-3'>
          <textarea
            className='form-control'
            id='floatingTextarea1'
            onChange={handleBodyChange}
            ref={bodyTextArea}
            value={bodyText}
            style={{
              height: "120px",
              resize: "none",
              fontSize: "1.5rem",
              color: props.mode === "light" ? "black" : "white",
              border: "none",
              boxShadow: "none",
              backgroundColor: `${
                props.mode === "light" ? "white" : darkBackground
              }`,
              overflowY: "hidden"
            }}></textarea>
          <label
            htmlFor='floatingTextarea2'
            style={{
              color: props.mode === "light" ? greyColor : "white",
              fontSize: "25px",
              marginTop: "18px",
            }}>
            {bodyLabel}
          </label>
      </div>): <PreviewMarkdown text={currentTab === "preview" ? bodyText : "# Guide"} />}
    </div>
  );
}
