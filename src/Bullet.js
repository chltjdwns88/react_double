import React, { component } from "react";
import {Redirect} from "react-router-dom";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Revise from "../src/Revise";

// import '../src/Bullet.css'

class Bullet extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            examId : this.props.examId,
            comments : [],
            fail : false,
            revise : false,
            deleted : false,
            nickName : this.props.nickName,
        }

        var body = {examId : this.state.examId, title : this.props.title};
        fetch("http://localhost:5505/examboard/comment/" + this.state.examId + "/" + this.props.title + "/1", {
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
                this.setState({...this.state, fail : true});
            }
            else if(json.hasOwnProperty('success_message')){
                this.setState({...this.state, comments : json['success_message']});
            }
        })
    }

    deleteWrite(){
        var data = {'examId' : this.state.examId, 'title' : this.props.title};
        fetch("http://localhost:5505/examboard/deletewrite" , {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty('error_message')){
                console.log("fail")
                this.setState({...this.state});
            }
            else if(json.hasOwnProperty('success_message')){
                console.log("success")
                this.setState({...this.state, deleted : true});
            }
        })
    }

    reviseWrite(){
        this.setState({...this.state, revise : true});
    }
    render(){
        var bulletStyle = {
            marginTop: 10,
            marginLeft : 100,
            marginRight : 100,
            height:500,
            padding:20,
            backgroundColor: "rosybrown",
        }
        var wantmargin = {
            margin:10,
        }

        var contentStlye = {
            textAlign: "center",
        }

        var buttonStyle = {
            textAlign: "center",
        }
        const comments = this.state.comments.map((item, index) => {
            return(
                     <TableRow>
                        <TableCell>{item.content}</TableCell>
                        <TableCell>{item.nickName}</TableCell>
                        <TableCell>{item.date}</TableCell>
                    </TableRow>    
            );
        });
        const bullet = <div style={contentStlye}><h2>제목 : {this.props.title}</h2><p style={bulletStyle}><p>내용</p>{this.props.content}</p><h2>작성자 : {this.props.nickName}</h2><h2>작성 날짜 : {this.props.date}</h2></div>
        const revise = <Revise examId = {this.state.examId} title = {this.props.title} content = {this.props.content} nickName = {this.props.nickName}></Revise>
        return(
            (this.state.deleted ? <Redirect to = "/Home"></Redirect> : this.state.fail ? 
            <div>{bullet} <button onClick = {() => this.deleteWrite()}>글 삭제</button> <h2>댓글을 불러올 수 없습니다</h2> </div>:
            this.state.revise? <div>{revise}</div> : 
            <div style={buttonStyle}>{bullet}<button id="specialone"onClick = {() => this.deleteWrite()}>글 삭제</button>
            <button disabled = {((window.sessionStorage.getItem('nickName') != this.state.nickName) ? true : false)} onClick = {() => this.reviseWrite()} style={wantmargin} id = "specialone">글 수정</button>
            <button id="specialtwo">댓글작성</button><ol>{comments}</ol></div>));
    }
}

export default Bullet;