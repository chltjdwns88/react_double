import React from "react";

class Image extends React.Component{
    render(){
        return(
            <div>
                파일첨부<input type="file" name="FileName"></input>
            </div>
        );
    }
    
}

export default Image;