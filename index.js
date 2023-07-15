const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const path = require("path");

// Middleware
app.use(express.json());

//Allow cors
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//Connect to database
const connectDB = require("./config/database");
connectDB();

// Set the absolute path to the views directory
const viewsPath = path.join(__dirname, "views");

// Set EJS as the view engine and specify the views directory
app.set("view engine", "ejs");
app.set("views", viewsPath);

// Allow express to use json
app.use(bodyParser.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/sms", require("./routes/sms"));
app.use("/data", require("./routes/data"));

app.post("/", (req, res) => {
  res.send(res.body);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
