import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import "../App.css";

import SummaryRows from "./SummaryRows";
import SummaryHead from "./SummaryHead";
import CardRow from "./CardRow";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";

const Summary = ({ processes, count }) => {
  return (
    <div className="App">
      <MyNavbar text="Logout" />
      <div className="page-heading">Dashboard</div>
      <div className="container"><CardRow count={count} /></div>
      <div className="align-me">
        <br />
        <div className="custom-container summary-container">
          <Table responsive hover className="text-center summary-table">
            <SummaryHead />
            <SummaryRows processes={processes} />
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Summary;
