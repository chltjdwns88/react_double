import React, { component } from "react";

class Bullet extends React.Component{
    render(){
        return(
            <div>
                <h2>Title : {this.props.title}</h2>
                <h2>Content : {this.props.content}</h2>
                <h2>작성자 : {this.props.nickName}</h2>
                <h2>작성 날짜 : {this.props.date}</h2>
            </div>
        );
    }
}

export default Bullet;