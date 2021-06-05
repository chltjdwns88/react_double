import { TableRow } from "@material-ui/core";
import React, { component } from "react";
import TableCell from '@material-ui/core/TableCell';
import Modal from './Modal';

class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            examId : this.props.examId,
            title : this.props.title,
            nickName : this.props.nickName,
            content : this.props.content,
            date : this.props.date,
            revisecontent : "",
            open : false,
            message : "",
        }
    }
    
    insertComment(){
        if(window.sessionStorage.getItem('nickName') != this.state.nickName){
            this.setState({...this.state, open : true, message : "접근권한이 없습니다."});
            return;
        }
        console.log(this.state.date);
        var body = {'examId' : this.state.examId, 'title' : this.state.title, 'revisecontent' : this.state.revisecontent, 'content' : this.state.content, 'date' : this.state.date };
        fetch("http://localhost:5505/examboard/insertcomment" , {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(body)
        })
        .then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty('error_message')){
                this.setState({...this.state, open : true, message : '댓글을 저장하는데 실패했습니다.'});
            }
            else if(json.hasOwnProperty('success_message')){
                console.log("success")
                this.setState({...this.state, open : true, message : '댓글 수정이 완료되었습니다.', content : this.state.revisecontent, revisecontent : ""});
                this.props.reload();
            }
        })
    };

    deleteComment(){
        if(window.sessionStorage.getItem('nickName') != this.state.nickName){
            this.setState({...this.state, open : true, message : "접근권한이 없습니다."});
            return;
        }
        var body = {'examId' : this.state.examId, 'title' : this.state.title, 'content' : this.state.content, 'date' : this.state.date};
        fetch("http://localhost:5505/examboard/deletecomment" , {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(body)
        })
        .then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty('error_message')){
                this.setState({...this.state, open : true, message : '댓글을 저장하는데 실패했습니다.'});
            }
            else if(json.hasOwnProperty('success_message')){
                console.log("success")
                this.setState({...this.state, open : true, message : '댓글 삭제가 완료되었습니다.'});
                this.props.reload();
            }
        })
    }

    openModal = () => {
        this.setState({...this.state, open : true});
    }
    closeModal = () => {
        this.setState({...this.state, open : false});
    }

    render(){
        return(
            this.state.open ? <Modal open = {() => this.openModal()} close = {() => this.closeModal()} header = {this.state.message}></Modal> :
            <div>
            <TableRow>
                <TableCell>{this.state.content}</TableCell>
                <TableCell>{this.state.nickName}</TableCell>
                <TableCell>{this.state.date}</TableCell>
            </TableRow>
            <input id = "searchone" onChange = {e => this.setState({...this.state, revisecontent : e.target.value})} value = {this.state.revisecontent}></input>
            <button id = "specialone" onClick = {() => this.insertComment()}>수정</button>
            <button id = "specialone" onClick = {() => this.deleteComment()}>삭제</button>
            </div>
        );
    }
}

export default Comment;