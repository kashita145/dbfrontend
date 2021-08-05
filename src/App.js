import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AlertModal from "./components/AlertModal";
import Summary from "./components/Summary";
import authHeader from "./auth.js";

let completedProcesses = 0;
let runningProcesses = 0;
let stoppedProcesses = 0;

function App() {
  const MAIN_SERVER = "http://localhost:4000/";

  const [userData, setUserData] = useState({});
  const [processes, setProcesses] = useState([]);
  const [processNames, setProcessNames] = useState([]);
  const [serverNames, setServerNames] = useState([]);
  const [summaryProcesses, setSummaryProcesses] = useState([]);

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShowAlert(false);
  const handleShow = () => setShowAlert(true);

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
    setShowAlert(true);
    // const msg = ;
    axios
      .post(
        "http://localhost:4000/api/server/processes/stop",
        {
          osId: osId,
          serverIp: serverId.ipAddress,
          serverPort: serverId.port,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        // alert("Process stopped succesfully");
        setAlertMessage("Process Stopped succesfully");
      })
      .catch((err) => {
        // alert("Failed to stop process");
        console.log(err);
        setAlertMessage("Failed to stop process");
      });
  };

  //getting status of all processes
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/server/processes/status", {
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
        .get("http://localhost:4000/api/server/processes/status", {
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

  // get processDetails for summary page
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/server/processes/summary", {
        headers: authHeader(),
      })
      .then((resp) => {
        setSummaryProcesses(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {
        console.log("Failed to fetch process summary");
      });

    const interval = setInterval(() => {
      axios
        .get("http://localhost:4000/api/server/processes/summary", {
          headers: authHeader(),
        })
        .then((resp) => {
          setSummaryProcesses(resp.data);
          console.log(resp.data);
        })
        .catch((err) => {
          console.log("Failed to fetch process summary");
        });
    }, 15 * 1000);
    return () => clearInterval(interval);
  }, []);

  //get request for all process names - stored in processNames
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/server/processes/processList")
      .then((resp) => {
        setProcessNames(resp.data);
      })
      .catch((err) => {
        console.log("Fetching server names failed");
      });
  }, []);

  //get request for all server names - stored in serverNames
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/server/processes/serverList")
      .then((resp) => {
        setServerNames(resp.data);
      })
      .catch((err) => {
        console.log("Fetching server names failed");
      });
  }, []);

  useEffect(() => {
    completedProcesses = 0;
    runningProcesses = 0;
    stoppedProcesses = 0;
    for(process of processes){
      if(process.status === 'Completed') completedProcesses ++;
      else if(process.status === 'In Progress') runningProcesses ++;
      else stoppedProcesses ++;
    }
    
  })

  return (
    <Router>
      <Route path="/login" exact >
        <Login user={userData} />
      </Route>
      <Route path="/" exact>
        <Summary processes={summaryProcesses} count={{completed: completedProcesses, running: runningProcesses, stopped: stoppedProcesses}} />
      </Route>
      <Route path="/logs" exact>
        <Dashboard
          filterProcesses={filterProcesses}
          processes={processes}
          processNames={processNames}
          serverNames={serverNames}
          filters={filters}
          stopProcess={stopProcess}
        />
        <AlertModal show={showAlert}
          onHide={handleClose}
          message={alertMessage} />
      </Route>
    </Router>
  );
}

export default App;
