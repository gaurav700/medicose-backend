import React, { useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ContextObj } from '../store/medicose-store';

export default function MedicineModal({ medicine, show, onClose, request }) {
  const { handleSubmitRequest, requestClick, handleSubmitRequestFile } = useContext(ContextObj);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Request Medicine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={requestClick ? handleSubmitRequestFile : handleSubmitRequest}>
          <Form.Group className='mb-3'>
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" id="name" name='name' required />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" id="address" name='address' required />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Phone No:</Form.Label>
            <Form.Control type="number" id="phone" max="9999999999" name='phoneNo' required />
          </Form.Group>
          {requestClick ? null : <Form.Group className='mb-3'>
            <Form.Label>Tablets Required:</Form.Label>
            <Form.Control type="number" id="tab" name='tab' required />
          </Form.Group>}
          {requestClick ? null : <Form.Group className='mb-3'>
            <Form.Label>Medicine:</Form.Label>
            <Form.Control type="text" id="medicine" name='medName' value={medicine} readOnly />
          </Form.Group>}
          {requestClick ? <Form.Group className='mb-3'>
            <Form.Label>Prescription Image:</Form.Label>
            <Form.Control type="file" id="medicinefile" name='prepImage' />
          </Form.Group> : null}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
