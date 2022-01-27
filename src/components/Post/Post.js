import React, { useEffect, useState } from "react";
import MarkDownIt from "markdown-it";
import markdownItEmoji from "markdown-it-emoji";
import hljs from "highlight.js";
import { useParams } from "react-router-dom";
import { useFetch } from "../../utils/useFetch";
import getReadableDate from "../../utils/readableDate";

import "./Post.css";

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
  }
}).use(markdownItEmoji);

export default function Post({ mode }) {
  md.renderer.rules.blockquote_open = function() { return "<blockquote class='blockquote p-2'>" };
  md.renderer.rules.table_open = function() { return `<table class='table table-striped table-${mode}'>` };

  const params = useParams(); // URL Params[Post ID]

  const { data, error } = useFetch("get-single-post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postHashHex: params.id
    })
  });

  return (
  <>
  {data ?
    <div className={`container ${mode === "light" ? "text-black" : "text-white"}`}>
      <section>
          <div className="h1 my-2">{data.PostFound.ProfileEntryResponse.Username}</div>
          <div className="user-info d-flex align-items-center">
              <img 
                src={`https://diamondapp.com/api/v0/get-single-profile-picture/${data.PostFound.PosterPublicKeyBase58Check}?fallback=https://diamondapp.com/assets/img/default_profile_pic.png`} 
                alt="pfp" 
                className="profile-picture mx-2" 
                width="64" 
                height="64" 
              />
              <div className="d-flex flex-column">
                <div className="fw-light fs-4">{data.PostFound.ProfileEntryResponse.Username}</div>
                <div className="text-muted">{getReadableDate(data.PostFound.TimestampNanos).readableTime.split(" ")[0]}</div>
              </div>
              
          </div>
          
          <hr />
      </section>
      <div className="container">
        {data.PostFound.ImageURLs && <img src={data.PostFound.ImageURLs[0]} alt={data.PostFound.ProfileEntryResponse.Username} className="cover" />}
        <div dangerouslySetInnerHTML={{__html: md.render(`${data.PostFound.Body}`)}}>
        </div>
        <div className="tag-bar">
          {data.PostFound.PostExtraData.tags && data.PostFound.PostExtraData.tags.map(tag => <a href={`/posts?tag=${tag}`} className={`btn btn-outline-${mode}`}>{tag}</a>)}
        </div>
        
      </div>
    </div> :
    <div className="loading">Loading...</div>
    }
    
  </>);
}