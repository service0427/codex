const express = require('express');
const todosRouter = require('./routes/todos');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ 서버 살아있음!');
});

app.use('/todos', todosRouter);

app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
