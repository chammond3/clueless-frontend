import React, { Component } from "react";
import openSocket from "socket.io-client";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Board from './Board';
import Sidebar from "./Sidebar";
import { E_CHARACTERS, locationMap } from './Const';
import Alert from 'react-bootstrap/Alert';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
const io = require('socket.io-client');

const ENDPOINT = 'https://clueless-app1.herokuapp.com';

const socket = openSocket(ENDPOINT, {transports: ['websocket']});

class Home extends Component {
  constructor(props) {
    super(props);
    const characters = JSON.parse(JSON.stringify( E_CHARACTERS)); // deep copy so we don't mess up the starting values - used to reset game
    const charactersArray = Object.values(characters); // make it into an array
    this.state = {
        characters: charactersArray,
        player: {
          //cards: new Array,
          cards: [],
          name: "",
          turn: false, // is the current client able to move
          turnState: "" // move, accuse, refute 
        },
        gameMessage: "No characters in turn order"
    }
  }
    playerEndTurn = () => {
      socket.emit("endTurn");
    }

    playerSuggest = (character, weapon) => {
      const characters = this.state.characters.slice();
      let characterLocation = null;
      characters.find((character, index) => {
        if (character.name === this.state.player.name) {
          characterLocation = character.location;
          return true;
        }
        return false;
      });
      socket.emit("playerSuggest", character, characterLocation, weapon);
    }

    playerAccuse = (character, weapon) => {
      const characters = this.state.characters.slice();
      let characterLocation = null;
      characters.find((character, index) => {
        if (character.name === this.state.player.name) {
          characterLocation = character.location.name;
          return true;
        }
        return false;
      });
      socket.emit("playerAccuse", character, characterLocation, weapon);
    }

    handleRefute = (card) => {
      socket.emit("refute", card);
    }

    // socket callback when turn changes on server
    handleTurnChange = (character, turnState, newMessage) => {
      // will see if the character == player and then update with the next turn logic
      this.setState({gameMessage: newMessage});
      if (character === null) {
        const player = this.state.player;
        player.turn = false;
        this.setState({player: player});
      }
      else {
        if (character.name === this.state.player.name) {
          const player = this.state.player;
          player.turn = true;
          player.turnState = turnState;
          this.setState({player: player});
        }
        else{
          const player = this.state.player;
          player.turn = false;
          player.turnState = turnState;
          this.setState({player: player});
        }
      }


    }

    // socket call back when character state updates on client (location)
    handleUpdateCharacter = characters => {
      this.setState({characters: characters})
    }

    // socket callback to set the player's cards
    handleDealCards = (cardName, character) => {
      if (character.name === this.state.player.name) {
        const player = this.state.player;
        player.cards.push(cardName);
        this.setState({player: player});
      }
    }

    // socket callback updates game message
    handleMessageUpdate = message => {
      this.setState({gameMessage: message});
    }

    componentDidMount() {
      this.socket = io();
      // start listener for retrieving data
      socket.on("turnChange", this.handleTurnChange);
      socket.on("updateCharacters", this.handleUpdateCharacter);
      socket.on("dealCard", this.handleDealCards);
      socket.on("updateMessage", this.handleMessageUpdate);
      socket.emit("initialData", this.state);
    }

    componentWillUnmount() {
      socket.off("turnChange", this.handleTurnChange);
      socket.off("updateCharacters", this.handleUpdateCharacter);
      socket.off("dealCard", this.handleDealCards);
      socket.off("updateMessage", this.handleMessageUpdate);
    }

    render() {

      const playerOptions = Object.values(E_CHARACTERS).map(character => {
        let taken = false;
        let characters = this.state.characters;

        characters.find((checkCharacter, index) => {
          if (checkCharacter.name === character.name) {
            const character = characters[index];
            if(character.taken)
            {
              taken = true;
            }
            else
            {
              taken = false;
            }
            return true;
          }
          return false;
        });

        if (taken === true)
        {
          return (
            <NavDropdown.Item disabled eventKey={character.name}>{character.name}</NavDropdown.Item>
          );
        } else {
          return (
            <NavDropdown.Item eventKey={character.name}>{character.name}</NavDropdown.Item>
          );
        }
      });

      const handlePlayerSelect = (newPlayer) => {
        // used in navbar dropdown to select player to play with
        const currentState = this.state;
        currentState.player.name = newPlayer;
        this.setState(currentState);
  
        // emit player change - sync client ID w/ player on DB
        socket.emit("linkPlayerWithClient", newPlayer);      
      }
  
      const handleMove = (direction) => {
  
        // update location
        const characters = this.state.characters.slice();
        characters.find((character, index) => {
          if (character.name === this.state.player.name) {
            const character = characters[index];
            character.location = locationMap(character.location[direction]);
            characters[index] = character;
            return true;
          }
          return false;
        });
  
        // emit socket event with all character state
        socket.emit("playerMove", characters);
  
        // set state on client
        this.setState({
          characters: characters
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
        socket.emit("startGame", this.state);

        this.setState({characters: charactersArray});
      }
  
      const movementFunctions = {
        moveDown: () => handleMove("downSquare"),
        moveUp: () => handleMove("upSquare"),
        moveLeft: () => handleMove("leftSquare"),
        moveRight: () => handleMove("rightSquare"),
        moveSecretPassage: () => handleMove("secretPassage")
      };

      return (
        <React.Fragment>
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
                suggestFunction={this.playerSuggest}
                accuseFunction={this.playerAccuse}
                endTurnFunction={this.playerEndTurn}
                refuteFunction={this.handleRefute}
                player={this.state.player}
                characters={this.state.characters}
              />
            </Col>
            <Col xs={10}>
                <Alert variant="dark">
                  <Alert.Heading>
                    {this.state.gameMessage}
                  </Alert.Heading>
                </Alert>
              <Board players={this.state.characters}/>
            </Col>
          </Row>
        </Container>
        </React.Fragment>
      );
    }
  }

export default Home;
