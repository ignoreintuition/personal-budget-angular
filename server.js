import express from "express";
import data from "./data.json" assert { type: "json" };
const app = express();
const port = 3000;

app.use("/", express.static("public"));

const budget = data;
app.get("/hello", (req, res) => {
  res.send("Hello World");
});

app.get("/budget", (req, res) => {
  res.json(budget);
});

app.listen(port, () => {
  console.log(`Example port listening on http://localhost:${port}`);
});
