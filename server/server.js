const express =  require("express");
const cors  =  require("cors");
const env = require("./loadenv.js");

const routes = require(__dirname + "/routes");

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());


app.use("/", routes);

app.listen(PORT, function () {
  console.log("server start and running!");
});
