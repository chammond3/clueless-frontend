import { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form"
import { E_TURNACTIONS } from "./Const";

class MoveButtons extends Component {
    
    hideButton(characters, direction) {
        // check if current turn and the action is to move
        if (this.props.player.turn === false || this.props.player.turnState !== E_TURNACTIONS.MOVE) {
            return true;
        }
        
        const playerLocation = characters.find(character =>  character.name === this.props.player.name).location;        
        if (playerLocation[direction] === null) {
            return true;
        }
        // currently in hallway, can move into room or moving to secret passage
        else if (playerLocation.type === "hallway" || direction === "secretPassage") {
            return false;
        }

        //check if hallway is occupied
        const adjacentHallwayPlayer = this.props.characters.find(character => character.location.name === playerLocation[direction]); 
        if (adjacentHallwayPlayer === null || adjacentHallwayPlayer === undefined) {
            return false;
        }
        else {
            return true;
        }
    }
    
    render () {
        

        const showUpButton = this.hideButton(this.props.characters, "upSquare");
        const showDownButton = this.hideButton(this.props.characters, "downSquare");
        const showLeftButton = this.hideButton(this.props.characters, "leftSquare");
        const showRightButton = this.hideButton(this.props.characters, "rightSquare");
        const showSecretPassageButton = this.hideButton(this.props.characters, "secretPassage");

        return (
            <Container className="Top-padding">
                <h3>Movement</h3>
                <Form>
                    <div>
                        <Button  disabled={showUpButton} onClick={() => this.props.moveFunctions.moveUp()}>
                            Up
                        </Button>
                        <Button disabled={showDownButton} onClick={() => this.props.moveFunctions.moveDown()}>
                            Down
                        </Button>
                        <Button disabled={showLeftButton} onClick={() => this.props.moveFunctions.moveLeft()}>
                            Left
                        </Button>
                        <Button disabled={showRightButton} onClick={() => this.props.moveFunctions.moveRight()}>
                            Right
                        </Button>
                        <Button disabled={showSecretPassageButton} onClick={() => this.props.moveFunctions.moveSecretPassage()}>
                            Sectret Passage!
                        </Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default MoveButtons;