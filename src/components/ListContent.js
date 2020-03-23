import React from 'react';
import {CardPanel} from 'react-materialize';
import ListItem from './ListItem.js'

class ListContent extends React.Component {
    render() {
        if(this.props.items.length === 0)
            return (
                <CardPanel className="grey darken-3" style={{padding: "5px 0px 5px 0px"}}>
                    <div>This list is empty! Try adding something to the list.</div>
                </CardPanel>
            );
        switch(this.props.type){
            case 0: return(
                <CardPanel className="grey darken-3" style={{padding: "5px 0px 5px 0px"}}>
                    <ul id="list-items">
                        {this.props.items.map((item) => (
                            <li>
                                <ListItem
                                    name={item.name}
                                    type={item.type}
                                    id={item.id}
                                    deleteCallback={this.props.deleteCallback}
                                />
                            </li>
                        ))}
                    </ul>
                </CardPanel>
            );
            default: return(<div>Unsupported List Type</div>);
        }
    }
}

export default ListContent;