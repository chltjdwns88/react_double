import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import Modal from "../src/Modal";
import axios from 'axios';

class Write extends Component{
    constructor(props){
        super(props);
        console.log(this.props.examId);
        this.state = ({
            ...this.state,
            examId : this.props.examId,
            title : "", 
            content : "",
            titlecheck : false,
            open : false,
            message : "",
            writeComplete : false,
            img : [],
            uploadedImg : false,
            disabled : true,
        })
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

    completeWrite = () => {
        if(!this.state.titlecheck){
            this.setState({...this.state, open : true, message : "제목 중복확인을 해주세요"});
            return;
        }
        var body = {'examId' : this.state.examId, 'title' : this.state.title, 'content' : this.state.content, 'nickName' : window.sessionStorage.getItem('nickName')}
        fetch('http://localhost:5505/examboard/createcomplete', {
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
                this.setState({...this.state, writeComplete : true});
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    uploading = (e) =>{
        this.setState({...this.state, img : e.target.files});
    }

    uploadImg = async() => {
        const formData = new FormData();
        const config = {
            header : {'content-type' : 'multipart/form-data'},
            mode : 'cors',
        }
        for(var i = 0 ; i < this.state.img.length ; i++)
            formData.append('file', this.state.img[i]);
        formData.append('examId', this.state.examId);
        formData.append('title', this.state.title);
        formData.append('nickName', this.state.nickName);
        //node로 주소를 던질때는, http://는 붙이지 않는다.
        const res = await axios.post("http://localhost:5505/examboard/uploadimg/", formData, config);
        if(res['data'].hasOwnProperty('error_message')){
            console.dir(res['error_message']);
            this.setState({...this.state, open : true, message : "upload fail : " + res['data']['error_message']});
        }
        else if(res['data'].hasOwnProperty('success_message')){
            this.setState({...this.state, uploadedImg : true});
            console.dir(res['data']['success_message']);
        }
        else{
            console.dir(res);
            console.log("herre");
            this.setState({...this.state, open : true, message : res});
        }
    }
    openModal = () => {
        this.setState({...this.state, open : true});
    }
    closeModal = () => {
        this.setState({...this.state, open : false});
    }

    render(){
        const upload = (this.state.img.length >= 1 && this.state.uploadedImg ? <div><h2>이미지가 업로드 되어 있습니다.</h2></div> :
         <div><input disabled = {this.state.disabled} multiple = 'multiple' type = 'file' name = 'file[]' onChange={(e) => this.uploading(e)}></input>
        <button disabled = {this.state.disabled} onClick = {() => this.uploadImg()}>이미지 업로드</button></div>)
        return(
            this.state.open ? <Modal open = {() => this.openModal()} close = {() => this.closeModal()} header = {this.state.message}></Modal> : this.state.writeComplete ?
            <Redirect to = "/Home"></Redirect> :
            <div>
            <div>
                <h2>글쓰기</h2>
                <div className="form-group">
                    <label htmlFor="title">제목 : </label>
                    <input type="text" name="title" id="title" onChange={e => this.setState({...this.state, title : e.target.value})} value={this.state.title}/>
                    <button onClick={() => this.checkTitle()}>중복확인</button>
                </div>
                <div className="form-group">
                    <label htmlFor="content">내용 : </label>
                    <input type="textarea" name="content" id="content" onChange={e => this.setState({...this.state, content: e.target.value})} value={this.state.content}/>
                </div>
                {upload}
                <button onClick={() => this.completeWrite()}>글 작성 완료</button>
           </div>
        </div>
        )
    }
}

export default Write;