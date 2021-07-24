import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useState } from "react";

const Filters = ({ processes, filterProcesses, processNames, serverNames }) => {
  const [processName, setProcessName] = useState("");
  const [serverName, setServerName] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const applyFilters = (e) => {
    e.preventDefault();
    if (
      serverName === "" &&
      processName === "" &&
      status === "" &&
      startDate === "" &&
      endDate === ""
    ) {
      alert("Please select a filter");
      return;
    }
    console.log(serverNames, processNames);
    filterProcesses(processName, serverName, status, startDate, endDate);
  };

  const handleReset = (e) => {
    setProcessName("");
    setServerName("");
    setStatus("");
    setStartDate("");
    setEndDate("");
    filterProcesses("", "", "", "", "");
  };

  return (
    <div className="form-container">
      <Form>
        <Form.Row className="form">
          <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
            <Form.Label className="form-label">Process Name</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setProcessName(e.target.value)}
              value={processName}
              className="form-control"
            >
              <option></option>
              {processNames &&
                processNames.map((p) => <option>{p.processName}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
            <Form.Label>Server Name</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setServerName(e.target.value)}
              value={serverName}
              className="form-control"
            >
              <option></option>
              {serverNames &&
                serverNames.map((s) => <option>{s.serverName}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              className="form-control"
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              className="form-control"
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
            <Form.Label>Process Status</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              className="form-control"
            >
              <option></option>
              <option>Completed</option>
              <option>Failed</option>
              <option>In Progress</option>
              <option>Stopped</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row></Form.Row>
        <Form.Row></Form.Row>
        <Button
          className="custom-btn-primary"
          variant="outline-primary"
          type="submit"
          onClick={applyFilters}
        >
          Apply
        </Button>{" "}
        <Button
          className="custom-btn custom-btn-secondary"
          variant="outline-danger"
          onClick={handleReset}
        >
          Reset
        </Button>
      </Form>
    </div>
  );
};

export default Filters;
