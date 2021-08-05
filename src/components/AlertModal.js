import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AlertModal = ({ show, onHide, message }) => {
  console.log(message);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className="border-0"> {message} </Modal.Body>
      <Modal.Footer className="border-0">
        <Button className="custom-btn-primary" onClick={onHide}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
