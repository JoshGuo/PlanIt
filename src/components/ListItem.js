import React from 'react';
import { Button, Icon } from 'react-materialize';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconTextColor: "#505050"
        }
    }

    handleCompletedTask = () => {
        console.log("handleCompletedTask");
        this.props.deleteCallback(this.props.id, true);
    }

    changeColor = (e) => {
        console.log("handleCheckHover");
        this.setState({
            iconClass: "white",
            iconTextColor: "#00FF7F"
        })
    }

    changeColorBack = (e) => {
        console.log("handleCheckHover");
        this.setState({
            iconTextColor: "#505050"
        })
    }

    render() {
        let styleMap = {
            margin: "0rem 0rem 10px 0rem",
            padding: "0 0 0rem 0",
            borderStyle: "solid",
            borderRadius: "0px 0px 5px 0px",
            borderWidth: "0px 0px 1px 0px",
        };
        switch (this.props.type) {
            case 0: return (
                <div style={styleMap}>
                    <div style={{display: "inline", position: "absolute" }}>
                        <a href="#" style={{ color: this.state.iconTextColor, margin:"10px" }} onMouseOver={this.changeColor} onMouseLeave={this.changeColorBack} onClick={this.handleCompletedTask}>
                            <Icon className="grey darken-4">check</Icon>
                        </a>
                    </div>
                    <div style={{display: "inline", fontSize: "15pt", margin:"0 0 0 3rem"}}>
                        {this.props.name}
                    </div>
                </div>
            );
            default: return (
                <div style={styleMap}>Unsupported Item Type</div>
            );
        }
    }
}

export default ListItem;