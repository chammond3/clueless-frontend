import { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form"

class MoveButtons extends Component {
    render () {
        return (
            <Container className="Top-padding">
                <h3>Movement</h3>
                <Form>
                    <div>
                        <Button  onClick={() => this.props.moveFunctions.moveUp()}>
                            Up
                        </Button>
                        <Button onClick={() => this.props.moveFunctions.moveDown()}>
                            Down
                        </Button>
                        <Button onClick={() => this.props.moveFunctions.moveLeft()}>
                            Left
                        </Button>
                        <Button onClick={() => this.props.moveFunctions.moveRight()}>
                            Right
                        </Button>
                        <Button  onClick={() => this.props.moveFunctions.moveSecretPassage()}>
                            Sectret Passage!
                        </Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default MoveButtons;