import { Component } from "react";
import Container from "react-bootstrap/Container";
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
const uid = "SUPERHERO1";

CometChat.login(uid, authKey).then(
  user => {
    console.log("Login Successful:", { user });    
  },
  error => {
    console.log("Login failed with exception:", { error });    
  }
);

class Sidebar extends Component {
    render() {
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
                <div style={{width: '600px', height:'600px' }}>
                 <CometChatUI />
                </div>
            </Container>
        );
    }

}

export default Sidebar;