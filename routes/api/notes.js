const router = require("express").Router();
const db = require("../../db/db.json");

router
  .route("/")
  .get((req, res) => {
    res.json(db);
  })
  .post((req, res) => {
    res.send(req.body);
  });

router.route("/:id").delete((req, res) => {
  res.send(req.params.id);
});

module.exports = router;
