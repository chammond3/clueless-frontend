import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { E_ROOMS, E_CHARACTERS } from './Const';
// images pulled from https://www.ultraboardgames.com/clue/characters-and-weapons.php
import peacock from "../img/peacock.png";
import mustard from "../img/mustard.png";
import green from "../img/green.png";
import plum from "../img/plum.png";
import scarlet from "../img/scarlet.png";
import white from "../img/white.png";

class Board extends Component {

    imageMap(character) {
        if (character.name === E_CHARACTERS.COLONEL.name) {
            return mustard;
        }
        if (character.name === E_CHARACTERS.PEACOCK.name) {
            return peacock;
        }
        if (character.name === E_CHARACTERS.GREEN.name) {
            return green;
        }
        if (character.name === E_CHARACTERS.PLUM.name) {
            return plum;
        }
        if (character.name === E_CHARACTERS.SCARLET.name) {
            return scarlet;
        }
        if (character.name === E_CHARACTERS.WHITE.name) {
            return white;
        }
    }

    hallwayHorizontal(hallwayName) {
        const playersInRoom = this.props.players.filter(player =>  player.location.name === hallwayName);
        const listOfPlayers = playersInRoom.map(player => <img src={this.imageMap(player)} alt="" height="55" width="45" className="img-center"/>);
        return (
        <Col>
            <Row className="Board-hallway-horizontal"></Row>
            <Row className="Board-hallway-horizontal-border">
                {listOfPlayers}
            </Row>
            <Row className="Board-hallway-horizontal"></Row>
        </Col>
        );
    }

    room(roomName) {
        const playersInRoom = this.props.players.filter(player =>  player.location.name === roomName);
        const listOfPlayers = playersInRoom.map(player => <img src={this.imageMap(player)} alt="" height="55" width="45" />);
        const className = "Board-".concat(roomName.split(" ").join(""));
        return (
            <Col className={className}>
                <h3 className="Board-room-name">
                    { roomName }
                </h3>
                {listOfPlayers}
                
            </Col>
        );
    }

    rowRooms(name1, name2, name3, name4, name5) {
        return (
            <Row className="Board-row">
                { this.room(name1) }
                { this.hallwayHorizontal(name2) }
                { this.room(name3) }
                { this.hallwayHorizontal(name4) }
                { this.room(name5) }
            </Row>
        );
    } 

    rowHallways(hallway1, hallway2, hallway3) {
        const playersInRoom1 = this.props.players.filter(player =>  player.location.name === hallway1);
        const listOfPlayers1 = playersInRoom1.map(player => <img src={this.imageMap(player)} alt="" height="55" width="45" className="img-center"/>);

        const playersInRoom2 = this.props.players.filter(player =>  player.location.name === hallway2);
        const listOfPlayers2 = playersInRoom2.map(player => <img src={this.imageMap(player)} alt="" height="55" width="45" className="img-center"/>);

        const playersInRoom3 = this.props.players.filter(player =>  player.location.name === hallway3);
        const listOfPlayers3 = playersInRoom3.map(player => <img src={this.imageMap(player)} alt="" height="55" width="45" className="img-center"/>);
        return (
            <Row className="Board-row">
                <Col/>
                <Col className="Board-hallway-vertical-border">
                    {listOfPlayers1}
                </Col>
                <Col/><Col/><Col/><Col/><Col/>
                <Col className="Board-hallway-vertical-border">
                    {listOfPlayers2}    
                </Col>
                <Col/><Col/><Col/><Col/><Col/>
                <Col className="Board-hallway-vertical-border">
                    {listOfPlayers3}
                </Col>
                <Col/>
            </Row>
        );
    }

    render() {
        return (
            <Container fluid className="Top-padding">
                { this.rowRooms(E_ROOMS.STUDY.name, "hallway1", "Hall", "hallway2", "Lounge")}
                { this.rowHallways("hallway3", "hallway4", "hallway5") }
                { this.rowRooms("Library", "hallway6", "Billiard Room", "hallway7", "Dining Room") }
                { this.rowHallways("hallway8", "hallway9", "hallway10") }
                { this.rowRooms("Conservatory", "hallway11", "Ballroom", "hallway12", "Kitchen") }
            </Container>
        );
    }

}

export default Board;