import React from "react";
import MarkDownIt from "markdown-it";
import markdownItEmoji from "markdown-it-emoji";
import hljs from "highlight.js";

import 'highlight.js/styles/atom-one-dark.css';

const md = new MarkDownIt({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs p-2"><code>' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            } catch (__) {}
        }
    
        return '<pre class="hljs p-2"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    },
    linkify: true
}).use(markdownItEmoji);

export default function PreviewMarkdown({ mode, text }) {
    md.renderer.rules.blockquote_open = function() { return "<blockquote class='blockquote p-2'>" };
    md.renderer.rules.table_open = function() { return `<table class='table table-striped table-${mode}'>` };

    return (
        <div className="mx-3" style={{color: mode === "light" ? "black" : "white"}} dangerouslySetInnerHTML={{__html: md.render(text)}}>
        </div>
    )
}
