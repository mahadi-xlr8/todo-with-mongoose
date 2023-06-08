import React, { Component } from "react";
function handleChange(e, setData) {
  let x = e.target.value;
  //   console.log(x);
  //   console.log(e.nativeEvent.data);
  setData(x);
}
function onKeyDown() {
  console.log("lol");
}

const Input = (props) => {
  const [data, setData] = React.useState("");

  return (
    <>
      <div className="inputContainer">
        <input
          autoFocus
          type="text"
          placeholder="Enter new task"
          value={data}
          onChange={(e) => handleChange(e, setData)}
          onKeyDown={(e) => {
            if (e.key == "Enter" || e.key == "Tab") {
              if (data.length > 0) {
                props.onClick(data);
                setData("");
              }
            }
          }}
        />
        <input
          type="button"
          value="Enter"
          onClick={() => {
            if (data.length > 0) {
              props.onClick(data);
              setData("");
            }
          }}
        />
      </div>
    </>
  );
};

export default Input;
