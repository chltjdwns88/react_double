import React, { useState } from 'react';
import LoginForm from "./SignupForm";
function App_signup(){
    const adminUser = {
        email: "chltjdwns@chltjdwns.com",
        password: "chltjdwns"
    }

    const [user, setUser] = useState({name: "", email:""});
    const [error, setError] = useState("");

    //에러처리
    const Login = details => {
        console.log(details);

        if(details.email == adminUser.email && details.password == adminUser.password){
            console.log("Logged in");
            setUser({
                name: details.name,
                email: details.email
            });
        } else {
            console.log("Details do not match!");
            setError("Details do not match!");
        }

    }

    const Logout = () => {
        console.log("logout");
        setUser({ name: "", email: "" });
    }

    return (
        <div className="App">
            {(user.email != "") ? (
                <div className="welcome">
                    <h2>welcome, <span>{user.name}</span></h2>
                    <button onClick={Logout}>Logout</button>
                </div>
            ) : (
                <LoginForm Login={Login} error={error}/>
            )}
        </div>
    );
}

export default App_signup;