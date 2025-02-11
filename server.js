import express from "express";
import cors from "cors";

import data from "./data.json" assert { type: "json" };
const app = express();
const port = 3000;

app.use(cors);

app.get("/budget", (req, res) => {
  res.json(budget);
});

app.listen(port, () => {
  console.log(`Example port listening on http://localhost:${port}`);
});
