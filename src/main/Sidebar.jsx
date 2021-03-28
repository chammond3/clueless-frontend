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
                    <MoveButtons/>
                </Row>
                <Row>
                    <Cards/>
                </Row>
            </Container>
        );
    }

}

export default Sidebar;