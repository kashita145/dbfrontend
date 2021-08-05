import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Login from "./components/Login";
import authHeader from "./auth.js";

function App() {
  const MAIN_SERVER =
    "http://main-server-process-server-2.apps.123.252.203.198.nip.io/";

  const [processes, setProcesses] = useState([]);
  const [processNames, setProcessNames] = useState([]);
  const [serverNames, setServerNames] = useState([]);

  const [filters, setFilters] = useState({
    processName: "",
    serverName: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const filterProcesses = (
    processName,
    serverName,
    status,
    startDate,
    endDate
  ) => {
    setFilters({
      ...filters,
      processName: processName === "" ? "" : processName,
      serverName: serverName === "" ? "" : serverName,
      status: status === "" ? "" : status,
      startDate: startDate === "" ? "" : startDate,
      endDate: endDate === "" ? "" : endDate,
    });
  };

  const stopProcess = (serverId, osId) => {
    console.log(serverId, osId);
    const msg = {
      osId: osId,
      serverIp: serverId.ipAddress,
      serverPort: serverId.port,
    };

    axios
      .post("http://main-server-node-main-server.apps.123.252.203.198.nip.io/api/server/processes/stop", msg, {  headers: 
      authHeader()
    })
      .then((res) => {
        alert("Process stopped succesfully");
      })
      .catch((err) => {
        alert("Failed to stop process");
      });
  };

  //getting status of all processes
  useEffect(() => {
    axios
      .get("http://main-server-node-main-server.apps.123.252.203.198.nip.io/api/server/processes/status", {
        headers: authHeader(),
      })
      .then((resp) => {
        setProcesses(resp.data);
      })
      .catch((err) => {
        console.log("Failed to fetch status of processes");
      });

    const interval = setInterval(() => {
      axios
        .get("http://main-server-node-main-server.apps.123.252.203.198.nip.io/api/server/processes/status", {
          headers: authHeader(),
        })
        .then((resp) => {
          setProcesses(resp.data);
        })
        .catch((err) => {
          console.log("Failed to fetch status of processes");
        });
    }, 15 * 1000);
    return () => clearInterval(interval);
  }, []);

  //get request for all process names - stored in processNames
  useEffect(() => {
    axios
      .get("http://main-server-node-main-server.apps.123.252.203.198.nip.io/api/server/processes/processList")
      .then((resp) => {
        setProcessNames(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {
        console.log("Fetching server names failed");
      });
  }, []);

  //get request for all server names - stored in serverNames
  useEffect(() => {
    axios
      .get("http://main-server-node-main-server.apps.123.252.203.198.nip.io/api/server/processes/serverList")
      .then((resp) => {
        setServerNames(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {
        console.log("Fetching server names failed");
      });
  }, []);

  return (
    <Router>
      <Route path="/login" exact component={Login} />
      <Route path="/" exact>
        <Dashboard
          filterProcesses={filterProcesses}
          processes={processes}
          processNames={processNames}
          serverNames={serverNames}
          filters={filters}
          stopProcess={stopProcess}
        />
      </Route>
    </Router>
  );
}

export default App;
