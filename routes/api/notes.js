const router = require("express").Router();
const api = require("../../db/store");

router.get("/", api.getNotes);
router.route("/").post((req, res) => api.addNote(res.json(req.body)));
router.delete("/:id", api.removeNote);

module.exports = router;
