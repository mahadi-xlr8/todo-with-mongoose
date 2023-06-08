const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/todo")
  .then(() => console.log("connected to the database"))
  .catch((err) => console.error(err));

const Data = mongoose.model(
  "lists",
  new mongoose.Schema({
    value: String,
    checked: Boolean,
    important: Boolean,
  })
);

async function addData(value, checked, important) {
  const data = new Data({
    value,
    checked,
    important,
  });
  await data.save();
}
async function updateData(id, value, checked, important) {
  const list = await Data.findOne({ _id: id });
  list.value = value;
  list.checked = checked;
  list.important = important;
  const result = await list.save();
  return result;
}

async function getAllData(value) {
  if (value) {
    const temp = {};
    temp[value] = -1;
    const data = await Data.find().sort(temp);
    return data;
  }
  return await Data.find()
}

async function deleteData(id) {
  const result = await Data.deleteOne({ _id: id });
  return id;
}
module.exports.getData = getAllData;
module.exports.addData = addData;
module.exports.delete = deleteData;
module.exports.updateData = updateData;
