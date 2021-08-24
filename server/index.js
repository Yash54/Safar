const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const path = require("path");
app.use(cors());
app.use(express.json());

app.use("/", require("./routes"));

module.exports = app.listen(port, (err) =>{
  if (err){ 
      console.log(`Error in running the server ${err}`);
  }
  else{ 
    console.log(`Server started and running on port ${port}`);
  }
});