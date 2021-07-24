const tableHeadDetails = [
  "Start Time",
  "Server Name",
  "Process Name",
  "Instance ID",
  "Status",
  "Action",
  "Details",
];

const TableHead = () => {
  return (
    <thead>
      <tr>
        {tableHeadDetails.map((el) => (
          <th>{el}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
