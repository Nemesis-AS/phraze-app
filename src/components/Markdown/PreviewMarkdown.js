import React from "react";
import {marked} from "marked";

export default function PreviewMarkdown({ mode, text }) {
    return (
        <div className="mx-3" style={{color: mode === "light" ? "black" : "white"}} dangerouslySetInnerHTML={{__html: marked(text)}}>
        </div>
    )
}
