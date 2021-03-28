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
                        <Button>
                            Up
                        </Button>
                        <Button>
                            Down
                        </Button>
                        <Button>
                            Left
                        </Button>
                        <Button>
                            Right
                        </Button>
                        <Button>
                            Sectret Passage!
                        </Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default MoveButtons;