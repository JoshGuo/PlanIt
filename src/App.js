import React from 'react';
import {Container, Button, Row, Col} from 'react-materialize';
import {db} from './firebase.js'
import './App.css';
import ListLinks from './components/ListLinks'

class App extends React.Component {
    constructor() {
        super();
        let userName = 'admin';
        let listArray = [];

        this.state = {
            loading: true,
            activeList: null,
            user : userName,
            lists: listArray
        };
    }

    componentDidMount() {
        console.log("App did mount");
        /**
         * Save the names of the lists by order of key (key specifies the position of the list)
         */
        let listArray = this.state.lists;
        db.collection('users').doc(this.state.user).collection('lists').orderBy("key").get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    listArray.push(doc.id);
                });
            }).finally( () => {
                this.setState({
                    loading: false,
                    activeList: "todoList",
                    lists : listArray
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
        console.log("App Rendered")
        if(this.state.loading)
            return (<div>LOADING</div>);
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col s={4}>
                            <ListLinks 
                                lists={this.state.lists}
                                changeListCallback={this.updateActiveList}
                            />
                        </Col>
                        <Col s={8}>
                            <h4>{this.state.activeList}</h4>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
