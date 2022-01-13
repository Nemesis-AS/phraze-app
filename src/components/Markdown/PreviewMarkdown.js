import React from "react";
import {marked} from "marked";

export default function PreviewMarkdown({ text }) {
    return (
        <div className="mx-3" dangerouslySetInnerHTML={{__html: marked(text)}}>
        </div>
    )
}
