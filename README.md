
# YouTube Companion Dashboard

This project is a mini-dashboard to manage a YouTube video using the YouTube Data API. It supports fetching video details, commenting, replying, deleting comments, and adding personal notes. All major user actions are logged for analytics.

## 📦 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js


---

## 📡 API Endpoints

### Notes API

| Method | Endpoint       | Description                  |
|--------|----------------|------------------------------|
| GET    | `/api/notes`   | Get all notes                |
| POST   | `/api/notes`   | Add a new note               |

### Log API

| Method | Endpoint       | Description                  |
|--------|----------------|------------------------------|
| POST   | `/api/log`     | Log any event/action         |

### Video API

| Method | Endpoint                    | Description                              |
|--------|-----------------------------|------------------------------------------|
| GET    | `/api/video?videoId=ID`     | Get video details (title, stats, etc)    |
| PUT    | `/api/video`                | Update title and description             |
| POST   | `/api/video/comment`        | Add a top-level comment                  |
| POST   | `/api/video/reply`          | Reply to a comment                       |
| DELETE | `/api/video/comment/:id`    | Delete a comment                         |

---

## 🧩 Database Schema

### Notes Collection

```
{
  content: String,
  createdAt: Date
}
```

### Logs Collection

```
{
  eventType: String,
  payload: Mixed,
  timestamp: Date
}
```

---

## 🧪 Environment Variables

Create a `.env` file with the following keys:

```
MONGO_URI=your_mongo_db_uri
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
REDIRECT_URI=your_redirect_uri
REFRESH_TOKEN=your_refresh_token
ACCESS_TOKEN=your_access_token
```

---


---



All the best! 🎯
