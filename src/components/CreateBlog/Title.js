import React, { useRef, useState } from "react";
import getThemeColors from "../Themes/Theme";
import "../Navbar.css";

export default function SubNavBar(props) {
  const darkBackground = getThemeColors().darkBackground;
  const greyColor = getThemeColors().greyColor;
  const [labelText, setLabelText] = useState("Title...");
  const [titleText, setTitleText] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [postTags, setPostTags] = useState([]);
  const [tagText, setTagText] = useState(""); // A helper for displaying tags
  const titleElement = useRef();
  const coverInputEl = useRef();

  const handlePublish = e => {
    props.submitPost({
      title: titleText,
      coverImg: coverImg,
      tags: postTags
    });
  };

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

  const handleTagInputChange = e => {
    const text = e.target.value;
    setTagText(text);

    if(text[text.length - 1] === ",") {
      setPostTags([...postTags, text.trim().replace(",", "")]);
      setTagText("");
    }
  };

  const removeTag = idx => {
    let tags = [...postTags];
    tags.splice(idx, 1);
    setPostTags(tags);
  };

  const resetCoverImg = () => {
    setCoverImg("");
    coverInputEl.current.value = "";
  };

  const updateHeight = () => {
    if (titleElement.current.scrollHeight >= 64) {
      titleElement.current.style.height = "1px";
      titleElement.current.style.height = `${titleElement.current.scrollHeight}px`;
    }
  };

  return (
    <>
      <div className='container my-3 w-full d-flex justify-content-between'>
        <div className="container">
          <button
            className={`btn type1-button my-2 my-sm-0 mx-2 text-${
              props.mode === "light" ? "black" : "white"
            }`}
            data-bs-toggle="modal" 
            data-bs-target="#coverModal" 
          >
            <i className='far fa-image'></i> Set Cover{" "}
          </button>
          <button
            className={`btn type1-button my-2 my-sm-0 mx-2 text-${
              props.mode === "light" ? "black" : "white"
            }`} 
            data-bs-toggle="modal" 
            data-bs-target="#tagModal" 
          >
            <i className='fas fa-hashtag'></i> Add Tags{" "}
          </button>
        </div>
        <div className="container d-flex justify-content-end">
          <button className={`btn btn-outline-success`} onClick={handlePublish}>Publish</button>
        </div>
        
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
      
      {/* Modals */}
      <div className="modal fade" id="coverModal" tabIndex="-1" aria-labelledby="coverModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content text-${props.mode === "light" ? "dark": "light"} bg-${props.mode}`}>
            <div className="modal-header">
              <h5 className="modal-title" id="coverModalLabel">Set Cover</h5>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <input 
                  type="file" 
                  className={`form-control text-${props.mode === "light" ? "dark": "light"} bg-${props.mode}`}
                  ref={coverInputEl}
                  onChange={e => setCoverImg(e.target.files[0])} 
                />
              </div>
              {coverImg && <img src={URL.createObjectURL(coverImg)} className="d-block mx-auto img-fluid" alt="Cover Image" />}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={resetCoverImg}>Reset</button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">Done</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="tagModal" tabIndex="-1" aria-labelledby="tagModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content text-${props.mode === "light" ? "dark": "light"} bg-${props.mode}`}>
            <div className="modal-header">
              <h5 className="modal-title" id="tagModalLabel">Add/Remove Tags</h5>
            </div>
            <div className="modal-body">
              <div className="input-group">
                {postTags.map((tag, idx) => (
                  <div key={idx} className={`input-group-text d-flex align-items-center p-2 bg-${props.mode} text-${props.mode === "light" ? "dark": "light"}`}>
                    {tag}
                    <button className={`bg-transparent border-0 fas fa-times text-${props.mode === "light" ? "dark": "light"}`} onClick={e => removeTag(idx)}></button>
                  </div>
                ))}
                <input 
                  type="text" 
                  className={`form-control text-${props.mode === "light" ? "dark": "light"} bg-${props.mode}`}
                  value={tagText} 
                  onChange={handleTagInputChange} 
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
