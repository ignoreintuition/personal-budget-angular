import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

mongoose.connect("mongodb://localhost:27017/personalBudget");

const { Schema, model } = mongoose;

const budgetSchema = new Schema(
  {
    title: String,
    budget: Number,
    color: String,
  },
  {
    collection: "budget",
  },
);

const Budget = model("Budget", budgetSchema);

// import data from "./data.json" with { type: "json" };
const app = express();
const port = 3000;
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.get("/budget", cors(), async (req, res) => {
  const data = await Budget.find({});
  res.json(data);
});

app.post("/budget", cors(), async (req, res) => {
  const query = { title: req.body.title };
  console.log(req.body);
  const data = await Budget.findOneAndUpdate(query, req.body, { upsert: true });
  console.log(data);

  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Example port listening on http://localhost:${port}`);
});
