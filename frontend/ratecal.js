const connection = require("./connection");
const mongoose = require("mongoose");
const { get } = require("http");

connection();

let interest = 0;
let bored = 0;
let iteration = 0;
let boredRate = 0;


function getPercentage() {
  return (1-boredRate) * 100;
}

const dataSchema = new mongoose.Schema({
  emotion: String,
});

const deciderSchema = new mongoose.Schema({
  bored: String,
});

const dataModel = mongoose.model("data", dataSchema);
const deciderModel = mongoose.model("decider", deciderSchema);

module.exports = {
  getPercentage, deciderModel
}


async function myLoop() {
  if (iteration <= 6) {
    setTimeout(function () {
      dataModel.findOne((err, result) => {
        let data = result.emotion;
        console.log(data);

        if (data == "Happy" || data == "Surprise") {
          interest = interest + 1;
        } else {
          bored = bored + 1;
        }
      });

      console.log("iteration:" + iteration);
      console.log("i:" + interest);
      console.log("b:" + bored);
      iteration = iteration + 1;

      myLoop();
    }, 3000);
  } else {
    boredRate = bored / (interest + bored);

    console.log("boredRate: " + boredRate);

    if (boredRate >= 0.5) {
      try {
        await deciderModel.updateOne(
          { _id: '63fab1b2c857e68dcb04cd29' },
          {
            $set: {
              bored: 'true',
            },
          }
        );
        // console.log(check);
      } catch (error) {
        console.log(error);
      }
    }

    iteration = 0;
    interest = 0;
    bored = 0;
    myLoop();
  }
}

myLoop()