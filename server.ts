const express = require("express");
const app = express();

app.get("/", function (req: any, res: any) {
  res.send("Hello World");
});

app.listen(3000);
