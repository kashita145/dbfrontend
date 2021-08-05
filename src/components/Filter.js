import Accordion from "react-bootstrap/Accordion";
import { Card } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { FaFilter } from "react-icons/fa";
import Filters from "./Filters";
import StartProcess from "./StartProcess";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: "pink" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

const Filter = ({ filterProcesses, processes, processNames, serverNames }) => {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header className="card-header">
          <CustomToggle className="custom-btn-primary" eventKey="1">
            Start Process
          </CustomToggle>
          <CustomToggle className="custom-btn-primary" eventKey="0">
            <FaFilter /> Filter
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse className="acc-body" eventKey="1">
          <StartProcess processNames={processNames} serverNames={serverNames} />
        </Accordion.Collapse>
        <Accordion.Collapse className="acc-body" eventKey="0">
          <Filters
            filterProcesses={filterProcesses}
            processes={processes}
            processNames={processNames}
            serverNames={serverNames}
          />
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Filter;
