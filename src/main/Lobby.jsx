import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from 'react-bootstrap/Navbar';

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            gameSelected: "",
        }
    }
    handleGameSelect(game) {
        this.setState({ gameSelected: game});
    }

    handleNewGame = () => {
        this.props.socket.emit("newGame");
    }

    handleUpdateGames = games => {
        this.setState({ games: games });
    }

    getPlayerOptions = () => {
        const game = this.state.games.find(game => game.gameID === this.props.gameID);
        if (game === undefined) {
            return <h5>Please join a game...</h5>
        }
        else {
            const characters = game.characters;
            const characterMap = characters.map(character => {
                if (character.taken) {
                    return <ListGroup.Item disabled eventKey={character.name} >{character.name}</ListGroup.Item>
                }
                else {
                    return <ListGroup.Item action eventKey={character.name} onClick={() => this.props.handleCharacterSelect(character.name)}>{character.name}</ListGroup.Item>
                }
            });
            return characterMap;
        }
    }

    componentDidMount() {
        this.props.socket.on("updateGames", this.handleUpdateGames);
        this.props.socket.emit("getGames");
      }
    
    componentWillUnmount() {
    this.props.socket.off("updateGames", this.handleUpdateGames);
    }



    render() {
        
        const gameList = this.state.games.map(game => {
            return (
                <ListGroup.Item action eventKey={game.gameID} onClick={() => this.handleGameSelect(game.gameID)}>
                    Game {game.gameID}
                </ListGroup.Item>
            );
        });

        const playerOptions = this.getPlayerOptions();
        const joinDisabled = (this.state.gameSelected === "") ? true : false;
        const startDisabled = (this.props.gameID === "" || this.props.player === "") ? true : false;

        return (
            <React.Fragment>
                <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Clue-less App</Navbar.Brand>
                    
                </Navbar>
                <Container fluid>
                    <Row className="Top-padding-large">
                        <Col xs={2}/>
                        <Col xs={2}>
                            <h3>
                                Open Games
                            </h3>
                        </Col>
                        <Col xs={2}>

                        </Col>
                        <Col xs={2}>
                            <h3>
                                Players
                            </h3>
                        </Col>
                        <Col xs={2}/>
                    </Row>
                    <Row className="Top-padding">
                    <Col xs={2}/>
                        <Col xs={2}>
                            <ListGroup>
                                {gameList}
                            </ListGroup>
                        </Col>
                        <Col xs={2}>
                            <Row className="Top-padding-large"/>
                            <Row>
                                <Button onClick={() => this.handleNewGame()}>
                                    New Game
                                </Button>
                            </Row>
                            <Row className="Top-padding">
                                <Button disabled={joinDisabled} onClick={() => this.props.handleGameSelect(this.state.gameSelected)}>
                                    Join Game
                                </Button>
                            </Row>
                        </Col>
                        <Col xs={2}>
                            <ListGroup>
                                {playerOptions}
                            </ListGroup>
                        </Col>
                        <Col xs={2}>
                            <Row className="Top-padding-large"/>   
                            <Button size="lg" disabled={startDisabled} variant="success" onClick={() => this.props.handleGameStart("started")}>
                                Start Game!
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default Lobby;