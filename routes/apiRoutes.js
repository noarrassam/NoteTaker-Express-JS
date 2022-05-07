const router = require("express").Router();
const db = require("../db/db.json");

router
.route("/api")
.get((req, res) => {
  res.send("Hello World");
})
.post((req, res) => {
    res.send("Hello World");
});

router
.route("/api/:id")
.delete((req, res) => {
  res.send(req.params.id);
});

module.exports = router;
