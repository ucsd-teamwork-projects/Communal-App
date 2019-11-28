import React from "react";
import { Modal, Button } from 'react-bootstrap';
import "../../utils/flowHeaders.min.css";

function AlertModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h5 className="font-weight-bold flow-text">{props.title}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <h5 className="flow-text">{props.message}</h5>
            </Modal.Body>
            <Modal.Footer>
                {
                    !props.hideBtn ?
                        <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    : ""
                }
            </Modal.Footer>
        </Modal>
    );
}

export default AlertModal;
