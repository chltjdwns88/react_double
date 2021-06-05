import React, { Component } from "react";
import TodoItems from "./TodoItems";
import examcode from "./exam_code";
import Modal from "./Modal";
import "./index.css";

class Todolist extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            examId : "",
            results : [],
            open : false,
        };
    }
    searchExam(){
        fetch('http://localhost:5505/searchexam/' + this.state.examId, {
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
                var tjson = JSON.parse(json['success_message']);
                if(tjson['body']['items'].length <= 0){
                    this.setState({...this.state, open : true, message : "검색 결과가 없습니다.", results : []});
                }
                else{
                    this.setState({...this.state, results : tjson['body']['items']});
                }          
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    openModal = () => {
        this.setState({...this.state, open : true});
    }
    closeModal = () => {
        this.setState({...this.state, open : false});
    }

    render(){
        let element
        if(this.state.results.length > 0){
            element = this.state.results.map((data, idx) => {
                return (<div>
                    <p>시행년도 : {data.implYy}</p>
                    <p>필기시험 원서접수 시작일 : {data.docRegStartDt}</p>
                    <p>필기시험 원서접수 종료일 : {data.docRegEndDt}</p>
                    <p>필기시험 시작일자 : {data.docExamStartDt}</p>
                    <p>필기시험 종료일자 : {data.docExamEndDt}</p>
                    <p>필기 발표 합격 일자 : {data.docPassDt}</p>
                    <p>실기 면접 시험 원서접수 시작 일자 : {data.pracRegStartDt}</p>
                    <p>실기 면접 시험 원서접수 종료 일자 : {data.pracRegEndDt}</p>
                    <p>실기시험 시작일자 : {data.pracExamStartDt}</p>
                    <p>실기시험 종료일자 : {data.pracExamEndDt}</p>
                    <p>실기 발표 합격 일자 : {data.pracPassDt}</p>
                    </div>
                    );
            });
        }
        return( this.state.open ? <Modal open = {() => this.openModal()} close = {() => this.closeModal()} header = {this.state.message}></Modal> :
            <div>
                <div className="header">
                    <input type = "text" onChange = {e => this.setState({...this.state, examId : e.target.value})} value = {this.state.examId} placeholder = {"시험 이름"}></input>
                    <button onClick = {() => this.searchExam()}>검색</button>
                    {element}
                </div>
            </div>
        );
    }
}

export default Todolist;