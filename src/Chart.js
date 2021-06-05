import React, { Component } from "react";
import {
    LineChart, Line, XAxis, VAxis, CartesianGrid, Tooltip, Legend, YAxis
} from 'recharts';

class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            score : this.props.score,
            examId : this.props.examId,
            data : []
        }
        console.dir(this.state.score);
        this.state.score.map((item, index) => {
            if(item[this.state.examId] == undefined) return;
            this.state.data.push({name : this.state.examId + '_' + (index + 1), score : item[this.state.examId]})
        });
    }

    render(){
        return(
            <LineChart
                width = {500}
                height = {300}
                data = {this.state.data}
                margin = {{
                    top : 20, right : 10, left : 5, bottom : 5,
                }}
                >
                    <CartesianGrid strokeDasharray = "3 3"/>
                    <XAxis dataKey = "name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type = "monotone" dataKey = "score" stroke = "#8884d8" activeDot = {{r : 8}}/>
                </LineChart>
        )
    }
}

export default Chart;