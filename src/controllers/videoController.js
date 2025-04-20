const Note = require("../models/Note");
const Log = require("../models/Log");
const { google } = require("googleapis");

// Define the scopes required for editing videos
const SCOPES = [
  'https://www.googleapis.com/auth/youtube.force-ssl',  // Full access to YouTube, including video editing
];

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Set the refresh token to obtain an access token
oauth2Client.setCredentials({
    access_token: process.env.ACCESS_TOKEN, // Use the new access token
    refresh_token: process.env.REFRESH_TOKEN // Refresh token, if available
  });
  

// Initialize the YouTube API client with OAuth2 credentials
const youtube = google.youtube({ version: "v3", auth: oauth2Client });

// Endpoint to get all notes (no changes needed here)
exports.getNotes = async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
};

// Endpoint to add a new note (no changes needed here)
exports.addNote = async (req, res) => {
  const { content } = req.body;
  const newNote = new Note({ content });
  await newNote.save();
  res.status(201).json(newNote);
};

// Endpoint to log events (no changes needed here)
exports.logEvent = async (req, res) => {
  const { eventType, payload } = req.body;
  const log = new Log({ eventType, payload });
  await log.save();
  res.status(201).json(log);
};

// Endpoint to get video details using the YouTube API
exports.getVideoDetails = async (req, res) => {
  try {
    const { videoId } = req.query;
    const response = await youtube.videos.list({
      part: "snippet,statistics",
      id: videoId,
    });
    res.json(response.data.items[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Endpoint to update video details (title, description)
exports.updateVideo = async (req, res) => {
  try {
    const { videoId, title, description } = req.body;
    const response = await youtube.videos.update({
      part: "snippet",
      requestBody: {
        id: videoId,
        snippet: { title, description, categoryId: "22" },  // CategoryId '22' is for "People & Blogs"
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Endpoint to comment on a video
exports.commentOnVideo = async (req, res) => {
  try {
    const { videoId, text } = req.body;
    const response = await youtube.commentThreads.insert({
      part: "snippet",
      requestBody: {
        snippet: {
          videoId,
          topLevelComment: {
            snippet: { textOriginal: text },
          },
        },
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Endpoint to reply to a comment
exports.replyToComment = async (req, res) => {
  try {
    const { parentId, text } = req.body;
    const response = await youtube.comments.insert({
      part: "snippet",
      requestBody: {
        snippet: { parentId, textOriginal: text },
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Endpoint to delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await youtube.comments.delete({ id: commentId });
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
