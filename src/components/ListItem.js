import React from 'react';

class ListItem extends React.Component {
    render() {
        let styleMap = {margin : "0rem 0rem 20px 0rem",
                        padding: "2px 2rem",
                        borderStyle: "solid",
                        borderRadius: "5px",
                        borderWidth: "0px 0px 2px 0px" 
                    };
        switch(this.props.type) {
            case 0: return(
                <div style={styleMap}>
                    {this.props.name}
                </div>
            );
            default: return(
                <div style={styleMap}>Unsupported Item Type</div>
            )
        }
    }
}

export default ListItem;