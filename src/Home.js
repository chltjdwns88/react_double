import React, { Component } from "react";
import abc from "../src/image/abc.png";

class Home extends Component{
    render(){
        const imagestyle = { height: "150px", width : "150px"};
        return(
            <div>
                <h2>hello!</h2>
                <p>어쩌구 저쩌구</p>
                <p>저쩌구 어쩌구</p>
                <img src={abc} style={imagestyle}/>
            </div>
        );
    }
}

export default Home;