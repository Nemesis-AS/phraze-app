import React from 'react';
import Logo from "../../assets/images/logo.png";

export default function FeedCard({ title, username, timestamp, content, mode }) {
  return (
    <div className={`card text-${mode === "light" ? "black" : "white"} my-1`} style={{backgroundColor: `${mode === "dark" ? "var(--bs-gray-800)" : "var(--bs-light"}`}}>
      <div className="card-body">
        <div className="row g-0 fs-5">
          <div className="col-md-8">
            <h5 className="card-title fs-2">{title}</h5>
            <p className="card-text"><small className="text-muted"><span className="fw-bold">{username}</span>; {timestamp}</small></p>
            <p className="card-text">{content}</p>

            <button className={`btn btn-outline-${mode === "light" ? "dark": "light"} mx-1`}><i className="fas fa-arrow-up mx-1"></i>11</button>
            <button className="btn btn-outline-primary mx-1">Read More</button>
          </div>
          <div className="col-md-4 px-2">
            <img src={Logo} className="img-fluid rounded-start" alt="Post Icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

FeedCard.defaultProps = {
  title: "Blog Title",
  username: "Username",
  timestamp: "Today",
  content: "",
  mode: "light"
};