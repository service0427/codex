const express = require('express');
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('✅ 서버 살아있음!');
});

app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});

// 강제로 종료되는지 확인용 타이머 제거
