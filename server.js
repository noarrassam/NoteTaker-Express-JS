const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const app = express();

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

let PORT = 3001;

// Start the server on the port
app.listen(PORT, () =>
  console.log(`Listening on PORT: http://Localhost:${PORT}`)
);
