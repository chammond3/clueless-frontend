import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { E_CHARACTERS, E_WEAPONS } from './Const'

class SuggestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: "",
            weapon: ""
        }
    }

    onCharacterChange = (event) => {
        this.setState({character: event.target.value})
    }

    onWeaponChange = (event) => {
        this.setState({weapon: event.target.value})
    }

    render () {

        const hideButton = (this.props.player.turn === true && (this.props.player.turnState === "move" || this.props.player.turnState === "accuse")) ? false : true;

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
                        <Form.Control as="select" onChange={this.onCharacterChange}>
                            {playerOptions}
                        </Form.Control>
                        <Form.Label>With this weapon:</Form.Label>
                        <Form.Control as="select" onChange={this.onWeaponChange}>
                            {weaponOptions}
                        </Form.Control>
                    </Form.Group>
                    <Button disabled={hideButton} onClick={() => this.props.suggestFunction(this.state.character, this.state.weapon)}>
                        Suggest
                    </Button>
                    <Button disabled={hideButton} onClick={() => this.props.accuseFunction(this.state.character, this.state.weapon)}>
                        Accuse
                    </Button>
                </Form>
            </Container>
        );
    }

}

export default SuggestForm;