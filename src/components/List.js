import React from 'react';
import { Button, Icon } from 'react-materialize';
import ListContent from './ListContent'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.items !== this.props.items) this.setState({ items: this.props.items });
    }

    render() {
        console.log("\tList Rendered");
        return (
            <div style={{ margin: "1rem" }}>
                <div id='list-name' style={{ display: "inline" }}>
                    <h4 style={{ display: "inline" }}>{this.props.name}</h4>
                </div>
                <div id="content">
                    <ListContent
                        type={this.props.type}
                        items={this.state.items}
                        deleteCallback={this.props.deleteCallback}
                        createCallback={this.props.createCallback}
                    />
                </div >
            </div>
        );
    }
}

export default List;