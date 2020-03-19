import React from 'react';
import {Container, Range} from 'react-materialize';
import './App.css';

function App() {
  return (
    <div className="App">
        <Container>
          <Range min='4' max='100'></Range>
        </Container>
    </div>
  );
}

export default App;
