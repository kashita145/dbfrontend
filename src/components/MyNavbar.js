import Navbar from "react-bootstrap/Navbar";
import {NavDropdown} from "react-bootstrap";

const getUserName = () => {
  if(!localStorage.getItem("username")) return "";
  let username = localStorage.getItem("username").split('.')[0]
  let userName = username[0].toUpperCase() + username.slice(1);
  return userName;
}

const getLastLogin = () => {
  if(!localStorage.getItem("lastLogin")) return "";
  let lastLogin = localStorage.getItem("lastLogin");
  return lastLogin.substring(0, 10) + 
  ", " + 
  lastLogin.substring(11, 16) + " IST"
}

const MyNavbar = ({ text }) => {
  return (
    <Navbar>
      <Navbar.Brand className="custom-brand">
        <span className="footer-text-main">Process Monitoring Tool </span> 
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        {text !== "Login" && (
          <Navbar.Text>
            <a className={ window.location.pathname === "/" ? "nav-link active": "nav-link"} href="/">
              Dashboard
            </a>
          </Navbar.Text>
        )}
        {text !== "Login" && (
          <Navbar.Text>
            <a className={ window.location.pathname === "/logs" ? "nav-link active": "nav-link"} href="/" href="/logs">
              Logs
            </a>
          </Navbar.Text>
        )}
        {text !== "Login" && (
          // <Navbar.Text>
          //   <a className="nav-link" href="/login">
          //     {text}
          //   </a>
          // </Navbar.Text>
          <NavDropdown title={"Hi, " + getUserName()} className="nav-dropdown">
            <div className="nav-dropdown-item">
              Admin
            </div>
            <div className="nav-dropdown-item">
              Last login:
            </div>
            <div className="nav-dropdown-item">
              {getLastLogin()}
            </div>
            <NavDropdown.Divider />
            <div className="nav-dropdown-item">
              <a className="btn-logout" href="/login">
                 {text}
              </a>
            </div>
          </NavDropdown>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
