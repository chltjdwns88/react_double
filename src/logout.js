import React from "react";
import { Redirect } from "react-router-dom";

class Logout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect : false,
        }
    }

    logOut(){
        window.sessionStorage.removeItem('islogined');
        window.sessionStorage.removeItem('nickName');
        this.props.logout();
        this.setState({...this.state, redirect : true})
    }

    render(){
        return (
            this.state.redirect ? <Redirect to="/Home"></Redirect>:
            <button id="specialone" onClick={() => this.logOut()}>로그아웃</button>
        )
    }
}

export default Logout;