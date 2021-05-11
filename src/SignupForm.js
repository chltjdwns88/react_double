import React, { useState } from "react";
import Modal from "./Modal";
// import "../src/login.css";

function SignupForm({ Login, error }) {
    const [details, setDetails] = useState({name : "", nickname : "", password : "", phonenumber : "", 
        checkid : false, checknickname : false, checkphonenumber : true ,verifyCode : "", userVerifyCode : "", open : false, message : ""});
    const open = true;
    const submitHandler = e => {
        e.preventDefault();
        var {checkid, checknickname, checkphonenumber} = details;
        if(checkid == false || checknickname == false || checkphonenumber == false) {console.log("아직 ")}
        var {name, nickname, password, phonenumber} = details;
        var data = {'userId' : name, 'nickName' : nickname, 'userPassword' : password, 'phoneNumber' : phonenumber};
        fetch('http://localhost:5505/signup/', {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(data),
        })
        .then(res => res.json())
        .then(json => {
            console.dir(json);
            if(json.hasOwnProperty('error_message')){

            }
            else if(json.hasOwnProperty('success_message')){
                
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    const checkId = e => {
        e.preventDefault();
        var {name} = details;
        var data = {'userId' : name};
        fetch('http://localhost:5505/signup/checkuserid/', {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(data),
        })
        .then(res => res.json())
        .then(json => {
            console.dir(json);
            if(json.hasOwnProperty('error_message')){
                setDetails({...details, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('success_message')){
                setDetails({...details, checkid : true, open : true, message : json['success_message']});
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    const checkNickname = e => {
        e.preventDefault();
        var {nickname} = details;
        var data = {'nickName' : nickname};
        fetch('http://localhost:5505/signup/checknickname/', {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(data),
        })
        .then(res => res.json())
        .then(json => {
            console.dir(json);
            if(json.hasOwnProperty('error_message')){
                setDetails({...details, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('success_message')){
                setDetails({...details, checknickname : true, open : true, message : json['success_message']});
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    const checkPhonenumber = e => {
        e.preventDefault();
        var {phonenumber} = details;
        var data = {'phoneNumber' : phonenumber};
        fetch('http://localhost:5505/signup/checkphone/', {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(data),
        })
        .then(res => res.json())
        .then(json => {
            console.dir(json);
            if(json.hasOwnProperty('error_message')){
                setDetails({...details, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('verifyCode')){
                setDetails({...details, verifyCode : json['verifyCode'], open : true, message : json['success_message']});
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    const checkVerifycode = e => {
        e.preventDefault();
        var {verifyCode, userVerifyCode} = details;
        if(verifyCode == undefined) {}
        if(verifyCode == userVerifyCode){
            setDetails({...details, checkphonenumber : true, open : true, message : "success"});
        }
    }

    const openModal = () => {
        setDetails({...details, open : true});
    }
    const closeModal = () => {
        setDetails({...details, open : false});
    }

    return(
        (details.open == true ? <Modal open = {() => openModal()} close = {() => closeModal()} header={details.message}> </Modal> :
        <div id="one" className="form-inner">
            <h2>회원가입</h2>
            {(error != "") ? ( <div className="error">{error}</div> ) : ""}
            <div className="form-group">
                <label htmlFor="name">ID:</label>
                <input type="text" name="name" id="name" onChange={e => setDetails({...details, name : e.target.value})} value={details.name}/>
                <button onClick={checkId}>중복확인</button>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </div>
            <div className="form-group">
                <label htmlFor="nickname">닉네임:</label>
                <input type="nickname" name="nickname" id="nickname" onChange={e => setDetails({...details, nickname: e.target.value})} value={details.nickname}/>
                <button onClick={checkNickname}>중복확인</button>
            </div>
            <div className="form-group">
                <label htmlFor="phone-number">Phone-Number:</label>
                <input type="phone-number" name="phone-number" id="phone-number" onChange={e => setDetails({...details, phonenumber: e.target.value})} value={details.phonenumber}/>
                <button onClick={checkPhonenumber}>중복확인</button>
            </div>
            <div className="form-group">
                <label htmlFor="userVerifyCode">인증번호:</label>
                <input type="userVerifyCode" name="userVerifyCode" id="userVerifyCode" onChange={e => setDetails({...details, userVerifyCode: e.target.value})} value={details.userVerifyCode}/>
                <button onClick={checkVerifycode}>중복확인</button>
            </div>
            <button onClick={submitHandler}>회원가입</button>
        </div>
    )
    )
}

export default SignupForm;