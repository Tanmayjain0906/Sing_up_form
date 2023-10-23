import React, { useState } from "react";
import SingUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dasboard";
import "./style.css"

const App = () => {

    const [token, setToken] = useState("");
    return (
        <div>
            <SingUp setToken={setToken}/>
            <Login setToken={setToken}/>
            <Dashboard token={token} setToken={setToken}/>
        </div>
    )
}

export default App;