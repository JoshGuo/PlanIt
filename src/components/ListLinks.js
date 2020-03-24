import React from 'react';
import {Collection, CollectionItem} from 'react-materialize';
import ListLink from './ListLink.js'

class ListLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists : this.props.lists
        }
    }

    changeBackground = (e) => {
        e.target.className = "collection-item deep-purple darken-3";
    }

    changeBackgroundPurp = (e) => {
        e.target.className = "collection-item deep-purple";
    }

    render() {
        console.log("\tListLinks Rendered")
        return(
            <div id='list_of_lists'>
                <Collection>
                    {this.state.lists.map((list) => (
                        <CollectionItem className="deep-purple" style={{padding: "0px"}} href="#" onMouseOver={this.changeBackground} onMouseLeave={this.changeBackgroundPurp}>
                            <ListLink name={list} changeListCallback={this.props.changeListCallback}/>
                        </CollectionItem>
                    ))}
                </Collection>
            </div>
        );
    }
}

export default ListLinks;