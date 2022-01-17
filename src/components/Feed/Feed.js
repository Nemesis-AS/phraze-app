import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from "../../utils/useFetch";

export default function Feed() {
    const navigate = useNavigate();
    const userKey = localStorage.getItem("lastLoggedInUser");

    useEffect(() => {
        if (!userKey) navigate("/", { replace: true });
    }, []);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ReaderPublicKeyBase58Check: userKey,
            FetchSubcomments: false,
            GetPostsForFollowFeed: false,
            GetPostsForGlobalWhitelist: false,
            GetPostsByDESO: false,
            MediaRequired: false,
        })
    };

    const { data, error, isLoading } = useFetch('get-posts-stateless', requestOptions);

    return (
        <div>
            <div className="container">
                <div>
                    {!data && isLoading && "Loading..."}
                    {!data && error && "Error..."}
                    {data && data.PostsFound.map((x) => <div key={x.PostHashHex}>{x.Body}</div>)}
                </div>
            </div>
        </div>
    )
}
