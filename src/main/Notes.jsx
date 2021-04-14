import { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { E_CARDS } from './Const';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Notes extends Component {
    render() {

        const cardOptions1 = Object.values(E_CARDS).map((card, index) => {
            if (index < 11) {
                return (
                    <Form.Check type="checkbox" label={card.name}/>
                );
            }
            else {
                return false;
            }
        });

        const cardOptions2 = Object.values(E_CARDS).map((card, index) => {
            if (index > 10) {
                return (
                    <Form.Check type="checkbox" label={card.name}/>
                );
            }
            else {
                return false;
            }
        });

        return (
            <Container className="Top-padding">
                <h3>
                    Notes
                </h3>
                <Row>
                    <Col>
                        <Form>
                            {cardOptions1}
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            {cardOptions2}
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Notes;