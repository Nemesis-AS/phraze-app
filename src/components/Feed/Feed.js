import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../utils/useFetch";

// Components
import FeedCard from "./FeedCard";

const IdentityUsersKey = "identityUsersV2";

export default function Feed({ mode }) {
  // const navigate = useNavigate();
  const userKey = JSON.parse(localStorage.getItem(IdentityUsersKey)).publicKey;

  const [inputHex, setInputHex] = useState("");

  // useEffect(() => {
  //   if (!userKey) navigate("/", { replace: true });
  // }, []);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      PublicKeyBase58Check: userKey,
      NumToFetch: 20
    })
  };

  // ReaderPublicKeyBase58Check: userKey,
  // FetchSubcomments: false,
  // GetPostsForFollowFeed: false,
  // GetPostsForGlobalWhitelist: false,
  // GetPostsByDESO: false

  const { data, error, isLoading } = useFetch( 
    "get-posts-for-public-key",
    requestOptions
  );

  const userData = useFetch(
    "get-single-profile",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        PublicKeyBase58Check: userKey
      })
    }
  )

  return (
    // <div className={`container bg-${mode} mt-2 pt-2`}>
    //   {!data && isLoading && "Loading..."}
    //   {!data && error && "Error..."}
    //   {data &&
    //     data.PostsFound.map((x) => (
    //       <FeedCard
    //         key={x.PostHashHex}
    //         postId={x.PostHashHex}
    //         username={x.ProfileEntryResponse.Username}
    //         body={x.Body}
    //         mode={mode}
    //         posterKey={x.ProfileEntryResponse.PublicKeyBase58Check}
    //         timestamp={x.TimestampNanos}
    //         imageURL={x.ImageURLs}
    //         likeCount = {x.LikeCount}
    //         diamondCount = {x.DiamondCount}
    //       />
    //     ))}
    // </div>

    <div className="container">
      <div className="input-group my-3">
        <input 
          type="text" 
          value={inputHex} 
          onChange={e => setInputHex(e.target.value)} 
          className={`form-control ${mode === "dark" && "bg-dark text-white"}`} 
          placeholder="Enter Post Hash to view" 
        />
        <Link to={inputHex ? `/post/${inputHex}` : ""}><button className="btn btn-outline-success">Go!</button></Link>
      </div>
      <div className={`container p-3 bg-${mode} text-${mode === "light" ? "black": "white"}`} style={{"marginBottom": ".5rem"}}>
        <div className="text-muted">
          Example Hash: b5173d3a36471f399d80de6fb30ac2b9a9ec0a293c9eb7540f6c16d008c26ca8
        </div>
      </div>

      {data &&
        data.Posts.map((x) => (
          x.PostExtraData.title &&
          <FeedCard
            key={x.PostHashHex}
            postId={x.PostHashHex}
            username={userData ? userData.data.Profile.Username : ""}
            body={x.Body}
            mode={mode}
            posterKey={userKey}
            timestamp={x.TimestampNanos}
            imageURL={x.ImageURLs}
            likeCount = {x.LikeCount}
            diamondCount = {x.DiamondCount}
            extraData = {x.PostExtraData}
          />
        ))
      }
    </div>
  );
}

{
  /* <div key={x.PostHashHex}>
        <br></br>
        <p>username: {x.ProfileEntryResponse.Username}</p>
        {x.Body}
    </div>)
*/
}
