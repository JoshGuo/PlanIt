import React from 'react';
import { Container, Row, Col } from 'react-materialize';
import { db } from './firebase.js'
import './App.css';
import ListLinks from './components/ListLinks.js'
import List from './components/List.js'

class App extends React.Component { //Will have to refactor to support lists vs schedules.
    constructor() {
        super();
        let userName = 'admin';
        this.state = {
            loading: true,
            activeList: null,
            user: userName,
            lists: [],
            listContents: [],
            listTypes: [],
            date: this.getDate()
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
                                listItemMap.id = queryDocumentSnapshotItems.id;
                                listArrayOfItems.push(listItemMap);
                            });
                            listContentsArray.push(listArrayOfItems);
                        }).finally(() => {
                            this.setState({
                                loading: false,
                                listContents: listContentsArray
                            });
                        });
                });

            }).finally(() => {
                this.setState({
                    loading: true ? true : false,
                    activeList: "todoList",
                    lists: listArray,
                    listTypes: listTypeArray,
                });
            });
    }

    getDate() {
        let date = new Date();
        let month = date.getMonth();
        let dayNum = date.getDate();
        let day = date.getDay();
        let fullDate = "";

        switch (day) {
            case 0: fullDate += "Sunday";
                break;
            case 1: fullDate += "Monday";
                break;
            case 2: fullDate += "Tuesday";
                break;
            case 3: fullDate += "Wednesday";
                break;
            case 4: fullDate += "Thursday";
                break;
            case 5: fullDate += "Friday";
                break;
            case 6: fullDate += "Saturday";
                break;
        }

        fullDate += ", "

        switch (month) {
            case 0: fullDate += "January";
                break;
            case 1: fullDate += "February";
                break;
            case 2: fullDate += "March";
                break;
            case 3: fullDate += "April";
                break;
            case 4: fullDate += "May";
                break;
            case 5: fullDate += "June";
                break;
            case 6: fullDate += "July";
                break;
            case 7: fullDate += "August";
                break;
            case 8: fullDate += "September";
                break;
            case 9: fullDate += "October";
                break;
            case 10: fullDate += "November";
                break;
            case 11: fullDate += "December";
                break;
        }

        fullDate += " " + dayNum;
        return fullDate;
    }

    updateListsOrder(oldKey, newKey) {
        let listArray = this.state.lists;
        let element = listArray[oldKey];
        if (oldKey >= newKey) {
            listArray.splice(oldKey, 1);
            listArray.splice(newKey, 0, element);
        } else {
            listArray.splice(oldKey, 1);
            listArray.splice(newKey, 0, element);
        }
        this.setState({ lists: listArray });
    }

    /**
     * Callback function for ListLinks to change the name of the active list to whicheever list was clicked on
     */
    updateActiveList = (list) => {
        this.setState({
            activeList: list
        });
    }

    createDocument = (itemName, isItem) => {
        if(isItem) {
            let item = {
                dateCreated: new Date(),
                name: itemName,
                type: 0
            }
            db.collection("users").doc(this.state.user).collection("lists").doc(this.state.activeList).collection("items").add(item)
                .then((docRef) => {
                    console.log("Created new item");
                    item.id = docRef.id;
                    let itemArray = this.state.listContents;
                    itemArray[this.state.lists.indexOf(this.state.activeList)].push(item);
                    this.setState({
                        listContents : itemArray
                    });
                });
        }
    }

    deleteDocument = (id, isItem) => {
        if(isItem) {
            db.collection("users").doc(this.state.user).collection("lists").doc(this.state.activeList).collection("items").doc(id).delete()
                .then(() => {
                    console.log("Deleting item " + id + " from Firestore");
                    let index = this.state.lists.indexOf(this.state.activeList);
                    let listContentsArray = this.state.listContents;
                    listContentsArray[index].forEach((itemMap) => {
                        if(itemMap.id === id){
                            listContentsArray[index].splice(listContentsArray[index].indexOf(itemMap), 1);
                        }
                    })
                    this.setState({
                        listContents : listContentsArray
                    });
                });
        }else {
            db.collection("users").doc(this.state.user).collection("lists").doc(id).delete()
                .then(() => {
                    console.log("Deleting list " + id + " from Firestore");
                });
        }
    }

    render() {
        console.log("App Rendered");
        if (this.state.loading)
            return (<div>Loading</div>);
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col s={3}>
                            <div id='header'>
                                <h6>Welcome {this.state.user}</h6>
                                <h6>Today is {this.state.date}</h6>
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
                                deleteCallback={this.deleteDocument}
                                createCallback={this.createDocument}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
