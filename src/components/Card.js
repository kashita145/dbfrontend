import React, { useState } from "react";


function Card({Head, Body, Colour, iconName}) {
  return (
    <div className="custom-card">
      <div className="custom-card-icon"><ion-icon name={iconName} class="custom-card-ion-icon" 
      style={{color: Colour, border: `2px solid ${Colour}`}}></ion-icon></div>
      <div className="custom-card-right">
        <div className="custom-card-head">{Head}</div>
        <div className="custom-card-body monospace"  style={{color: Colour}}>{Body}</div>
      </div>
    </div>
  );
}
export default Card;
