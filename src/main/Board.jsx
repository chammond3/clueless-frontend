import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function hallwayHorizontal() {
    return (
        <Col>
        <Row className="Board-hallway-horizontal"></Row>
        <Row className="Board-hallway-horizontal-border">
        </Row>
        <Row className="Board-hallway-horizontal"></Row>
    </Col>
    );
}

function room(name) {
    return (
        <Col className="Board-room">
        { name }
        </Col>
    );
}

function rowRooms(name1, name2, name3) {
    return (
        <Row className="Board-row">
            { room(name1) }
            { hallwayHorizontal() }
            { room(name2) }
            { hallwayHorizontal() }
            { room(name3) }
        </Row>
    );
}

function rowHallways() {
    
    return (
        <Row className="Board-row">
            <Col/>
            <Col className="Board-hallway-vertical-border"/>
            <Col/><Col/><Col/><Col/><Col/>
            <Col className="Board-hallway-vertical-border"/>
            <Col/><Col/><Col/><Col/><Col/>
            <Col className="Board-hallway-vertical-border">
            </Col>
            <Col/>
        </Row>
    );
}

class Board extends Component {
    render() {
        return (
            <Container fluid className="Top-padding">
                { rowRooms("Study", "Hall", "Lounge")}
                { rowHallways() }
                { rowRooms("Libarary", "Billiard Room", "Dining Room") }
                { rowHallways() }
                { rowRooms("Conservatory", "Ballroom", " Kitchen") }
            </Container>
        );
    }

}

export default Board;