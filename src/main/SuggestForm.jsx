import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

class SuggestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: "",
            room: "",
            weapon: ""
        }
    }

    onPlayerChange = (event) => {
        this.setState({player: event.target.value})
    }

    onRoomChange = (event) => {
        this.setState({player: event.target.value})
    }

    onWeaponChange = (event) => {
        this.setState({player: event.target.value})
    }

    render () {
        return (
            <Container className="Top-padding">
                <h3>Suggest or Accuse</h3>
                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Player who did it:</Form.Label>
                        <Form.Control as="select" onChange={this.onPlayerChange}>
                            <option>Mrs. Peacock</option>
                            <option>Colonl Mustard</option>
                        </Form.Control>
                        <Form.Label>Where they did it:</Form.Label>
                        <Form.Control as="select" onChange={this.onRoomChange}>
                            <option>Hammer</option>
                            <option>Knife</option>
                        </Form.Control>
                        <Form.Label>With this weapon:</Form.Label>
                        <Form.Control as="select" onChange={this.onWeaponChange}>
                            <option>Study</option>
                            <option>Library</option>
                        </Form.Control>
                    </Form.Group>
                    <Button>
                        Suggest
                    </Button>
                    <Button>
                        Accuse
                    </Button>
                </Form>
            </Container>
        );
    }

}

export default SuggestForm;