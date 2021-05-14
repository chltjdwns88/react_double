import React, { component } from "react";

class Comment extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div>
                <li>{this.props.content}</li>
                <li>{this.props.nickName}</li>
                <li>{this.props.date}</li>                
            </div>
        );
    }
}

export default Comment;