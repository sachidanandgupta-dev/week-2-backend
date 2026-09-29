# To-Do List REST API

Node.js + Express + MongoDB (Mongoose). Endpoints to add, view, update and delete tasks.

## Setup
```bash
npm install
cp .env.example .env     # set MONGO_URI
npm run dev              # or: npm start
```

## Endpoints
| Method | URL | Body | Description |
|---|---|---|---|
| POST | `/api/tasks` | `{ "title": "Buy milk", "description": "2L" }` | Add task |
| GET | `/api/tasks` | – | List tasks (`?completed=true/false`) |
| GET | `/api/tasks/:id` | – | Get one task |
| PUT | `/api/tasks/:id` | `{ "completed": true }` | Update task |
| DELETE | `/api/tasks/:id` | – | Delete task |

## Test with Postman
1. `POST http://localhost:5000/api/tasks` → Body → raw → JSON.
2. Copy the returned `_id` and use it in the GET / PUT / DELETE URLs.
