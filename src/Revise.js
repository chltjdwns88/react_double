import React, { component } from "react";
import { Redirect } from "react-router-dom";
import Modal from '../src/Modal';
/*
    1) 닉네임이 같은지 => 수정하는 사람이 글쓴이여야 하니까
    2) title, contenct 두개를 이제 우선 value로 넣어놔야됨 => 그래야 수정하기 편함
    3) 수정 완료 버튼 넣어주면 fetch 함수 써서 쿼리 보내서 sql에서 update
*/
class Revise extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.title);
        console.log(this.props.nickName);
        this.state = {
            ...this.state,
            prevtitle : this.props.title,
            title : this.props.title,
            content : this.props.content,
            examId : this.props.examId,
            nickName : this.props.nickName,
            open : false,
            message : "",
            disabled : true,
            redirect : false
        }
    }

    checkTitle = () => {
        var body = {'examId' : this.state.examId, 'title' : this.state.title};
        fetch('http://localhost:5505/examboard/checktitle', {
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
                if(json['success_message'][0]['COUNT(*)'] >= 1){
                    this.setState({...this.state, open : true, message : "이미 존재하는 제목입니다."});          
                }
                else{
                    this.setState({...this.state, titlecheck : true, open : true, message : "제목을 사용할 수 있습니다.", disabled : false})
                }
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    rewriteComplete = () => {
        if(this.state.disabled){
            this.setState({...this.state, open : true, message : "제목 중복확인을 해주세요"});
            return;
        }
        var body = {'prevtitle' : this.state.prevtitle, 'examId' : this.state.examId, 'title' : this.state.title, 'nickName' : this.state.nickName, 'content' : this.state.content};
        console.dir(body);
        fetch('http://localhost:5505/examboard/updatewrite', {
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
                this.setState({...this.state, open : true, message : "글 수정을 완료했습니다.", redirect : true});
            }
        })
        .catch(error => {
            this.setState({...this.state, open : true, message : error});
        })
    }

    openModal = () => {
        this.setState({...this.state, open : true});
    }
    closeModal = () => {
        this.setState({...this.state, open : false});
    }

    
    render(){
        var contentStlye = {
            textAlign: "center",
        }
        var bulletStyle = {
            marginTop: 10,
            marginLeft : 100,
            marginRight : 100,
            height:500,
            padding:20,
            backgroundColor: "rosybrown",
        }
        return(
            (this.state.open ? <Modal open = {() => this.openModal()} close = {() => this.closeModal()} header = {this.state.message}></Modal> :
            this.state.redirect ? <Redirect to = "/Home"></Redirect> :
            <div style={contentStlye}>
                <h2>글수정</h2>
                <div className="form-group">
                    <label htmlFor="titles">제목 : </label>
                    <input type="text" name="titles" onChange = {e => this.setState({...this.state, title : e.target.value})} value = {this.state.title}/>
                    <button id="specialthree" onClick={() => this.checkTitle()}>중복확인</button>
                </div>
                <div className="form-group">
                    <textarea style={bulletStyle} cols="100" rows="50" type="text" name="content" onChange = {e => this.setState({...this.state, content : e.target.value})} value = {this.state.content}/>
                </div>
                <button id="specialone" onClick = {() => this.rewriteComplete()}>수정 완료</button>
            </div>
            )
        );
    }
}

export default Revise;