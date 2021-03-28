import React, { Component } from "react";
import openSocket from "socket.io-client";

const ENDPOINT = 'https://clueless-app1.herokuapp.com';

//import openSocket from "socket.io-client";
const socket = openSocket(ENDPOINT, {transports: ['websocket']});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false,
            message: "",
            serverMessage: ""
        }
        this.messageChange = this.messageChange.bind(this); 
    }

    //Retrieve all state data from server
    getData = state => {
      console.log('get data: ' + state);
      this.setState({ started: state.started, serverMessage: state.serverMessage });
    }

    //Retrieve message from server
    getMessage = message => {
      console.log('get message: ' + message);
      this.setState({ serverMessage: message });
    }

    //Retrieve started from server
    getStarted = started => {
      console.log('get started: ' + started);
      this.setState({ started: started});
    }

    //Change game started state
    changeGameState = started => {
      console.log("change game state clicked ", started);
      socket.emit("change_game_state", started);
      this.setState({ started: started });
    }

    //Send new message to server
    sendMessage = () => {
      console.log("message updated: ", this.state.message);
      socket.emit("change_message", this.state.message);
    }

    //Locally handle changes to message box
    messageChange(event) {
      console.log("message changed locally: ", event.target.value);
      this.setState({message: event.target.value});
      console.log("new local message:", this.state.message);
    }

    componentDidMount() {
      // start listener for retrieving data
      socket.on("get_data", this.getData);
      socket.on("get_message", this.getMessage);
      socket.on("get_started", this.getStarted);
      socket.emit("initial_data");
    }

    componentWillUnmount() {
      socket.off("get_data", this.getData);
      socket.off("get_message", this.getMessage);
      socket.off("get_started", this.getStarted);
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
          <input
              type="text"
              value={this.state.message}
              onChange={this.messageChange}
          />
          <button onClick={() => this.sendMessage()}>
            Send!
          </button>
          <h2>
            The message is: {this.state.serverMessage}
          </h2>
        </React.Fragment>
      );
    }
  }

export default Home;
