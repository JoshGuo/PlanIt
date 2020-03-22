import React from 'react';
import {Container, Row, Col} from 'react-materialize';
import {db} from './firebase.js'
import './App.css';
import ListLinks from './components/ListLinks.js'
import List from './components/List.js'

class App extends React.Component {
    constructor() {
        super();
        let userName = 'admin';
        this.state = {
            loading: true,
            activeList: null,
            user : userName,
            lists: [],
            listContents: [],
            listTypes: [],
        };
    }

    componentDidMount() {
        console.log("App did mount");
        /**
         * Save the names of the lists by order of key (key specifies the position of the list) and grab the contents of the list types. (will have to change in future based off of type)
         */
        let listArray = this.state.lists;
        let listContentsArray = this.state.listContents;
        let listTypeArray = this.state.listTypes;
        db.collection('users').doc(this.state.user).collection('lists').orderBy("key").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((queryDocumentSnapshot) => {
                    listArray.push(queryDocumentSnapshot.id); //Gets name of list
                    listTypeArray.push(queryDocumentSnapshot.get("type"));
                    queryDocumentSnapshot.ref.collection("items").orderBy("dateCreated").get() //Iterates through all the items of a list
                        .then((querySnapshotItems) => {
                            let listArrayOfItems = [];
                            querySnapshotItems.forEach((queryDocumentSnapshotItems) => { //******Will have to be revisited when accounting for different list types*/
                                let listItemMap = {};
                                listItemMap.name = queryDocumentSnapshotItems.get("name");
                                listItemMap.dateCreated = queryDocumentSnapshotItems.get("dateCreated");
                                listItemMap.type = queryDocumentSnapshotItems.get("type");
                                listArrayOfItems.push(listItemMap);
                            });
                            listContentsArray.push(listArrayOfItems);
                        }).finally( () => {
                            this.setState({
                                loading: false,
                                listContents: listContentsArray
                            });
                        });
                });

            }).finally( () => {
                this.setState({
                    loading: true ? true : false,
                    activeList: "todoList",
                    lists : listArray,
                    listTypes : listTypeArray,
                });
            });
    }

    updateListsOrder(oldKey, newKey){
        let listArray = this.state.lists;
        let element = listArray[oldKey];
        if(oldKey >= newKey){
            listArray.splice(oldKey,1);
            listArray.splice(newKey,0,element);
        }else{
            listArray.splice(oldKey,1);
            listArray.splice(newKey,0,element);
        }
        this.setState({lists : listArray});
    }

    updateActiveList = (list) => {
        this.setState({
            activeList : list
        });
    }

    handleClick = () => {
        this.setState({
            lists : this.state.lists
        });
    }

    render() {
        console.log("App Rendered");
        if(this.state.loading)
            return (<div>Loading</div>);
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col s={3}>
                            <div id='header'>
                                <h6>Welcome {this.state.user}</h6>
                            </div>
                            <ListLinks 
                                lists={this.state.lists}
                                changeListCallback={this.updateActiveList}
                            />
                        </Col>
                        <Col s={9}>
                            <List 
                                name={this.state.activeList}
                                items={this.state.listContents[this.state.lists.indexOf(this.state.activeList)]}
                                type={this.state.listTypes[this.state.lists.indexOf(this.state.activeList)]}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
