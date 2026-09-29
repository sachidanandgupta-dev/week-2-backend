# Notes App Backend (Mini Project)

CRUD API for a notes app. All notes routes are protected with JWT, and each user can only access their own notes.

## Setup
```bash
npm install
cp .env.example .env     # set MONGO_URI and JWT_SECRET
npm run dev
```

## Auth
| Method | URL | Body |
|---|---|---|
| POST | `/api/auth/register` | `{ "name", "email", "password" }` |
| POST | `/api/auth/login` | `{ "email", "password" }` |
| GET | `/api/auth/me` | header `Authorization: Bearer <token>` |

## Notes (header `Authorization: Bearer <token>` required)
| Method | URL | Body | Description |
|---|---|---|---|
| POST | `/api/notes` | `{ "title", "content", "tags": ["work"], "pinned": false }` | Create note |
| GET | `/api/notes` | – | List own notes (`?search=text&tag=work`), pinned first |
| GET | `/api/notes/:id` | – | Get one note |
| PUT | `/api/notes/:id` | any of the fields above | Update note |
| DELETE | `/api/notes/:id` | – | Delete note |
