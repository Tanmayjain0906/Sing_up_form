import React, { useState } from "react";
import axios from "axios";

let newToken;
const Dashboard = ({ token, setToken }) => {

    const [joke, setJoke] = useState("");

    async function getJoke() {
        if (token === "") {
            if (!localStorage.getItem("token")) {
                alert("You Need To Sing-up or Login First");
            }
            else {
                newToken = localStorage.getItem("token");
            }
        }
        else {
            newToken = token;
        }

        try {
            const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku", {
                headers: {
                    authorization: `Bearer ${newToken}`
                }
            })
            if (response) {
                setJoke(response.data.data.message)
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    async function logOut() {
        try {
            let response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            
            console.log(response);
            setJoke("");
            setToken("");
            localStorage.removeItem("token")
            alert(response.data.message);
        }
        catch (err) {
            alert(err.response.data.message);
        }
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <p>{joke}</p>
            <button onClick={getJoke}>Get Joke</button>
            <br />
            <br />
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default Dashboard;