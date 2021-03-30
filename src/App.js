import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Board from './main/Board';
import Sidebar from "./main/Sidebar";
import { E_ROOMS, E_CHARACTERS } from './main/Const';
import Alert from 'react-bootstrap/Alert';
import NavDropdown from 'react-bootstrap/NavDropdown';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        characters: Object.values(E_CHARACTERS),
        player: {
          cards: [],
          name: E_CHARACTERS.COLONEL.name
        }
    }
}

  handleMoveDown() {
    const characters = this.state.characters.slice();
    let newCharacters = characters.find((character, index) => {
      if (character.name === this.state.player.name) {
        const character = characters[index];
        if (character.location.downSquare === "hallway3") {
          character.location = E_ROOMS.HALLWAY3;
        }
        characters[index] = character;
        return true;
      }
    });

    // emit socket event

    console.log(newCharacters);
    console.log(characters);
    this.setState({characters: characters})
  }
  
  render() {
    return (
      <div className = "App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Clue-less App</Navbar.Brand>
          <NavDropdown title="Game Actions" className="ml-auto">
            <NavDropdown.Item>Scarlet</NavDropdown.Item>
          </NavDropdown>
        </Navbar>
        <Container fluid>
          <Row>
            <Col xs={2} className="App-header">
              <Sidebar downButton={() => this.handleMoveDown()}/>
            </Col>
            <Col xs={10}>
                <Alert variant="dark">
                  <Alert.Heading>
                  Who's up:
                  </Alert.Heading>
                  Colonel Mustard to move
                </Alert>
              <Board players={this.state.characters}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
