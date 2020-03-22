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

    render() {
        console.log("\tListLinks Rendered")
        return(
            <div id='list_of_lists'>
                <Collection>
                    {this.state.lists.map((list) => (
                        <CollectionItem className="deep-purple" style={{padding: "0px"}} href="#">
                            <ListLink name={list} changeListCallback={this.props.changeListCallback}/>
                        </CollectionItem>
                    ))}
                </Collection>
            </div>
        );
    }
}

export default ListLinks;