import Button from "react-bootstrap/Button";
import Modal from "./MyModal";
import { useState } from "react";
import { FaStop } from "react-icons/fa";
import { Icon } from "@iconify/react";
import infoCircleOutlined from "@iconify-icons/ant-design/info-circle-outlined";

const TableRow = ({ process, index, running, stopProcess }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <tr key={index}>
      <td>{process.startTime}</td>
      <td>{process.serverId.serverName}</td>
      <td>{process.processName}</td>
      <td>{process._id}</td>
      {process.status === "Stopped" && (
        <td>
          <div className="stopped status">{process.status}</div>
        </td>
      )}
      {process.status === "Failed" && (
        <td>
          <div className="failed status">{process.status}</div>
        </td>
      )}
      {process.status === "Completed" && (
        <td>
          <div className="completed status">{process.status}</div>
        </td>
      )}
      {process.status === "In Progress" && (
        <td>
          <div className="status">Running</div>
        </td>
      )}
      <td>
        {process.status !== "Completed" &&
          process.status !== "Failed" &&
          process.status !== "Stopped" && (
            <Button
              className="custom-btn-secondary stop"
              onClick={() => {
                stopProcess(process.serverId, process.osId);
              }}
              variant="outline-danger"
              on
            >
              <b>Stop</b> <FaStop />
            </Button>
          )}
        {(process.status === "Completed" ||
          process.status === "Failed" ||
          process.status === "Stopped") && (
          <Button className="disabled" variant="outline-secondary" disabled>
            Stop <FaStop />
          </Button>
        )}
      </td>
      <td>
        <Button variant="link" onClick={handleShow}>
          <h4>
            <Icon icon={infoCircleOutlined} color="#7b7b7b" />
          </h4>
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          process={process}
          running={running}
        />
      </td>
    </tr>
  );
};

export default TableRow;
