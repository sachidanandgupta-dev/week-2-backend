# User Authentication API

Registration and login with bcrypt password hashing and JWT authentication.

## Setup
```bash
npm install
cp .env.example .env     # set MONGO_URI and JWT_SECRET
npm run dev
```

## Endpoints
| Method | URL | Body | Description |
|---|---|---|---|
| POST | `/api/auth/register` | `{ "name", "email", "password" }` | Create account, returns token |
| POST | `/api/auth/login` | `{ "email", "password" }` | Login, returns token |
| GET | `/api/auth/me` | header `Authorization: Bearer <token>` | Current user (protected) |

## Test with Postman
1. Register, copy the `token` from the response.
2. For `/api/auth/me`: Authorization tab → Bearer Token → paste token.

Passwords are hashed with bcrypt (`bcryptjs`, same API) and never returned in responses.
