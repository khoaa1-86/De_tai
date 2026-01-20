const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Trang chủ</h1><p>Đây là trang chủ của web server nội bộ</p>');
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Về chúng tôi</h1><p>Đây là trang về chúng tôi</p>');
  } else if (req.url === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Đây là dữ liệu API', status: 'success' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404 - Trang không tìm thấy</h1>');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Web server đang chạy tại http://localhost:${PORT}`);
});
