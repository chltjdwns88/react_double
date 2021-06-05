import React, { Component } from "react";
import Modal from "./Modal";
import Chart from './Chart';
import axios from 'axios';

class Userinfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open : false,
            message : "",
            examId : "toeic",
            nickName : window.sessionStorage.getItem('nickName'),
            prevnickName : window.sessionStorage.getItem('nickName'),
            img : [],
            canrewrite : false,
            userId : "",
            userPassword : "",
            nickName : "",
            phoneNumber : "",
            uploadedImg : false,
            score : [],
            count : 0,
            verifyCode : "",
            userVerifyCode : "",
            checkphonenumber : false,
            disabled : true,
        }
        this.getUserinfo();
    }

    getUserinfo(){
        var body = {'nickName' : window.sessionStorage.getItem('nickName')};
        console.dir(body);
        fetch('http://localhost:5505/examboard/userinfo', {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(body),
        })
        .then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty('error_message')){
                this.setState({...this.state, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('success_message')){
                var result = json['success_message'][0];
                this.setState({...this.state, userId : result['userId'], userPassword : result['userPassword'], nickName : result['nickName'], phoneNumber : result['phoneNumber']});
                this.getScore();
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    getScore(){
        if(this.state.examId == "") {
            this.setState({...this.state, open : true, message : "시험을 선택해주세요"});
            return;
        }
        var body = {'nickName' : this.state.nickName, 'examId' : this.state.examId};
        fetch('http://localhost:5505/examboard/getscore', {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(body),
        })
        .then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty('error_message')){
                this.setState({...this.state, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('success_message')){
                console.dir(this.state.score);
                this.setState({...this.state, open : true , message : "Loding....", score : json['success_message']});
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    rewriteinfo(){
        var body = {'nickName' : this.state.nickName, 'userId' : this.state.userId, 'userPassword' : this.state.userPassword, 'prevnickName' : this.state.prevnickName};
        fetch('http://localhost:5505/examboard/userinfoupdate', {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(body),
        })
        .then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty('error_message')){
                this.setState({...this.state, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('success_message')){
                this.setState({...this.state, open : true, message : '수정이 완료되었습니다.'});
                if(this.state.nickName != this.state.prevnickName){
                    window.sessionStorage.setItem({'nickName' : this.state.nickName});
                    this.state.prevnickName = this.state.nickName;
                }
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    rewritePhone(){
        if(this.state.checkphonenumber == false){
            this.setState({...this.state, open : true, message : '휴대폰 인증을 먼저 해주세요'});
            return;
        }
        var body = {'nickName' : this.state.nickName, 'phoneNumber' : this.state.phoneNumber};
        fetch('http://localhost:5505/examboard/phoneupdate', {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(body),
        })
        .then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty('error_message')){
                this.setState({...this.state, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('success_message')){
                this.setState({...this.state, open : true, message : '핸드폰 번호 수정이 완료되었습니다.'});
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    setRewrite(){
        this.setState({...this.state, canrewrite : true});
    }

    uploadImg = async() => {
        if(this.state.examId == "") {
            this.setState({...this.state, open : true, message : "등록할 점수의 시험이름을 설정해 주세요"});
            return;
        }
        const formData = new FormData();
        const config = {
            header : {'content-type' : 'multipart/form-data'},
            mode : 'cors',  
        }
        formData.append('file', this.state.img[0]);
        formData.append('examId', this.state.examId);
        formData.append('nickName', this.state.nickName);
        //node로 주소를 던질때는, http://는 붙이지 않는다.
        const res = await axios.post("http://localhost:5505/examboard/examimgupload/", formData, config);
        if(res['data']['error_message']){
            console.dir(res['error_message']);
            this.setState({...this.state, open : true, message : "upload fail : " + '이미지 업로드 실패'});
            //this.setState({...this.state, img : [], uploadedImg : true});
        }
        else if(res['data']['success_message']){
            this.setState({...this.state, uploadedImg : true});
            this.setState({...this.state, img : []});
        }
    }

    checkPhonenumber() {
        var data = {'phoneNumber' : this.state.phoneNumber};
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
            if(json.hasOwnProperty('error_message')){
                this.setState({...this.state, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('verifyCode')){
                console.log(json['verifyCode']);
                this.setState({...this.state, verifyCode : json['verifyCode'], open : true, message : json['success_message']});
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    checkVerifycode(){
        var verifyCode = this.state.verifyCode, userVerifyCode = this.state.userVerifyCode;
        if(verifyCode == undefined) {}
        if(verifyCode == userVerifyCode){
            this.setState({...this.state, checkphonenumber : true, open : true, message : "핸드폰 인증이 완료되었습니다.", verifyCode : "", userVerifyCode : ""});
        }
        else{
            this.setState({...this.state, open : true, message : '인증번호가 다릅니다.'});
        }
    }

    openModal = () => {
        this.setState({...this.state, open : true});
    }
    closeModal = () => {
        this.setState({...this.state, open : false});
    }

    render()
    {
        return (
            (!this.state.nickName ? <h2>로그인을 해주시기 바랍니다!</h2> : this.state.open ? 
            <Modal open = {() => this.openModal()} close = {() => this.closeModal()} header = {this.state.message}></Modal> :
            <div class="App">
                <div id="one">
                        <div className="form-inner">
                            <h2>나의 정보</h2>
                            {!this.state.canrewrite ?
                            <button id="specialone" onClick = {() => this.setRewrite()}>수정하기</button>
                            :
                            <div>
                            <div className="form-group">
                                <label htmlFor="name">ID:</label>
                                <input type="text" name="name" id="name" value = {this.state.userId} onChange = {e => this.setState({...this.state, userId : e.target.value})}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" name="password" id="password" value = {this.state.userPassword} onChange = {e => this.setState({...this.state, userPassword : e.target.value})}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="nickname">닉네임:</label>
                                <input type="nickname" name="nickname" id="nickname" value = {this.state.nickName} onChange = {e => this.setState({...this.state, nickName : e.target.value})}></input>
                            </div>
                            <button id = 'specialone' onClick = {() => this.rewriteinfo()}>개인정보 수정</button> 
                            <div className="form-group">
                                <label htmlFor="phone-number">Phone-Number:</label>
                                <input type="phone-number" name="phone-number" id="phone-number" value = {this.state.phoneNumber} onChange = {e => this.setState({...this.state, phoneNumber : e.target.value, checkphonenumber : false})}></input>
                                <button onClick = {() => this.checkPhonenumber()}>인증번호 전송</button>
                                <input type="verifycode" name = "verifycode" id = "veriftycode" value = {this.state.userVerifyCode} onChange = {e => this.setState({...this.state, userVerifyCode : e.target.value})}></input>
                                <button onClick = {() => this.checkVerifycode()}>인증번호 확인</button>
                                <button onClick = {() => this.rewritePhone()}>휴대폰 번호 수정</button>
                            </div>
                            </div>
                            }
                            <div className="unique">
                                <select name="ex" onChange = {e => this.setState({...this.state, examId : e.target.value})} value = {this.state.examId}>
                                    <option value="toeic">토익점수</option>
                                    <option value="toefl">토플점수</option>
                                    <option value="teps">텝스점수</option>
                                </select>
                                    {/* <input type="radio" name="toeic" id="toeic"></input>
                                    <label for="toeic">토익 점수</label>
                                    <button id="specialseven">수정</button>
                                    <br></br>
                                    <input type="radio" name="toefl" id="toefl"></input>
                                    <label for="toefl">토플 점수</label>
                                    <button id="specialseven">수정</button>
                                    <br></br>
                                    <input type="radio" name="teps" id="teps"></input>
                                    <label for="teps">텝스 점수</label>
                                    <button id="specialseven">수정</button> */}
                                <Chart score = {this.state.score} examId = {this.state.examId}></Chart>
                                <button id = "specialone" onClick = {() => this.getScore()}>시험 점수 확인</button>
                            </div>
                            {!this.state.uploadedImg ?     
                                <div className="form-group">
                                    <label htmlFor="file[]">점수 인증 사진을 올리세요</label>
                                    
                                    <input type="file" multiple = "multiple" name="file[]" onChange = {e => this.setState({...this.state, img : e.target.files})}></input> 
                                    <button id = "specialone" onClick = {() => this.uploadImg()}>시험 인증 이미지 업로드</button>
                                </div>
                                :
                                    <h2>이미지 업로드 완료</h2>
                            }
                    </div>
                </div>
            </div>
        ));
    }
}

export default Userinfo;