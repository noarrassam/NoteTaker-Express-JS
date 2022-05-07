const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const notes = require("./routes/api/notes");
const htmlRoutes = require("./routes/htmlRoutes");
const app = express();

app.use(logger);
app.use(express.json());

// api call
app.use("/api/notes", notes);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

let PORT = process.env.PORT | 3001;

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
