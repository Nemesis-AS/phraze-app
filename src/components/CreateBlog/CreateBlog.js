import React from "react";
import Title from "./Title";
import WritePad from "./WritePad";

export default function CreateBlogBody(props) {
  return (
    <div className='container'>
      <Title mode={props.mode} />
      <WritePad mode={props.mode} />
    </div>
  );
}
