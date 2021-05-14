import React, { Component } from "react";
import { HashRouter, NavLink } from "react-router-dom";
import Menu_item from '../src/Menu_item';
import exam_code from '../src/exam_code';
import Board from '../src/Board';
import Bullet from '../src/Bullet';
import Comment from '../src/Comment';
import Write from '../src/Write';

class Free extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            key : Object.keys(exam_code),
            check : false,
            bulletcheck : false,
            page : 1,
            results : [],
            open : false,
            message : "",
            examId : "",
            write : false,
        }
    }

    buttonCheck(item){
        fetch('http://localhost:5505/examboard/' + item + '/' + this.state.page, {
            method : 'GET',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty('error_message')){
                this.setState({...this.state, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('success_message')){
                console.log("here");
                this.setState({...this.state, check : true, results : json['success_message'], examId : item});          
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    buttonBullet(title, nickName){
        fetch('http://localhost:5505/examboard/' + this.state.examId + '/' + title + '/' + nickName, {
            method : 'GET',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty('error_message')){
                this.setState({...this.state, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('success_message')){
                this.setState({...this.state, bulletcheck : true, results : json['success_message']});          
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    writeCheck(){
        if(!window.sessionStorage.getItem('islogined')) {
            console.log('로그인을 해주세요')
            return;
        }
        this.setState({...this.state, writeCheck : true});
    }

    render(){
        var key = Object.keys(exam_code);
        var check = this.state.check;
        const elements = this.state.key.map((item, index) => {
            return <div value ={item} onClick = {() => this.buttonCheck(item)}><li key = {index}><Menu_item title = {item}></Menu_item></li></div>
        });
        const exam_content = this.state.results.map((item, index) => {
            return <div value = {item} onClick = {() => this.buttonBullet(item.title, item.nickName)}><li key = {index}><Board examId = {this.state.examId} title = {item.title} nickName = {item.nickName} date = 
            {item.date}/></li></div>
        });
        const bullet_content = this.state.results.map((item, index) => {
            return <div>
                    <li><Bullet examId = {this.state.examId} title = {item.title} content = {item.content} nickName = {item.nickName} date = {item.date}></Bullet></li>
                </div>
        });

        return(
            (this.state.writeCheck ? <Write examId = {this.state.examId}></Write> : !this.state.check 
                ? <div><ol>{elements}</ol></div>
                : this.state.bulletcheck ?  
                <ol>{bullet_content}</ol> 
                : <ol>{exam_content}<button onClick = {() => this.writeCheck()}>글작성</button></ol>
            ) 
        );
    }
}

export default Free;