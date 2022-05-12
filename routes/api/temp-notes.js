const router = require("express").Router();
const db = require("../../db/db.json");
const uuid = require("uuid");

router
  .route("/")

  // Get Note
  .get((req, res) => {
    res.json(db);
  })

  // Add Note
  .post((req, res) => {
    const notes = {
      uuid: uuid.v4(),
      title: req.body.title,
      text: req.body.text,
    };

    if (!notes.title || !notes.text) {
      return res.status(400).json({ msg: "Please include a title and text" });
    }

    db.push(notes);
    res.json(db);
  });

// Delete Note
router.route("/:id").delete((req, res) => {
  const found = db.some((note) => note.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Note deleted",
      Notes: db.filter((note) => note.id !== parseInt(req.params.id)),
    });
  } else {
    return res
      .status(400)
      .json({ msg: `No Note with the ID of ${req.params.id}` });
  }
});

module.exports = router;
