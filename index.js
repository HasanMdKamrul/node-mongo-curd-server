const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 15000;

// ** Use middleware

app.use(cors());
app.use(express.json());

// ** basic route

app.get("/", (req, res) => res.send("Node mongo server is running"));

// ** app listen

app.listen(port, () =>
  console.log(`Node mongo curd server is running at port:${port}`)
);
