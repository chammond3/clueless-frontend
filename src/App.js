import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Board from './main/Board';
import Sidebar from "./main/Sidebar";
import { E_CHARACTERS, E_CARDS, E_TURNACTIONS, locationMap } from './main/Const';
import Alert from 'react-bootstrap/Alert';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

class App extends Component {
  constructor(props) {
    super(props);
    const characters = JSON.parse(JSON.stringify( E_CHARACTERS)); // deep copy so we don't mess up the starting values - used to reset game
    const charactersArray = Object.values(characters); // make it into an array
    this.state = {
        characters: charactersArray,
        player: {
          cards: [E_CARDS.SCARLET, E_CARDS.ROPE, E_CARDS.STUDY],
          name: E_CHARACTERS.COLONEL.name,
          turn: true, // is the current client able to move
          turnState: E_TURNACTIONS.MOVE // move, accuse, refute 
        },
        gameState: { // need to figure out if we want to save any of this in the client
          playerTurn: E_CHARACTERS.SCARLET.name, // player who can move and accuse 
          //refuteTurn: E_CHARACTERS.COLONEL, // player who can refute
          turnState: E_TURNACTIONS.move, // move, accuse, refute 
          players: [] // list of connect players, will update with socket event. Can use this to gray out characters in drop down
        }
    }
}

  render() {

    const handlePlayerSelect = (newPlayer) => {
      // used in navbar dropdown to select player to play with
      const currentState = this.state;
      currentState.player.name = newPlayer;
      this.setState(currentState);

      // emit player change - sync client ID w/ player on DB      
    }

    const handleMove = (direction) => {

      // update location
      const characters = this.state.characters.slice();
      let currentCharacter = null;
      characters.find((character, index) => {
        if (character.name === this.state.player.name) {
          const character = characters[index];
          character.location = locationMap(character.location[direction]);
          characters[index] = character;
          currentCharacter = character; // save off copy for turn state logic
          return true;
        }
        return false;
      });

      // update turn state
      const player = this.state.player;
      // can't accuse -> move to next player
      if (currentCharacter.location.type === "hallway") {
        // set state to next player's turn
      }
      else { // in room -> can accuse
        player.turnState = E_TURNACTIONS.ACCUSE;
      }
      

      // emit socket event with player state

      // set state on client
      this.setState({
        characters: characters,
        player: player
      });
    }

    const handleGameStart = () => {
      const characters = JSON.parse(JSON.stringify( E_CHARACTERS));
      const charactersArray = Object.values(characters);
      
      // make sure there are enough players/clients to start game
  
      // emit start game event
      //  - reset game board on client
      //  - deal cards
      //  - reset case file

      this.setState({characters: charactersArray});
    }

    const movementFunctions = {
      moveDown: () => handleMove("downSquare"),
      moveUp: () => handleMove("upSquare"),
      moveLeft: () => handleMove("leftSquare"),
      moveRight: () => handleMove("rightSquare"),
      moveSecretPassage: () => handleMove("secretPassage")
    };

    const playerOptions = Object.values(E_CHARACTERS).map(character => {
      return (
        <NavDropdown.Item eventKey={character.name}>{character.name}</NavDropdown.Item>
      );
    });

    return (
      <div className = "App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Clue-less App</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Playing as: {this.state.player.name}</Navbar.Text>
            <NavDropdown title="Game Actions" onSelect={handlePlayerSelect}>
              {playerOptions}
            </NavDropdown>
            <Button onClick={handleGameStart}>
              Start Game!
            </Button>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid>
          <Row>
            <Col xs={2} className="App-header">
              <Sidebar 
                moveFunctions={movementFunctions}
                player={this.state.player}
                characters={this.state.characters}
              />
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
