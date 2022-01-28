import React from "react";
import { useState, useRef, useEffect } from "react/cjs/react.development";
import getThemeColors from "../Themes/Theme";
import WritePadBar from "./WritePadBar";
import PreviewMarkdown from "../Markdown/PreviewMarkdown";

import guideText from "./Guide";

export default function WritePad(props) {
  const [bodyLabel, setBodyLabel] = useState("Write you story...");
  const [currentTab, setCurrentTab] = useState("write"); // Possible Values: write, preview, guide
  const [currentHeight, setCurrentHeight] = useState(96);

  const darkBackground = getThemeColors().darkBackground;
  const greyColor = getThemeColors().greyColor;
  const bodyTextArea = useRef();

  const appendBodyActions = {
    H1: "# || ",
    H2: "## || ",
    H3: "### || ",
    bold: "**||**",
    italic: "*||*",
    quote: "\n> || ",
    code: "\n```\n||```",
    link: "[||](Link)",
    embed: "%[||]",
    list: "\n- || ",
    "list-ol": "\n1. || "
  }

  const handleBodyChange = (event) => {
    let bodyValue = event.target.value;
    props.setBodyText(bodyValue);
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
    if (actionInfo === undefined) return;

    if (startBegin === startEnd) {
        const splitText = actionInfo.split("||");
        if (splitText[1] === " ") splitText[1] = "";
        let pointerOffset = splitText[0].length;
        props.setBodyText(props.bodyText + splitText.join(""));
        focusInput(startBegin + pointerOffset);
    } else {
      props.setBodyText(getFormattedString(actionInfo, startBegin, startEnd));
    }

    updateHeight();
  };

  const updateHeight = () => {
    // Change the height of the textarea if the content is larger
    if (bodyTextArea.current.scrollHeight >= 96) {
      setCurrentHeight(1);
      setCurrentHeight(bodyTextArea.current.scrollHeight);
      // bodyTextArea.current.style.height = "128px";
      // bodyTextArea.current.style.height = `${bodyTextArea.current.scrollHeight}px`;
    }
  }

  const getFormattedString = (text, pointerStart, pointerEnd) => {
    let textToAdd = text.split("||");
    if (textToAdd[1] === " ") textToAdd[1] = "";
    let finalText = props.bodyText.substring(0, pointerStart) + textToAdd[0] + props.bodyText.substring(pointerStart, pointerEnd) + textToAdd[1] + props.bodyText.substring(pointerEnd);
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
            value={props.bodyText}
            style={{
              minHeight: "120px",
              resize: "none",
              fontSize: "1.5rem",
              color: props.mode === "light" ? "black" : "white",
              border: "none",
              boxShadow: "none",
              height: `${currentHeight}px`,
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
      </div>): <PreviewMarkdown mode={props.mode} text={currentTab === "preview" ? props.bodyText : guideText} />}
    </div>
  );
}
