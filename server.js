const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
