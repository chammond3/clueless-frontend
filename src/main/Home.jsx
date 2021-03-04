import React, { Component } from "react";
import { io } from "socket.io-client";
import openSocket from "socket.io-client";

// running locally
const ENDPOINT = 'http://localhost:3001';



//import openSocket from "socket.io-client";
const socket = openSocket(ENDPOINT, {transports: ['websocket']});

// some code examples have used this instead - not sure what the difference is, but openSocket works, this does not
//const socket = io(ENDPOINT);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false,
        }; 
    }

    getData = started => {
      console.log('get data: ' + started);
      this.setState({ started });
    }

    changeGameState = started => {
      console.log("change game state clicked ", started);
      socket.emit("change_game_state", started);
      this.setState({ started });
    }

    componentDidMount() {
      var state_current = this;
      socket.emit("initial_data", "test, test, test");
      // start listener for retrieving data
      socket.on("get_data", state_current.getData);
    }

    componentWillUnmount() {
      socket.off("get_data", this.getData);
    }

    render() {
      return (
        <React.Fragment>
          <button onClick={() => this.changeGameState(true)}>
            Start Game!
          </button>
          <button onClick={() => this.changeGameState(false)}>
            Reset Game
          </button>
          <h2>
            {this.state.started ? 'started' : 'not started'}
          </h2>
        </React.Fragment>
      );
    }
  }

export default Home;