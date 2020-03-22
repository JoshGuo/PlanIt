import React from 'react';
import {CardPanel} from 'react-materialize';
import ListItem from './ListItem.js'

class ListContent extends React.Component {
    render() {
        switch(this.props.type){
            case 0: return(
                <CardPanel className="grey darken-3" style={{padding: "5px 0px 5px 0px"}}>
                    <ul id="list-items">
                        {this.props.items.map((item) => (
                            <li>
                                <ListItem
                                    name={item.name}
                                    type={item.type}
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