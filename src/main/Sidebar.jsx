import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar';
import { E_CHARACTERS } from './Const';
import Row from "react-bootstrap/Row";
import SuggestForm from "./SuggestForm";
import MoveButtons from "./MoveButtons";
import Cards from "./Cards";
import Notes from "./Notes";

import { CometChat } from "@cometchat-pro/chat";
import { CometChatUI } from "./cometchat-pro-react-ui-kit/CometChatWorkspace/src";

const appID = "319644fb8ab90c2";
const region = "us";



const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
    // You can now call login function.
  },
  error => {
    console.log("Initialization failed with error:", error);
    // Check the reason for error and take appropriate action.
  }
);

  const authKey = "70f3097840cbc14022dad45cc692962f56107a9c";
  

  
  
  
  

  

class Sidebar extends Component {
  
  render() {

  let uid = "";

  if ( this.props.player.name === E_CHARACTERS.SCARLET.name) {
    uid = "SUPERHERO1"};

  if ( this.props.player.name === E_CHARACTERS.GREEN.name) {
    uid = "SUPERHERO2"};

  if ( this.props.player.name === E_CHARACTERS.PEACOCK.name) {
    uid = "SUPERHERO3"};

  if ( this.props.player.name === E_CHARACTERS.COLONEL.name) {
    uid = "SUPERHERO4"};

  if ( this.props.player.name === E_CHARACTERS.PLUM.name) {
    uid = "SUPERHERO5"};

            if ( this.props.player.name === E_CHARACTERS.WHITE.name) {
              uid = "SUPERHERO6"};


    CometChat.login(uid, authKey).then(
      user => {
      console.log("Login Successful:", { user });    
      },
      error => {
      console.log("Login failed with exception:", { error });    
      }
      );
    
        return (
            <Container>
                <Row>
                    <SuggestForm
                        suggestFunction={this.props.suggestFunction}
                        accuseFunction={this.props.accuseFunction}
                        endTurnFunction={this.props.endTurnFunction}
                        player={this.props.player}
                        characters={this.props.characters}
                    />
                </Row>
                <Row>
                    <MoveButtons 
                        moveFunctions={this.props.moveFunctions}
                        player={this.props.player}    
                        characters={this.props.characters}
                    />
                </Row>
                <Row>
                    <Cards 
                        cards={this.props.player.cards}
                        refuteFunction={this.props.refuteFunction}
                        player={this.props.player}
                    />
                </Row>
                <Row>
                    <Notes/>
                </Row>
      
                <h1> </h1>
                <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Chat with other players</Navbar.Brand>
                 <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>Playing as: {this.props.player.name}</Navbar.Text>
           
               </Navbar.Collapse>
               </Navbar>

               
              
            

                <div style={{width: '600px', height:'600px' }}>
                 <CometChatUI />
                </div>
                
            </Container>
        );
    }

}

export default Sidebar;