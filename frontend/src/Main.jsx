import React, { Component } from "react";
import CheckBox from "./component/checkbox";
import Input from "./component/input";
import Priority from "./component/Priority";
import "./style.css";
import "font-awesome/css/font-awesome.css";
import _ from "lodash";
import Delete from "./component/delete";
import axios from "axios";

class Main extends React.Component {
  state = {
    data: [],
    currentId: 0,
  };
  updateState = () => {
    axios
      .get("/api/data?sort=important")
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((err) => console.log(err));
  };

  updateData = (id, value, checked, important) => {
    axios
      .put("/api/data", {
        id,
        value,
        important,
        checked,
      })
      .then(() => this.updateState())
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.updateState();
  }

  handleChange = (id) => {
    const list = this.state.data.filter((e) => e._id == id)[0];
    console.log(list);
    this.updateData(id, list.value, !list.checked, list.important);
  };
  handleEdit = (id, value) => {
    const list = this.state.data.filter((e) => e._id == id)[0];
    this.updateData(id, value, list.checked, list.important);
  };
  handleNewData = (value) => {
    axios
      .post("/api/data", {
        value,
        checked: false,
        important: false,
      })
      .then((response) => {
        console.log("data added to the database!");
        this.updateState();
      })
      .catch((err) => console.log(err));
  };
  handleImportant = (id) => {
    const list = this.state.data.filter((e) => e._id == id)[0];
    this.updateData(id, list.value, list.checked, !list.important);
  };

  handleDelete = (id) => {
    axios
      .delete("/api/data", {
        data: {
          id: id,
        },
      })
      .then((res) => {
        this.updateState();
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <>
        <h1>Unchecked Tasks</h1>
        <div className="task__container">
          {this.state.data.length != 0
            ? this.state.data
                .filter((e) => e.checked == false)
                .map((e) => {
                  return (
                    <div>
                      <CheckBox
                        key={e._id}
                        data={e}
                        onChange={this.handleChange}
                        onEdit={this.handleEdit}
                      />
                      <Priority
                        important={e.important}
                        onChange={this.handleImportant}
                        id={e._id}
                        key={e._id + "2"}
                      />
                      <Delete
                        onDelete={this.handleDelete}
                        key={e._id + "1"}
                        id={e._id}
                      />
                    </div>
                  );
                })
            : "feel free to add new tasks"}
        </div>
        <div className="input__container">
          <Input onClick={this.handleNewData} />
        </div>

        <h1>Completed tasks</h1>
        <div className="task__container">
          {this.state.data.filter((e) => e.checked === true).map((e) => 1)
            .length != 0
            ? this.state.data
                .filter((e) => e.checked === true)
                .map((e) => (
                  <div key={e._id}>
                    <CheckBox
                      key={e._id}
                      data={e}
                      onChange={this.handleChange}
                      onEdit={this.handleEdit}
                    />
                    
                    <Delete
                      onDelete={this.handleDelete}
                      key={e._id + "5"}
                      id={e._id}
                    />
                  </div>
                ))
            : "There is no completed task."}
        </div>
      </>
    );
  }
}

export default Main;
