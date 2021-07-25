import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

import MyNavbar from "./MyNavbar";
import Footer from "./Footer";

function Login() {
  localStorage.clear();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(
        "http://main-server-process-server-2.apps.123.252.203.198.nip.io/api/server/login",
        {
          username: username,
          password: password,
        }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("password", response.data.password);
        localStorage.setItem("designationId", response.data.designationId);

        window.location = "/";
      })
      .catch((error) => {
        alert("add correct details");
      });
  }

  return (
    <div className="App">
      <MyNavbar text="Login" />
      <div className="container login-container" style={{ maxWidth: 400 }}>
        <Form>
          <div>
            <Form.Group size="lg" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              block
              size="sm"
              type="submit"
              disabled={!validateForm()}
              onClick={handleSubmit}
              className="custom-btn-primary login-btn"
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  );
}
export default Login;
