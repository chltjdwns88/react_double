import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "../src/Home";
import Free from "../src/Free";
import Stuff from "./Stuff";
import App from "./App";
import App_signup from "./App_signup";
import Hero from "./Hero";
import Logout from "./logout";
import Userinfo from "./Userinfo";

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            islogined : window.sessionStorage.getItem('islogined'),
        }
    }

    logout(){
        this.setState({...this.state, islogined : undefined});
    }

    login(){
        this.setState({...this.state, islogined : true});
    }

    render(){
        const element = (this.state.islogined == undefined ? 
        <li><NavLink to="/App">로그인</NavLink></li> :
        <li><NavLink to="/Logout">로그아웃</NavLink></li>)
        return(
            <HashRouter>
                <div>
                    <header className="top">
                        <h1>졸작</h1>
                    </header>
                    <ul className="header">
                        <li><NavLink to="/Home">홈</NavLink></li>
                        <li><NavLink to="/Free">자유게시판</NavLink></li>
                        <li><NavLink to="/Stuff">시험 정보</NavLink></li>
                        {element}
                        <li><NavLink to="/App_signup">회원가입</NavLink></li>
                        <li><NavLink to="/Hero">만든이</NavLink></li>
                        <li><NavLink to="/Userinfo">나의 정보</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route path="/Home" component={Home}/>
                        <Route path="/Free" component={Free}/>
                        <Route path="/Stuff" component={Stuff}/>
                        <Route path="/App" render={() => <App login={() => this.login()} />}/>
                        <Route path="/App_signup" component={App_signup}/>
                        <Route path="/Hero" component={Hero}/>
                        <Route path="/Logout" render={() => <Logout logout={() => this.logout()} />}/>
                        <Route path="/Userinfo" component={Userinfo}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;