import { TableRow } from "@material-ui/core";
import React, { component } from "react";
import TableCell from '@material-ui/core/TableCell';

class Comment extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.content}</TableCell>
                <TableCell>{this.props.nickName}</TableCell>
                <TableCell>{this.props.date}</TableCell>
            </TableRow>
        );
    }
}

export default Comment;