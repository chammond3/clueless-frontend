import { Component } from "react";
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: "",
        }
    }
   
    onCardChange = (event) => {
        this.setState({card: event.target.value})
    }
    
    render() {

        // create dropdown list of characters
        const cardOptions = this.props.cards.map(character => {
            return (
                <option>
                    {character.name}
                </option>
            );
        });

        const hideButton = (this.props.player.turn === true && this.props.player.turnState === "refute") ? false : true;

        return (
            <Container className="Top-padding">
                <h3>Cards</h3>
                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select" onChange={this.onCardChange}>
                            {cardOptions}
                        </Form.Control>
                    </Form.Group>
                    <Button disabled={hideButton} onClick={() => this.props.refuteFunction(this.state.card)}>
                        Refute!
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default Cards;