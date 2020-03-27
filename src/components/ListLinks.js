import React from 'react';
import {Collection, CollectionItem, Modal, Button, Icon} from 'react-materialize';
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
        document.getElementById("new-list-name").value = "";
        this.setState({
            addingNewList : false
        })
    }

    createNewList = () => {
        console.log("createNewList");
        let name = document.getElementById("new-list-name").value;
        //Later must display error message if name is empty or if name is the same as a previous list (I could make this allowed, but would require restructuring of App.js and storage)
        if(name.length !== 0){
            //if name is unique
            this.props.createCallback(name, false, 0);
            this.closeNewListModal();
            //else display error
        }
        else{
            //display error
        }
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
                    options={{
                        onCloseEnd: this.closeNewListModal
                    }}
                    style={{width: "15%"}}
                    header="New List"
                    open={this.state.addingNewList}
                >
                    <div style={{display : "inline", margin: "0 8%"}}>
                        <input id="new-list-name" type="text" maxLength="20"placeholder="List Name" style={{display : "inline", color: "white", width:"80%"}}/>
                        <div style={{display : "inline", margin: "0 2rem"}}>
                        <Button style={{display : "inline", margin: ".5rem"}} icon={<Icon>check</Icon>} small onClick={this.createNewList}></Button>
                        <Button style={{display : "inline", margin: ".5rem"}} icon={<Icon>close</Icon>} small onClick={this.closeNewListModal}></Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ListLinks;