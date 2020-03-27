import React from 'react';
import { CardPanel, Button, Icon} from 'react-materialize';
import ListItem from './ListItem.js'

class ListContent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addingNew : false
        }
        this.ref = React.createRef();
    }
    
    componentDidUpdate(prevProps) {
        if(prevProps.items !== this.props.items){
            this.closeNewItemMenu();
        }
        else if (this.state.addingNew){
            this.ref.current.focus();
        }
    }

    handleNewItem = () => {
        console.log("handleNewItem");
        this.setState({
            addingNew : true
        })
    }

    handleCreateNewItem = () => {
        let input = document.getElementById("new-item-name");
        this.props.createCallback(input.value, true);
        this.closeNewItemMenu();
    }

    closeNewItemMenu = () => {
        console.log("closeNewItemMenu");
        let input = document.getElementById("new-item-name");
        if(input !== null) input.value = "";
        this.setState({
            addingNew : false
        });
    }

    render() {
        let styleMap = {
            margin: "0rem 0rem 15px 0rem",
            padding: "0 .5rem 0 1rem",
            borderStyle: "solid",
            borderRadius: "0px 0px 5px 0px",
            borderWidth: "0px 0px 1px 0px",
        };

        let classInput = this.state.addingNew ? "" : "hidden";
        let classButton = this.state.addingNew ? "hidden" : "";

        switch (this.props.type) {
            case 0: 
                if (this.props.items.length === 0)  //Empty list
                    return (
                        <CardPanel className="grey darken-3" style={{ padding: "5px 0px 5px 0px" }}>
                            <div style={styleMap} class={classInput}>
                                <input id="new-item-name" ref={this.ref} type="text" style={{height: "25px", width:"86.5%", backgroundColor: "grey", borderWidth: "0", color: "white", margin:"0 0rem .5rem 0", padding:"0", fontFamily: "Comfortaa, cursive", display: "inline"}}/>
                                <Button 
                                    small 
                                    className="green"
                                    icon={<Icon>check</Icon>}
                                    style={{margin: "0 0 5px 5px"}}
                                    onClick={this.handleCreateNewItem}
                                    >
                                </Button>
                                <Button 
                                    small 
                                    className="red"
                                    icon={<Icon>close</Icon>}
                                    style={{margin: "0 0 5px 5px"}}
                                    onClick={this.closeNewItemMenu}
                                    >
                                </Button>
                            </div>
                            <div class={classButton}style={{ margin: "0 0 5px 6px" }}>
                                <Button
                                    className="light-blue"
                                    floating
                                    small
                                    style={{ color: "black", fontSize: "15pt", padding: "0 0 0 0", textAlign: "center" }}
                                    icon={<Icon>add</Icon>}
                                    onClick={this.handleNewItem}
                                >
                                </Button>
                            </div>
                        </CardPanel>
                    );
                else    //Not an empty list
                    return (
                        <CardPanel className="grey darken-3" style={{ padding: "1px 0px 5px 0px" }}>
                            <div style={{padding:"0px"}}>
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
                            </div>
                            <div style={styleMap} class={classInput}>
                                <input id="new-item-name" ref={this.ref} type="text" style={{height: "25px", width:"86.5%", backgroundColor: "grey", borderWidth: "0", color: "white", margin:"0 0rem .5rem 0", padding:"0", fontFamily: "Comfortaa, cursive", display: "inline"}}/>
                                <Button 
                                    small 
                                    className="green"
                                    icon={<Icon>check</Icon>}
                                    style={{margin: "0 0 5px 5px"}}
                                    onClick={this.handleCreateNewItem}>

                                </Button>
                                <Button 
                                    small 
                                    className="red"
                                    icon={<Icon>close</Icon>}
                                    style={{margin: "0 0 5px 5px"}}
                                    onClick={this.closeNewItemMenu}>

                                </Button>
                            </div>
                            <div class={classButton}style={{ margin: "0 0 5px 6px" }}>
                                <Button
                                    className="light-blue"
                                    floating
                                    small
                                    style={{ color: "black", fontSize: "15pt", padding: "0 0 0 0", textAlign: "center" }}
                                    icon={<Icon>add</Icon>}
                                    onClick={this.handleNewItem}
                                >
                                </Button>
                            </div>
                        </CardPanel>
                    );
            default: return (<div>This list type is unsupported as of now. Currently, the only supported type is a simple checklist</div>);
        }
    }
}

export default ListContent;