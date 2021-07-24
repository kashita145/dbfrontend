import TableRow from "./TableRow";

const TableRows = ({ processes, running, filters, stopProcess }) => {
  return (
    <tbody>
      {processes &&
        processes.map((process, index) => {
          let filterStartDate = "";
          let filterEndDate = "";
          let processEndDate = null;
          if (filters.startDate !== "") {
            filterStartDate = new Date(filters.startDate.replace(/-/g, "/"));
          }
          if (filters.endDate !== "") {
            filterEndDate = new Date(filters.endDate.replace(/-/g, "/"));
          }
          let processStartDate = new Date(
            process.startTime.substring(0, 10).replace(/-/g, "/")
          );
          if (process.endTime !== null) {
            processEndDate = new Date(
              process.endTime.substring(0, 10).replace(/-/g, "/")
            );
          }

          let show = true;
          if (
            filters.processName !== "" &&
            process.processName !== filters.processName
          ) {
            show = false;
          }
          if (
            filters.serverName !== "" &&
            process.serverId.serverName !== filters.serverName
          ) {
            show = false;
          }
          if (filters.status !== "" && process.status !== filters.status) {
            show = false;
          }
          if (filterStartDate !== "" && processStartDate < filterStartDate) {
            show = false;
          }
          if (
            filterEndDate !== "" &&
            processEndDate !== null &&
            processEndDate > filterEndDate
          ) {
            show = false;
          }
          if (filterEndDate !== "" && processEndDate === null) show = false;
          if (show) {
            return (
              <TableRow
                key={process.processId}
                process={process}
                running={running}
                stopProcess={stopProcess}
              />
            );
          }
          return "";
        })}
    </tbody>
  );
};

export default TableRows;
