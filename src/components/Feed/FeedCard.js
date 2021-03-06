import React from "react";
import moment from "moment";
import PreviewMarkdown from "../Markdown/PreviewMarkdown";
import "./feed.css";

export default function FeedCard({
  postId,
  username,
  timestamp,
  body,
  mode,
  posterKey,
  imageURL,
  LikeCount,
  diamondCount,
  extraData
}) {
  
  const truncateString = (text, len = 100) => {
    if (text.length <= len) return text;
    return text.substring(0, len) + "...";
  };

  const getRelativeTime = timestamp => {
    return moment(timestamp / 1e6).fromNow();
  };

  return (
    <div
      className={`card text-${mode === "light" ? "black" : "white"} my-1`}
      style={{
        backgroundColor: `${
          mode === "dark" ? "var(--bs-gray-800)" : "var(--bs-light"
        }`,
      }}>
      <div className='card-body'>
        <div className='row g-0 fs-5'>
          <div className='col-md-8'>
            <div className='d-flex justify-content-between'>
              <div className='d-flex flex-row align-items-center'>
                <div className='icon'>
                  <div className='profileImage'>
                    <img
                      src={`https://diamondapp.com/api/v0/get-single-profile-picture/${posterKey}?fallback=https://diamondapp.com/assets/img/default_profile_pic.png`}
                      alt='profile photo'
                      width='50'
                      height='50'
                      style={{"borderRadius": "50%"}}
                    />
                  </div>
                </div>
                <div className='ms-2 c-details'>
                  <h6 className='mb-0'>{username}</h6>{" "}
                  <span>{getRelativeTime(timestamp)}</span>
                </div>
              </div>
            </div>
            <h5 className='card-title fs-2'>{extraData.title || "Title"}</h5>

            <div className='card-text'><PreviewMarkdown mode={mode} text={truncateString(body)} /></div>

            {/* <button
              className={`btn btn-outline-${
                mode === "light" ? "dark" : "light"
              } mx-1`}>
              <i className='fas fa-thumbs-up'></i>
              {LikeCount}
            </button>
            <button
              className={`btn btn-outline-${
                mode === "light" ? "dark" : "light"
              } mx-1`}>
              <i className='fas fa-gem'></i>
              {diamondCount}
            </button> */}
            <a className='btn btn-outline-primary mx-1' role='button' href={`/post/${postId}`}>Read More</a>
          </div>
          <div className='col-md-4'>
            {imageURL && imageURL[0] !== "" && (
              <img src={imageURL[0]} className="img-fluid" alt="Post Cover" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

FeedCard.defaultProps = {
  username: "Username",
  timestamp: "Today",
  body: "",
  mode: "light",
};
