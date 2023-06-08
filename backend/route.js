const data = require("./database");
const express = require("express");
const app = express();
app.use(express.json());

app.get("/api/data", (req, res) => {
  async function getValues() {
    const values = await data.getData();
    res.json(values);
  }
  getValues()
});


app.post("/api/data", (req, res) => {
  async function add() {
    await data.addData(req.body.value, req.body.checked, req.body.important);
  }
  add();
  res.status(200).send("data added!");
});

app.put("/api/data", (req, res) => {
  async function temp() {
    const a = await data.updateData(req.body.id, req.body.value);
    res.send(a);
  }
  temp();
});

app.delete("/api/data",(req,res)=>{
  async function temp(){
    const result= await data.delete(req.body.id)
    res.send(result)
  }
  temp()
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listing on port " + port + "..."));
