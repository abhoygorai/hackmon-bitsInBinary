const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./connection");
// const modules = require("./ratecal");

const deciderSchema = new mongoose.Schema({
  bored: String,
});
const deciderModel = mongoose.model("decider", deciderSchema);

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/quiz", (req, res) => {
  res.render("quiz");
});

app.post("/fungame", (req, res) => {
  res.render("fun_game");
});

app.post("/sumstackgame", (req, res) => {
  res.render("sum_stacks_game");
});

app.get("/stats", (req, res) => {
  //   let percentage = getPercentage().toString();
  let percentage = "50";
  res.render("stats", { percentage });
});

app.post("/makefalse", (req, res) => {
  deciderModel.updateOne(
    { _id: "63fab1b2c857e68dcb04cd29" },
    {
      $set: {
        bored: "false",
      },
    }
  );
});

app.post("/bored", (req, res) => {
  connectDB().then(() => {
    deciderModel.findOne((err, result) => {
      let data = result.bored;
      //   console.log(data)
      res.send(data);
    });
  });
});

app.listen(3000, console.log("server started at port 3000"));
