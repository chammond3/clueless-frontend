import React, { Component } from "react";
import Game from './Game';
import Lobby from './Lobby';
import openSocket from "socket.io-client";

const ENDPOINT = 'https://clueless-app1.herokuapp.com';
//const ENDPOINT = 'http://localhost:3001';
const socket = openSocket(ENDPOINT, {transports: ['websocket']});


class Clueless extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameStatus: "lobby",
            player: "",
            gameID: "",
        }
    }

    handleCharacterSelect = (player) => {
        socket.emit("linkPlayerWithClient", player, this.state.gameID);
        this.setState({ player: player });
        //to-do: send to server
    }

    handleGameSelect = (game) => {
        this.setState({ gameID: game });
        // to-do: grab all player info
    }

    handleGameStart = (gameState) => {
        socket.emit("startGame", this.state.gameID);
        this.setState({ gameStatus: gameState});
    }

    startGame = (gameID) => {
        if (gameID === this.state.gameID) {
            this.setState({ gameStatus: "started"});
        }
    }

    endGame = (gameID) => {
        if (gameID === this.state.gameID) {
            this.setState({ gameStatus: "lobby"});
        }
    }

    componentDidMount() {
        socket.on("startGame", this.startGame);
        socket.on("endGame", this.endGame)
      }
    
    componentWillUnmount() {
        socket.off("startGame", this.startGame);
        socket.off("endGame", this.endGame)
    }


/* refactor content into function to read better
    getContent = () => {

    }
*/

    render() {
        const content = (this.state.gameStatus === "started") ? <Game gameID={this.state.gameID} player={this.state.player}/> : <Lobby socket={socket} gameID={this.state.gameID} player={this.state.player} handleGameStart={this.handleGameStart} handleGameSelect={this.handleGameSelect} handleCharacterSelect={this.handleCharacterSelect}/>;

        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        );
    }
}

export default Clueless