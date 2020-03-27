import React from 'react';
import {Collection, CollectionItem, Modal, Button} from 'react-materialize';
import ListLink from './ListLink.js'

class ListLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists : this.props.lists,
            addingNewList : false
        }
    }

    changeBackground = (e) => {
        e.target.className = "collection-item red darken-3";
    }

    changeBackgroundPurp = (e) => {
        e.target.className = "collection-item red";
    }

    changeBackgroundGreen = (e) => {
        e.target.className = "collection-item grey";
    }

    changeBackgroundGrey = (e) => {
        e.target.className = "collection-item grey darken-2";
    }

    openNewListModal = () => {
        this.setState({
            addingNewList : true
        });
    }

    closeNewListModal = () => {
        this.setState({
            addingNewList : false
        })
    }

    render() {
        console.log("\tListLinks Rendered")
        return(
            <div id='list_of_lists'>
                <Collection>
                    {this.state.lists.map((list) => (
                        <CollectionItem className="red" style={{padding: "0px"}} href="#" onMouseOver={this.changeBackground} onMouseLeave={this.changeBackgroundPurp}>
                            <ListLink name={list} changeListCallback={this.props.changeListCallback}/>
                        </CollectionItem>
                    ))}
                    <CollectionItem className="grey darken-2" style={{padding: "0px", color:"#B0B0B0"}} href="#" onClick={this.openNewListModal} onMouseOver={this.changeBackgroundGreen} onMouseLeave={this.changeBackgroundGrey}>
                        <div id="new-list-button" style={{margin:"0 auto", padding:"10px"}}>
                            + Create New List
                        </div>
                    </CollectionItem>
                </Collection>
                <Modal
                    id="new-list-modal"
                    className="grey darken-2"
                    header="Create a New List"
                    open={this.state.addingNewList}
                >
                    Name of your new list
                </Modal>
            </div>
        );
    }
}

export default ListLinks;