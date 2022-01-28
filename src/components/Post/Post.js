import React, { useEffect } from "react"; // { useEffect, useState }
import MarkDownIt from "markdown-it";
import markdownItEmoji from "markdown-it-emoji";
import hljs from "highlight.js";
import { Link, useParams } from "react-router-dom";
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

  // useEffect(() => {
  //   getPost();
  // }, []);

  // const getPost = async () => {
  //   // console.log(desoApi);
  //   // let post = await desoApi.getSinglePost(params.id);
  //   // console.log(post)
  // }

  const { data } = useFetch("get-single-post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postHashHex: params.id
    })
  });

  const modeInverse = () => mode === "light" ? "dark" : "light";

  return (
  <>
  {data ?
    <div className={`container ${mode === "light" ? "text-black" : "text-white"}`}>
      <section>
          <div className="h1 my-2">{data.PostFound.PostExtraData.title || data.PostFound.ProfileEntryResponse.Username}</div>
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
        {data.PostFound.ImageURLs && <img src={data.PostFound.ImageURLs[0]} alt={data.PostFound.ProfileEntryResponse.Username} className="cover my-2" />}
        <div dangerouslySetInnerHTML={{__html: md.render(`${data.PostFound.Body}`)}}>
        </div>
        <hr />
        <div className="tag-bar my-3">
          {data.PostFound.PostExtraData.tags && JSON.parse(data.PostFound.PostExtraData.tags).map((tag, idx) => (
            <Link to={`/posts?tag=${tag}`} key={idx}>
              <button className={`btn btn-outline-${modeInverse()} mx-2`}>
                  <i className="fas fa-hashtag mx-1"></i> 
                  {tag}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div> :
    <div className="loading">Loading...</div>
    }
    
  </>);
}