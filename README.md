# codex

Simple Express server with a sample Todo API.

## Usage

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

### Todo API

- `GET /todos` - list all todos
- `POST /todos` - create a todo with JSON body `{ "title": "Buy milk" }`
- `DELETE /todos/:id` - remove a todo by id
