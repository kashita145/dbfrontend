import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

import TableRows from "./TableRows";
import TableHead from "./TableHead";
import Filter from "./Filter";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";

const checkValid = () => {
  const token = localStorage.getItem("token");
  if (token === null) {
    alert("please login to view the page");
    window.location = "/login";
  }
};

const Dashboard = ({
  filterProcesses,
  processes,
  processNames,
  serverNames,
  filters,
  stopProcess,
}) => {
  checkValid();

  //if (localStorage.getItem("token")=== null) <Redirect to="/login" />;

  return (
    <div className="App">
      <MyNavbar text="Logout" />
      <div className="page-heading monospace">Process Logs</div>
      <div className="filter-container">
        <Filter
          filterProcesses={filterProcesses}
          processes={processes}
          processNames={processNames}
          serverNames={serverNames}
        />
      </div>
      <div className="custom-container">
        <br />
        <Table responsive hover className="text-center">
          <TableHead />
          <TableRows
            processes={processes}
            running={true}
            filters={filters}
            stopProcess={stopProcess}
          />
        </Table>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
