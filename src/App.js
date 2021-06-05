import React, { useState } from 'react';
import LoginForm from "./LoginForm";



function App(props){
    const adminUser = {
        name: "chltjdwns",
        password: "1234"
    }

    const [user, setUser] = useState({name: "", password:""});
    const [error, setError] = useState("");

    //에러처리
    const Login = details => {
        console.log(details);

        if(details.name == adminUser.name && details.password == adminUser.password){
            console.log("Logged in");
            setUser({
                name: details.name,
                password: details.password
            });
        } else {
            console.log("정보가 올바르지 않습니다.");
            setError("정보가 올바르지 않습니다.");
        }

    }

    const Logout = () => {
        console.log("logout");
        setUser({ name: "", password: "" });
    }

    return (
        <div className="App">
            {(user.name != "") ? (
                <div className="welcome">
                    <h2>welcome, <span>{user.name}</span></h2>
                    <button onClick={Logout}>Logout</button>
                </div>
            ) : (
                <LoginForm Login={Login} error={error} login = {() => props.login()}/>
            )}
        </div>
    );
}

export default App;