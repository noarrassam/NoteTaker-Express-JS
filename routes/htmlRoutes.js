const router = require("express").Router();
let path = require("path");

router.get("/index", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.get("/styles", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"));
});

router.post("/styles", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"));
});

router.get("/index.js", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
});

router.get("/text", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/text.html"));
});

router.get("/data", function (req, res) {
  res.sendFile(path.join(__dirname, "../db/store.js"));
});

module.exports = router;
