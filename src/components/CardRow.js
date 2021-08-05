import React, { useState } from "react";
import Card from "./Card";

function CardRow({count}) {
  return (
    <div className="custom-card-row">
        <Card Head="Records" Body={count.completed + count.running + count.stopped} Colour="#2e52da" iconName="receipt-outline" />
        <Card Head="Running" Body={count.running} Colour="#e67e22" iconName="ellipsis-horizontal-outline" />
        <Card Head="Failed" Body={count.stopped} Colour="red" iconName="close-outline" />
        <Card Head="Completed" Body={count.completed} Colour="green" iconName="checkmark-outline" />
    </div>
  );
}
export default CardRow;
