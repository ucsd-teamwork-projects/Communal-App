import React from "react";
import { Modal, Button, Card, ListGroup } from 'react-bootstrap';
import UserProfilePicture from "../UserProfileCircle";

function GoingListModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Going ({props.going.length})
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <ListGroup variant="flush">
                        {props.going.map(user => (
                            <ListGroup.Item key={user.name}>
                                <UserProfilePicture src={user.image} size={30} />
                                {user.name}
                            </ListGroup.Item>
                        ))}                        
                    </ListGroup>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default GoingListModal;
