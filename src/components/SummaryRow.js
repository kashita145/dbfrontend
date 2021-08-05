const SummaryRow = ({ processName, status }) => {
  return (
    <tr>
      <td className="monospace"> {processName.substring(0, processName.length - 3).replace(/_/g, ' ')} </td>

      {status === "Stopped" && (
        <td>
          <div className="stopped status"><ion-icon name="close-circle-outline" class="status-icon-stopped"></ion-icon>{status}</div>
        </td>
      )}
      {status === "Failed" && (
        <td>
          <div className="failed status">{status}</div>
        </td>
      )}
      {status === "Completed" && (
        <td>
          <div className="completed status"> <ion-icon name="checkmark-circle-outline" class="status-icon-completed"></ion-icon> {status}</div>
        </td>
      )}
      {status === "In Progress" && (
        <td>
          <div className="running status"> <ion-icon name="ellipsis-horizontal-circle-outline" class="status-icon-running"></ion-icon>Running</div>
        </td>
      )}
    </tr>
  );
};

export default SummaryRow;
