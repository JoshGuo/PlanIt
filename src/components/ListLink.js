import React from 'react'

class ListLink extends React.Component {
    constructor(props) {
        super(props);
    }

    changeList = () => {
        this.props.changeListCallback(this.props.name);
    }

    render() {
        return (
            <div onClick={this.changeList} style={{padding:"10px", color:"white", fontSize:"15pt"}}>
                {this.props.name}
            </div>
        );
    }
}

export default ListLink;