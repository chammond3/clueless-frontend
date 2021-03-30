import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Board from './main/Board';
import Sidebar from "./main/Sidebar";
import { E_CHARACTERS, locationMap } from './main/Const';
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
    characters.find((character, index) => {
      if (character.name === this.state.player.name) {
        const character = characters[index];
        character.location = locationMap(character.location.downSquare);
        characters[index] = character;
        return true;
      }
      return false;
    });
    // emit socket event
    this.setState({characters: characters})
  }

  handleMoveUp() {
    const characters = this.state.characters.slice();
    characters.find((character, index) => {
      if (character.name === this.state.player.name) {
        const character = characters[index];
        character.location = locationMap(character.location.upSquare);
        characters[index] = character;
        return true;
      }
      return false;
    });
    // emit socket event
    this.setState({characters: characters})
  }

  handleMoveLeft() {
    const characters = this.state.characters.slice();
    characters.find((character, index) => {
      if (character.name === this.state.player.name) {
        const character = characters[index];
        character.location = locationMap(character.location.leftSquare);
        characters[index] = character;
        return true;
      }
      return false;
    });
    // emit socket event
    this.setState({characters: characters})
  }

  handleMoveRight() {
    const characters = this.state.characters.slice();
    characters.find((character, index) => {
      if (character.name === this.state.player.name) {
        const character = characters[index];
        character.location = locationMap(character.location.rightSquare);
        characters[index] = character;
        return true;
      }
      return false;
    });
    // emit socket event
    this.setState({characters: characters})
  }

  handleMoveSecretPassage() {
    const characters = this.state.characters.slice();
    characters.find((character, index) => {
      if (character.name === this.state.player.name) {
        const character = characters[index];
        character.location = locationMap(character.location.secretPassage);
        characters[index] = character;
        return true;
      }
      return false;
    });
    // emit socket event
    this.setState({characters: characters})
  }

  
  render() {

    const movementFunctions = {
      moveDown: () => this.handleMoveDown(),
      moveUp: () => this.handleMoveUp(),
      moveLeft: () => this.handleMoveLeft(),
      moveRight: () => this.handleMoveRight(),
      moveSecretPassage: () => this.handleMoveSecretPassage()
    };

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
              <Sidebar moveFunctions={movementFunctions}/>
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
