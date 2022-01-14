import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Feed() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("lastLoggedInUser")) navigate("/", {replace: true});
    }, []);

    return (
        <div>
            <div className="container">this is feed page</div>
        </div>
    )
}
