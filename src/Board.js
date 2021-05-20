import React, { component } from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Board extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
                <TableRow>
                    <TableCell>{this.props.title}</TableCell>
                    <TableCell>{this.props.nickName}</TableCell>
                    <TableCell>{this.props.date}</TableCell>
                </TableRow>
        )
    }
}

export default Board;