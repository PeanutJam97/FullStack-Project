import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ErrorModal(props) {

  return (
    <>
      <Modal
        onCancel={props.onClear}
        show={!!props.error}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>"An Error Occurred!"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.error}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={props.onClear}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ErrorModal;