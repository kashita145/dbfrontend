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
      <td>
        {process.startTime.substring(0, 10)}
        {", "}
        {process.startTime.substring(11, 16)} IST
      </td>
      <td className="monospace">{process.serverId.serverName}</td>
      <td className="monospace">{process.processName.substring(0, process.processName.length - 3).replace(/_/g, ' ')}</td>
      <td className="monospace">{process._id}</td>
      {process.status === "Failed" && (
        <td>
          <div className="stopped status">{process.status}</div>
        </td>
      )}
      {process.status === "Stopped" && (
        <td>
          <div className="failed status"><ion-icon name="close-circle-outline" class="status-icon-stopped"></ion-icon>{process.status}</div>
        </td>
      )}
      {process.status === "Completed" && (
        <td>
          <div className="completed status"><ion-icon size="" name="checkmark-circle-outline" class="status-icon-completed"></ion-icon> {process.status}</div>
        </td>
      )}
      {process.status === "In Progress" && (
        <td>
          <div className="running status"><ion-icon name="ellipsis-horizontal-circle-outline" class="status-icon-running"></ion-icon>Running</div>
        </td>
      )}
      {/* <td>
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
             <FaStop />
            </Button>
          )}
        {(process.status === "Completed" ||
          process.status === "Failed" ||
          process.status === "Stopped") && (
          // <Button className="disabled" variant="outline-secondary" disabled>
          //   Stop <FaStop />
          // </Button>
          <div></div>
        )}
      </td> */}
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
          stopProcess={stopProcess}
        />
      </td>
    </tr>
  );
};

export default TableRow;
