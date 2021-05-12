import React, { component } from "react";

class Board extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h2>{this.props.title}</h2>
                <h2>{this.props.nickName}</h2>
                <h2>{this.props.date}</h2>
            </div>
        );
    }
}

export default Board;