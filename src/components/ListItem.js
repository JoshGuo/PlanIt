import React from 'react';

class ListItem extends React.Component {

    handleCompletedTask = () => {
        console.log("handleCompletedTask");
        this.props.deleteCallback(this.props.id, true);
    }

    render() {
        let styleMap = {
            margin: "0rem 0rem 10px 0rem",
            padding: "0 0 .25rem 0",
            borderStyle: "solid",
            borderRadius: "0px 0px 5px 0px",
            borderWidth: "0px 1px 1px 0px",
        };

        switch(this.props.type) {   
            case 0: return (
                <div style={styleMap}>
                    <div style={{margin: "0 10px", display: "inline"}}>
                        <button style={{height: "1rem", borderRadius:".5rem"}} onClick={this.handleCompletedTask}></button>
                    </div>
                    <p style={{display: "inline", fontSize: "14pt"}}>{this.props.name}</p>
                </div>
            );
            default: return(
                <div style={styleMap}>Unsupported Item Type</div>
            );
        }
    }
}

export default ListItem;