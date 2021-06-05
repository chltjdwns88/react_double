import React, { component } from "react";
import {Redirect} from "react-router-dom";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Revise from "../src/Revise";
import Comment from "../src/Comment";
import Modal from "../src/Modal";
// import '../src/Bullet.css'

class Bullet extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            examId : this.props.examId,
            title : this.props.title,
            nickName : this.props.nickName,
            images : [],
            comments : [],
            inputcomment : "",
            fail : false,
            revise : false,
            deleted : false,
            open : false,
            message : "",
        }
        this.queryComment();
        this.queryImage();
    }

    queryComment(){
        var body = {examId : this.state.examId, title : this.state.title};
        fetch("http://localhost:5505/examboard/querycomment", {
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
                this.setState({...this.state, fail : true});
            }
            else if(json.hasOwnProperty('success_message')){
                this.setState({comments : []});
                this.setState({...this.state, comments : json['success_message']});
            }
        })
    }

    queryImage(){
        var body = {examId : this.state.examId, title : this.state.title};
        fetch("http://localhost:5505/examboard/queryimage", {
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
                this.setState({...this.state, open : true, message : "이미지를 불러오는데 실패했습니다."});
            }
            else if(json.hasOwnProperty('success_message')){
                this.setState({...this.state, images : json['success_message']});
                console.dir(this.state.images);
            }
        })
    }

    updateComment(){
        if(window.sessionStorage.getItem('islogined') == undefined || window.sessionStorage.getItem('islogined') == false){
            this.setState({...this.state, open : true, message : "댓글을 작성하실려면 로그인 부터 해주세요"});
            return;
        }
        var body = {examId : this.state.examId, title : this.state.title, nickName : window.sessionStorage.getItem('nickName'), content : this.state.inputcomment};
        fetch("http://localhost:5505/examboard/updatecomment", {
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
                this.setState({...this.state, fail : true});
            }
            else if(json.hasOwnProperty('success_message')){
                this.setState({...this.state, open : true, message : "댓글을 작성하였습니다."});
                this.queryComment();
            }
        })
    }

    deleteWrite(){
        if(!window.sessionStorage.getItem('islogined')){
            this.setState({...this.state, open : true, message : "글을 삭제하실려면 로그인 부터 해주세요"});
            return;
        }
        else if(window.sessionStorage.getItem('nickName') != this.state.nickName){
            this.setState({...this.state, open : true, message : "삭제를 할 권한이 없습니다."});
            return;
        }
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

    openModal = () => {
        this.setState({...this.state, open : true});
    }
    closeModal = () => {
        this.setState({...this.state, open : false});
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
                <Comment examId = {this.state.examId} title = {item.title} content = {item.content} nickName = {item.nickName} date = {item.date} reload = {() => this.queryComment()}></Comment>     
            );
        });

        const image = this.state.images.map((item, index) => {
            console.log(item.imgsrc);
            return <img src = {item.imgsrc}></img>
        });

        const bullet = <div style={contentStlye}>
                <h2>제목 : {this.props.title}</h2>
                <p style={bulletStyle}><p>내용</p>{this.props.content}</p>
                <p>{image}</p>
                <h2>작성자 : {this.props.nickName}</h2>
                <h2>작성 날짜 : {this.props.date}</h2>
            </div>
        
        const revise = <Revise examId = {this.state.examId} title = {this.props.title} content = {this.props.content} nickName = {this.props.nickName}></Revise>
        return(
            (this.state.open ? <Modal open = {() => this.openModal()} close = {() => this.closeModal()} header = {this.state.message}></Modal>: this.state.deleted ? <Redirect to = "/Free"></Redirect> : this.state.fail ? 
            <div>{bullet} <button onClick = {() => this.deleteWrite()}>글 삭제</button> <h2>댓글을 불러올 수 없습니다</h2> </div>:
            this.state.revise? <div>{revise}</div> : 
            <div style={buttonStyle}>{bullet}<button id="specialone"onClick = {() => this.deleteWrite()}>글 삭제</button>
            <button disabled = {((window.sessionStorage.getItem('nickName') != this.state.nickName) ? true : false)} onClick = {() => this.reviseWrite()} style={wantmargin} id = "specialone">글 수정</button>
            <input id = "searchone" onChange = {e => this.setState({...this.state, inputcomment : e.target.value})} value = {this.state.inputcomment}></input>
            <button id="specialtwo" onClick = {() => this.updateComment()}>댓글작성</button><ol>{comments}</ol></div>));
    }
}

export default Bullet;