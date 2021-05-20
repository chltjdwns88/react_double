import React, { Component } from "react";
//import abc from "../src/image/abc.png";
//import choi from "../src/image/choi.jpg";
//import kim from "../src/image/kim.jpg";
//import bong from "../src/image/bong.jpg";

class Hero extends Component{
    render(){
        const imagestyle = { height: "150px", width : "150px"};
        var ourstyle = {
            display:"inline-block",
            textAlign:"center",
            justifyContent : "space-between",
            padding : "10px 30px 30px 40px"
        }
        return(
            <div style={ourstyle}>
                <div style={ourstyle}>
                    <h2>이봉원</h2>
                    <p>20150000</p>
                    <p>서버 DB</p>
                    <img src="bong.jpg" style={imagestyle}/>
                </div>
                <div style={ourstyle}>
                    <h2>김민준</h2>
                    <p>123123123</p>
                    <p>앱</p>
                    <img src="kim.jpg" style={imagestyle}/>
                </div>
                <div style={ourstyle}>
                    <h2>최성준</h2>
                    <p>20150346</p>
                    <p>웹</p>
                    {/* <img src={require("C:/Users/chltj/OneDrive/바탕 화면/깃에올릴꺼/react/react_spa/public/choi.jpg")} alt="choi"/> */}
                </div>
            </div>
        );
    }
}

export default Hero;