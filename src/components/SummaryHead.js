const header = ["Process", "Status"];

const SummaryHead = () => {
  return (
    <thead>
      <tr>
        {header.map((el) => (
          <th>{el}</th>
        ))}
      </tr>
    </thead>
  );
};

export default SummaryHead;
