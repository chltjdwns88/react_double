import React, { component } from "react";
import {Redirect} from "react-router-dom";

class Bullet extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            examId : this.props.examId,
            comments : [],
            fail : false,
            deleted : false,
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

    render(){
        const comments = this.state.comments.map((item, index) => {
            return <li>{item.content}, {item.nickName}, {item.date}</li>
        });
        const bullet = <div><h2>Title : {this.props.title}</h2><h2>Content : {this.props.content}</h2><h2>작성자 : {this.props.nickName}</h2><h2>작성 날짜 : {this.props.date}</h2></div>
        return(
            (this.state.deleted ? <Redirect to = "/Home"></Redirect> : this.state.fail ? <div>{bullet} <button onClick = {() => this.deleteWrite()}>글 삭제</button> <h2>댓글을 불러올 수 없습니다</h2> </div>: <div>{bullet} <button onClick = {() => this.deleteWrite()}>글 삭제</button><ol>{comments}</ol> </div>)
        );
    }
}

export default Bullet;