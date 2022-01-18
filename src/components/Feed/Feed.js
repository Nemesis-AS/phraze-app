import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../utils/useFetch";

// Components
import FeedCard from "./FeedCard";

export default function Feed({ mode }) {
  const navigate = useNavigate();
  const userKey = localStorage.getItem("lastLoggedInUser");

  useEffect(() => {
    if (!userKey) navigate("/", { replace: true });
  }, []);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ReaderPublicKeyBase58Check: userKey,
      FetchSubcomments: false,
      GetPostsForFollowFeed: true,
      GetPostsForGlobalWhitelist: false,
      GetPostsByDESO: false,
    }),
  };

  const { data, error, isLoading } = useFetch(
    "get-posts-stateless",
    requestOptions
  );

  return (
    <div className={`container bg-${mode} mt-2 pt-2`}>
      {!data && isLoading && "Loading..."}
      {!data && error && "Error..."}
      {data &&
        data.PostsFound.map((x) => (
          <FeedCard
            key={x.PostHashHex}
            username={x.ProfileEntryResponse.Username}
            body={x.Body}
            mode={mode}
            posterKey={x.ProfileEntryResponse.PublicKeyBase58Check}
            timestamp={x.TimestampNanos}
            imageURL={x.ImageURLs}
            likeCount = {x.LikeCount}
            diamondCount = {x.DiamondCount}
          />
        ))}
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
