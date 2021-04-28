import React, { Component } from "react";
import openSocket from "socket.io-client";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Board from './Board';
import Sidebar from "./Sidebar";
import { E_CHARACTERS, locationMap } from './Const';
import Button from 'react-bootstrap/Button';
const io = require('socket.io-client');

const ENDPOINT = 'https://clueless-app1.herokuapp.com';
//const ENDPOINT = 'http://localhost:3001';
const socket = openSocket(ENDPOINT, {transports: ['websocket']});

class Game extends Component {
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
        gameMessage: "No characters in turn order",
    }
  }
    playerEndTurn = () => {
      socket.emit("endTurn", this.props.gameID);
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
      socket.emit("playerSuggest", character, characterLocation, weapon, this.props.gameID);
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
      socket.emit("playerAccuse", character, characterLocation, weapon, this.props.gameID);
    }

    handleRefute = (card) => {
      socket.emit("refute", card, this.props.gameID);
    }

    // socket callback when turn changes on server
    handleTurnChange = (characterName, turnState, newMessage, gameID, privateMessage) => {
      if (gameID === this.props.gameID) {
      // will see if the character == player and then update with the next turn logic
        if (characterName === null) { // game is over
          const player = this.state.player;
          player.turn = false;
          this.setState({player: player});
          this.setState({gameMessage: newMessage});
        }
        else {
          if (characterName === this.state.player.name) {
            const player = this.state.player;
            player.turn = true;
            player.turnState = turnState;
            this.setState({player: player});
            console.log(privateMessage);
            if (privateMessage === undefined) {
              this.setState({gameMessage: newMessage});
            }
            else {
              this.setState({gameMessage: privateMessage}); // update message sent only to player's who's turn it is (for viewing refuting cards)
            }
          }
          else{
            const player = this.state.player;
            player.turn = false;
            player.turnState = turnState;
            this.setState({player: player});
            this.setState({gameMessage: newMessage});
          }
        }
      }
    }

    // socket call back when character state updates on client (location)
    handleUpdateCharacter = (characters, gameID) => {
      if (gameID === this.props.gameID) {
        this.setState({characters: characters})
      }
    }

    // socket callback to set the player's cards
    handleDealCards = (cardName, characterName, gameID) => {
      if (gameID === this.props.gameID) {
        if (characterName === this.state.player.name) {
          const player = this.state.player;
          player.cards.push(cardName);
          this.setState({player: player});
        }
      }
    }

    // socket callback updates game message
    handleMessageUpdate = message => {
      this.setState({gameMessage: message});
    }

    componentDidMount() {
      const player =this.state.player;
      player.name = this.props.player;
      this.setState({ player: player });
      this.socket = io();
      // start listener for retrieving data
      socket.on("turnChange", this.handleTurnChange);
      socket.on("updateCharacters", this.handleUpdateCharacter);
      socket.on("dealCard", this.handleDealCards);
      socket.on("updateMessage", this.handleMessageUpdate);
      socket.emit("initialData", this.props.gameID);
    }

    componentWillUnmount() {
      socket.off("turnChange", this.handleTurnChange);
      socket.off("updateCharacters", this.handleUpdateCharacter);
      socket.off("dealCard", this.handleDealCards);
      socket.off("updateMessage", this.handleMessageUpdate);
    }

    render() {
  
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
        socket.emit("playerMove", characters, this.props.gameID);
  
        // set state on client
        this.setState({
          characters: characters
        });
      }
  
      const handleGameEnd = () => {
        socket.emit("endGame", this.props.gameID);
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
            <Button variant="danger" onClick={handleGameEnd}>
              End Game
            </Button>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid>
          <Row>
            <Col xs={3} className="App-header">
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
            <Col xs={9} className="Board-background">
                <h3 className="Board-message">
                    {this.state.gameMessage}
                </h3>
              <Board players={this.state.characters}/>
            </Col>
          </Row>
        </Container>
        </React.Fragment>
      );
    }
  }

export default Game;
