import React, { component } from "react";

class Menu_item extends React.Component{
    render(){
        return(
            <div>
                <h2>{this.props.title}</h2>
            </div>
        );
    }
}

export default Menu_item;