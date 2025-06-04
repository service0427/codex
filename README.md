# codex

Simple Express server with a sample Todo API stored in `data/todos.json`.

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
  - `completed=true|false` query filters by status
- `GET /todos/:id` - get a single todo
- `POST /todos` - create a todo with JSON body `{ "title": "Buy milk" }`
- `PUT /todos/:id` - update title or `completed` flag
- `DELETE /todos/:id` - remove a todo by id
