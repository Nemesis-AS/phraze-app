import React, { useState } from "react";
import Title from "./Title";
import WritePad from "./WritePad";

export default function CreateBlogBody(props) {
  const [bodyText, setBodyText] = useState("");

  const submitPost = ({ title, tags, coverImg }) => {
    props.submitPost({title, tags, coverImg, body: bodyText});
  };

  return (
    <div className='container'>
      <Title mode={props.mode} submitPost={submitPost} />
      <WritePad mode={props.mode} bodyText={bodyText} setBodyText={setBodyText} />
    </div>
  );
}
