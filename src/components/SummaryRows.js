import SummaryRow from "./SummaryRow";

const SummaryRows = ({ processes }) => {
  return (
    <tbody>
      {processes &&
        processes.map((process, index) => {
          return (
            <SummaryRow
              key={index}
              processName={process.processName}
              status={process.status}
            />
          );
        })}
    </tbody>
  );
};

export default SummaryRows;
