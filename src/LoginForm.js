import React, { useState } from "react";
import Modal from "./Modal";
import "../src/login.css";
// import { HashRouter, NavLink } from "react-router-dom";
import {
    Route,
    NavLink,
    HashRouter, Redirect
} from "react-router-dom";
import Home from "../src/Home";

function LoginForm({login, error}) {
    const [details, setDetails] = useState({name: "", password: "", checkid: false, checkpassword: false,
        open : false, message : ""});
    
    const submitHandler = e => {
        e.preventDefault();

        // if(Checkid == false || checkpassword == false){console.log("not yet")}
        var {name, password} = details;
        if(name == ""){
            setDetails({...details, open : true, message : '아이디를 입력해주세요'});
            return;
        }
        else if(password == ""){
            setDetails({...details, open : true, message : "비밀번호를 입력해주세요"});
            return;
        }
        // Login(details);
        var data = {'userId' : name, 'userPassword' : password};
        fetch('http://localhost:5505/login/page', {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(data),
        })
        .then(res => res.json())
        .then(json=> {
            console.dir(json);
            if(json.hasOwnProperty('error_message')){
                setDetails({...details, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('success_message')){
                setDetails({...details, open : true, message : json['success_message'], name : "", password : ""});
                window.sessionStorage.setItem('islogined', true);
                window.sessionStorage.setItem('nickName', json['nickName']);
                login();
            }
        })
        .catch(error => console.log('Error : ', error));

    }

    const openModal = () => {
        setDetails({...details, open : true});
    }
    const closeModal = () => {
        setDetails({...details, open : false});
    }

    function userlog(props){
        return <h2>로그인</h2>;
    }

    function userlogout(props){
        return <h2>로그아웃</h2>;
    }
    
    return(
        (details.open == true ? <Modal open = {() => openModal()} close = {() => closeModal()} header={details.message}> </Modal> : 
        window.sessionStorage.getItem('islogined') ? 
        <Redirect to = '/Home'/>  
        :   
        <div id = "one">
            <div className="form-inner">
                <h2>로그인</h2>
                {(error != "") ? ( <div className="error">{error}</div> ) : ""}
                <div className="form-group">
                    <label htmlFor="name">ID:</label>
                    <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <button id="specialone" onClick={submitHandler}>로그인</button>
            </div>
        </div>
        )
    )
}

export default LoginForm;