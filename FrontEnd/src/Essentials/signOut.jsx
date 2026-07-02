import React from 'react'

import axios from 'axios';
import links from '../Essentials/links';

export default function SignOut() {
    const handleClick = async () => {
        try {
            await axios.post(
                links.serverName + "/sign-out",
                {},
                {
                    withCredentials: true,
                }
            );
            console.log("Sign-out successful");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }
    return (
        <button onClick={handleClick}>
            Sign Out
        </button>
    )
}
