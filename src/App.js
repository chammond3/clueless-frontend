import './App.css';
import { Component } from 'react';
import Home from './main/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Board from './main/Board';
import Sidebar from "./main/Sidebar";
import { E_ROOMS } from './main/Const';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        players: [
          {name: "Scarlet", location: "hallway11"},
          {name: "Colonel", location: E_ROOMS.STUDY}]
    }
}
  
  render() {
    return (
      <div className = "App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Clue-less App</Navbar.Brand>
        </Navbar>
        <Container fluid>
          <Row>
            <Col xs={2} className="App-header">
              <Sidebar/>
            </Col>
            <Col xs={10}>
                <Alert variant="dark">
                  <Alert.Heading>
                  Who's up:
                  </Alert.Heading>
                  Colonel Mustard to move
                </Alert>
              <Board players={this.state.players}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
