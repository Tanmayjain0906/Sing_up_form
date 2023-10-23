import React, { useState } from "react";
import axios from "axios";

const Login = ({setToken}) => {

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = userData;

    function handleSubmit(event) {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    async function handleForm(event) {
        event.preventDefault();
        if (!email || !password) {
            alert("Fill all the feilds")
        }
        else {
            try {
                let response = await axios.post("https://instagram-express-app.vercel.app/api/auth/login/", { email, password });

                setToken(response.data.data.token);
                localStorage.setItem("token", response.data.data.token);
                alert("Login Successful");
            }
            catch (err) {
                alert(err.response.data.message);
            }

            setUserData({
                email: "",
                password: ""
            })
        }
    }

    return (

        <div>
            <h1>Login</h1>

            <form onSubmit={handleForm}>
                <input type="email" placeholder="Enter Mail" name="email" value={email} onChange={handleSubmit} />
                <input type="password" placeholder="Enter Password" name="password" value={password} onChange={handleSubmit} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;