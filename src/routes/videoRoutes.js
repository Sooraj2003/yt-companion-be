const express = require("express");
const router = express.Router();
const {
  getNotes,
  addNote,
  logEvent,
  getVideoDetails,
  updateVideo,
  commentOnVideo,
  replyToComment,
  deleteComment,
} = require("../controllers/videoController");

router.get("/notes", getNotes);
router.post("/notes", addNote);
router.post("/log", logEvent);

router.get("/video", getVideoDetails);
router.put("/video", updateVideo);
router.post("/video/comment", commentOnVideo);
router.post("/video/reply", replyToComment);
router.delete("/video/comment/:commentId", deleteComment);

module.exports = router;