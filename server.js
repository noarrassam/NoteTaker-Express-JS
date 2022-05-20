const express = require("express");
const logger = require("./middleware/logger");
const notes = require("./routes/api/notes.js");
const htmlRoutes = require("./routes/htmlRoutes");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(logger);
app.use(express.json());
app.use("/", htmlRoutes);
app.use("/api/notes", notes);

let PORT = process.env.PORT | 3001;

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
