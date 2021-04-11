import { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SuggestForm from "./SuggestForm";
import MoveButtons from "./MoveButtons";
import Cards from "./Cards";

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
            </Container>
        );
    }

}

export default Sidebar;