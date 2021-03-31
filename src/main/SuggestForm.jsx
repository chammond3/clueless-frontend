import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { E_CHARACTERS, E_WEAPONS } from './Const'

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

    onWeaponChange = (event) => {
        this.setState({player: event.target.value})
    }

    render () {

        // create dropdown list of characters
        const playerOptions = Object.values(E_CHARACTERS).map(character => {
            return (
                <option>
                    {character.name}
                </option>
            );
        });

        // create weapon dropdowns
        const weaponOptions = Object.values(E_WEAPONS).map(weapon => {
            return (
                <option>
                    {weapon}
                </option>
            )
        });

        return (
            <Container className="Top-padding">
                <h3>Suggest or Accuse</h3>
                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Player who did it:</Form.Label>
                        <Form.Control as="select" onChange={this.onPlayerChange}>
                            {playerOptions}
                        </Form.Control>
                        <Form.Label>With this weapon:</Form.Label>
                        <Form.Control as="select" onChange={this.onWeaponChange}>
                            {weaponOptions}
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