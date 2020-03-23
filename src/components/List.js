import React from 'react';
import ListContent from './ListContent'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items : this.props.items
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.items !== this.props.items) this.setState({items : this.props.items});
    }

    render() {
        console.log("\tList Rendered");
        return (
            <div>
                <div id='list-name'>
                    <h4>{this.props.name}</h4>
                </div>
                <ListContent
                    type={this.props.type}
                    items={this.state.items}
                    deleteCallback={this.props.deleteCallback}
                />
            </div>
        );
    }
}

export default List;