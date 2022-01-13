import React from "react";
import ReactMarkdown from "react-markdown";

export default function Preview(props) {
  return (
    <div className='container markdow-display my-5 mx-3'>
      <ReactMarkdown>{props.textBody}</ReactMarkdown>
    </div>
  );
}
