import Navbar from "react-bootstrap/Navbar";
const MyNavbar = ({ text }) => {
  return (
    <Navbar>
      <Navbar.Brand className="custom-brand">
        <span className="footer-text-main">RTB</span> Dashboard
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <a className="nav-link" href="/login">
            {text}
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
