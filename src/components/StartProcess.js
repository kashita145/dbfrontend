import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import authHeader from "../auth.js";

const StartProcess = ({ processNames, serverNames }) => {
  const [server, setServer] = useState("Select Server");
  const [process, setProcess] = useState("Select Process");

  const [displayProcess, setDisplayProcess] = useState([]);
  const [ipAddress, setIpAddress] = useState();
  const [port, setPort] = useState();

  const handleSelectServer = (e) => {
    setServer(e);

    let i = 0;
    for (i = 0; i < serverNames.length; i++) {
      if (serverNames[i].serverName === e) break;
    }

    let selectedProcesses = [];
    for (let j = 0; j < serverNames[i].processIds.length; j++) {
      for (let k = 0; k < processNames.length; k++) {
        if (serverNames[i].processIds[j] === processNames[k]._id) {
          let p = processNames[k].processName;
          // p = p.substring(0, p.length - 3);
          selectedProcesses.push(p);
        }
      }
    }
    setDisplayProcess(selectedProcesses);
    setIpAddress(serverNames[i].ipAddress);
    setPort(serverNames[i].port);
  };

  const handleSelectProcess = (e) => {
    setProcess(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (server === "Select Server" || process === "Select Process") {
      alert("Select a server and a process.");
      return;
    }

    axios
      .post(
        "http://localhost:4000/api/server/processes/start",
        {
          pname: process,
          sip: ipAddress,
          port: port,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        alert("Process started successfully.");
      })
      .catch((err) => {
        alert("Failed to start process");
      });

    setServer("Select Server");
    setProcess("Select Process");
  };

  return (
    <div className="form-container">
      <Form>
        <Form.Row className="form">
          <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
            <Form.Label className="form-label">Server Name</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleSelectServer(e.target.value)}
              value={server}
              className="form-control"
            >
              <option></option>
              {serverNames &&
                serverNames.map((s) => <option>{s.serverName}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
            <Form.Label className="form-label">Process Name</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleSelectProcess(e.target.value)}
              value={process}
              className="form-control"
            >
              <option></option>
              {displayProcess &&
                displayProcess.map((p) => <option> {p} </option>)}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Button
          className="custom-btn-primary"
          variant="primary"
          onClick={onSubmit}
        >
          Start
        </Button>
      </Form>
    </div>
  );
};

export default StartProcess;
