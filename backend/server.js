const express = require("express");
const app = express();
const cors = require("cors");
const checkRouter = require("./checkRouter");

app.use(cors());
app.use(express.json());
app.use("/api", checkRouter);

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
