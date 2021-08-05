import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaStop } from "react-icons/fa";

const MyModal = ({ show, onHide, process, stopProcess }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="border-0">
        <Modal.Title>
          <span className="modal-pname">{process.processName}</span>{" "}
          <span className="modal-mid">#{process._id}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="border-0">
        <div className="modal-content">
          <div className="custom-list">
            <span>Start Time</span>{" "}
            <span className="modal-value">
              {process.startTime.substring(0, 10)}
              {", "}
              {process.startTime.substring(11, 16)} IST
            </span>
          </div>
          <div className="custom-list">
            <span>End Time</span>{" "}
            <span className="modal-value">
              {process.status !== "In Progress" &&
                process.endTime.substring(0, 10)}
              {", "}
              {process.status !== "In Progress" &&
                process.endTime.substring(11, 16)}{" "}
              IST
            </span>
          </div>
          <div className="custom-list">
            <span>Server Name</span>{" "}
            <span className="modal-value">{process.serverId.serverName}</span>
          </div>
          <div className="custom-list">
            <span>Server ID</span>{" "}
            <span className="modal-value">{process.serverId._id}</span>
          </div>
          <div className="custom-list">
            <span>Server Address</span>{" "}
            <span className="modal-value">
              {process.serverId.ipAddress}:{process.serverId.port}
            </span>
          </div>
          {process.status === "Failed" && (
            <div className="modal-status red">Failed</div>
          )}
          {process.status === "Stopped" && (
            <div className="modal-status red">Stopped</div>
          )}
          {process.status === "Completed" && (
            <div className="modal-status green">Completed</div>
          )}
          {process.status === "In Progress" && (
            <div className="modal-status">Running</div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        {
          process.status !== "Completed" && 
          process.status !== "Stopped" &&
          process.status !== "Failed" &&
          (<Button className="custom-btn-secondary stop" onClick={() => {stopProcess(process.serverId, process.osId); onHide()}}>
            Stop <FaStop />
          </Button>)
        }
        <Button className="custom-btn-primary" onClick={onHide}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
