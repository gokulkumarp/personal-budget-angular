const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");

const cors = require("cors");

app.use(cors());
//app.use("/", express.static("public"));

//Loading data from Json file
var budgetData;
fs.readFile("budget.json", "utf8", function (err, data) {
  if (err) throw err;
  budgetData = JSON.parse(data);
});
//------------

const budget = {
  myBudget: [
    {
      title: "Eat out",
      budget: 30,
    },
    {
      title: "Rent",
      budget: 375,
    },
    {
      title: "Groceries",
      budget: 100,
    },
  ],
};



app.get("/budget", function (req, res) {
  res.json(budgetData);
});

app.listen(port, () => {
  console.log("Example app listening at http://localhost:" + port);
});
