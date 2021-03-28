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

class App extends Component {
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
            <Col xs={8}>
              <Board />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
