const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const helmet = require("helmet");
var path = require("path");
const app = express();
app.use("/", express.static(__dirname + "/"));
const imageroutes = require("./routes/imageroutes");

const ENV = require("./env");

app.use(cors(), helmet());

app.get("/", (request, response, next) => {
  response.sendFile(path.join(__dirname + "/views/index.html"));
});

app.use("/api/images", imageroutes);

app.listen(ENV.port(), () => {
  console.log(`App running on port ${ENV.port()}.`);
});
