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
                    <SuggestForm/>
                </Row>
                <Row>
                    <MoveButtons 
                        moveFunctions={this.props.moveFunctions}
                        player={this.props.player}    
                        characters={this.props.characters}
                    />
                </Row>
                <Row>
                    <Cards cards={this.props.player.cards}/>
                </Row>
            </Container>
        );
    }

}

export default Sidebar;