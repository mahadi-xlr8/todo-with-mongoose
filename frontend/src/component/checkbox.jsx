import React, { Component } from "react";
const CheckBox = (props) => {
  return (
    <div className="checkbox__container">
      <input
        type="checkbox"
        name="checkbox"
        id={String(props.data._id)}
        checked={props.data.checked}
        onChange={() => props.onChange(props.data._id)}
        
      />
      <input
        type='text'
        className={props.data.checked ? "checked" : "unchecked"}
        value={props.data.value}
        id='input-value'
        style={{width:`${props.data.value.length-props.data.value.length/3+1.5}rem`}}
        onChange={(e)=>props.onEdit(props.data._id,e.target.value)}
      />


    </div>
  );
};

export default CheckBox;
