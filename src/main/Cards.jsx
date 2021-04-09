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

        const hideButtonRefute = (this.props.player.turn === true && this.props.player.turnState === "refute" && this.state.card !== "Choose card..." && this.state.card !== "") ? false : true;
        const hideButtonCantRefute = (this.props.player.turn === true && this.props.player.turnState === "refute") ? false : true;

        return (
            <Container className="Top-padding">
                <h3>Cards</h3>
                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select" onChange={this.onCardChange} defaultValue="Select card...">
                            <option>Select card...</option>
                            {cardOptions}
                        </Form.Control>
                    </Form.Group>
                    <Button disabled={hideButtonRefute} onClick={() => this.props.refuteFunction(this.state.card)}>
                        Refute!
                    </Button>
                    <Button disabled={hideButtonCantRefute} onClick={() => this.props.refuteFunction()}>
                        Can't refute
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default Cards;