import TableRows from "./TableRows";
import TableHead from "./TableHead";
import { Table } from "react-bootstrap";

const ProcessTable = ({ processes, running, filters, details }) => {
  return (
    <div>
      <Table striped bordered hover>
        <TableHead details={details} />
        <TableRows processes={processes} running={running} filters={filters} />
      </Table>
    </div>
  );
};

export default ProcessTable;
