const router = require("express").Router();
const storedData = require("../../db/store");
const db = require("../../db/db.json");

router
  .route("/")
  .get((req, res) => {
    res.status(200).json({ success: true, data: storedData.getNotes });
  })
  .post((req, res) => {
    const { title, text } = req.body;
    if (!title && !text) {
      return res
        .status(400)
        .json({ success: false, msg: "Please Provide Title and Text Values" });
    }

    res.status(201).json({ success: true, data: storedData.addNote(req.body) });
  });

router.delete("/:id", (req, res) => {
  const found = db.find((note) => note.id == req.params.id);

  if (!found) {
    return res
      .status(401)
      .json({ msg: `No Note with the ID of ${req.params.id}` });
  }
  res.status(201).json({
    msg: "Note deleted",
    Notes: storedData.removeNote(req.params.id),
  });
});

module.exports = router;
