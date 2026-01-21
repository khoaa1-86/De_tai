const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Định nghĩa các loại MIME
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;
  
  // Xử lý các route API
  if (pathname === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Đây là dữ liệu từ server Vercel',
      status: 'success',
      timestamp: new Date().toISOString(),
      environment: 'Vercel Deployment'
    }));
    return;
  }
  
  if (pathname === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([
      { id: 1, name: 'Người dùng 1', email: 'user1@example.com' },
      { id: 2, name: 'Người dùng 2', email: 'user2@example.com' },
      { id: 3, name: 'Người dùng 3', email: 'user3@example.com' }
    ]));
    return;
  }
  
  // Xử lý các route HTML
  if (pathname === '/' || pathname === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trang Chủ - Web Server Vercel</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          header { background: #000000; color: white; padding: 2rem; text-align: center; }
          nav { background: #1a1a1a; padding: 1rem; }
          nav a { color: white; margin: 0 1rem; text-decoration: none; }
          nav a:hover { text-decoration: underline; }
          main { padding: 2rem; max-width: 1000px; margin: 0 auto; }
          .section { margin: 2rem 0; padding: 1.5rem; border: 1px solid #ddd; border-radius: 5px; }
          .vercel-badge { background: #000000; color: white; border: 2px solid #0070f3; padding: 0.3rem 0.8rem; border-radius: 3px; font-weight: bold; display: inline-block; margin: 1rem 0; }
          footer { background: #000000; color: white; text-align: center; padding: 1rem; margin-top: 2rem; }
          button { background: #0070f3; color: white; padding: 0.5rem 1rem; border: none; border-radius: 3px; cursor: pointer; font-weight: bold; }
          button:hover { background: #0051cc; }
        </style>
      </head>
      <body>
        <header>
          <h1>🌐 Web Server Internet (Vercel Edition)</h1>
          <p>Chào mừng đến với Web Server Node.js được Deploy trên Vercel</p>
          <div class="vercel-badge">⚡ Chạy trên Vercel</div>
        </header>
        
        <nav>
          <a href="/">Trang Chủ</a>
          <a href="/about">Về Chúng Tôi</a>
          <a href="/contact">Liên Hệ</a>
        </nav>
        
        <main>
          <div class="section">
            <h2>📝 Giới Thiệu</h2>
            <p>Đây là một Web Server được xây dựng bằng Node.js và deployed trên Vercel với các tính năng:</p>
            <ul style="margin-left: 2rem; margin-top: 1rem;">
              <li>✅ Xử lý các request HTTP</li>
              <li>✅ Cung cấp API RESTful</li>
              <li>✅ Phục vụ trang HTML động</li>
              <li>✅ Hỗ trợ JSON responses</li>
              <li>✅ Deploy trên nền tảng Vercel</li>
            </ul>
          </div>
          
          <div class="section">
            <h2>🔗 Các API Có Sẵn</h2>
            <p>Hãy thử các endpoint sau:</p>
            <ul style="margin-left: 2rem; margin-top: 1rem;">
              <li><strong>/api/data</strong> - Lấy dữ liệu chung</li>
              <li><strong>/api/users</strong> - Lấy danh sách người dùng</li>
              <li><strong>/about</strong> - Trang giới thiệu</li>
              <li><strong>/contact</strong> - Trang liên hệ</li>
            </ul>
          </div>
          
          <div class="section">
            <h2>🧪 Test API</h2>
            <button onclick="testApi('/api/data')">Test /api/data</button>
            <button onclick="testApi('/api/users')">Test /api/users</button>
            <div id="result" style="margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 3px; display: none;"></div>
          </div>
          
          <div class="section" style="background: #f0f4ff;">
            <h2>⚡ Thông Tin Deployment</h2>
            <p><strong>Nền tảng:</strong> Vercel</p>
            <p><strong>Runtime:</strong> Node.js</p>
            <p><strong>Port:</strong> Dynamic (được thiết lập bởi Vercel)</p>
            <p><strong>Trạng thái:</strong> ✅ Online</p>
          </div>
        </main>
        
        <footer>
          <p>&copy; 2026 Web Server Internet. Tất cả quyền được bảo lưu.</p>
          <p>Deployed on <strong>Vercel</strong></p>
        </footer>
        
        <script>
          function testApi(endpoint) {
            fetch(endpoint)
              .then(res => res.json())
              .then(data => {
                const result = document.getElementById('result');
                result.style.display = 'block';
                result.innerHTML = '<strong>Kết quả từ ' + endpoint + ':</strong><pre>' + JSON.stringify(data, null, 2) + '</pre>';
              })
              .catch(err => {
                const result = document.getElementById('result');
                result.style.display = 'block';
                result.innerHTML = '<strong>Lỗi:</strong> ' + err.message;
              });
          }
        </script>
      </body>
      </html>
    `);
    return;
  }
  
  if (pathname === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <title>Về Chúng Tôi</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 2rem; }
          h1 { color: #000000; }
          a { color: #0070f3; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>Về Chúng Tôi</h1>
        <p>Đây là trang giới thiệu về Web Server được xây dựng bằng Node.js và deployed trên Vercel.</p>
        <h2>Tính Năng:</h2>
        <ul>
          <li>Phục vụ trang HTML tĩnh</li>
          <li>Xử lý các request HTTP</li>
          <li>Cung cấp API RESTful</li>
          <li>Auto-start khi Vercel restart</li>
          <li>Environment variables support</li>
        </ul>
        <h2>Deployment Platform:</h2>
        <p>Server này được host trên <strong>Vercel</strong> - một nền tảng cloud hiện đại để deploy ứng dụng web.</p>
        <p>Ưu điểm của Vercel:</p>
        <ul>
          <li>Deployment nhanh chóng từ Git</li>
          <li>Auto-deploy tự động</li>
          <li>SSL/TLS và HTTPS tự động</li>
          <li>Environment variables hỗ trợ đầy đủ</li>
          <li>Global Edge Network</li>
          <li>Preview deployments</li>
        </ul>
        <p><a href="/">← Quay lại trang chủ</a></p>
      </body>
      </html>
    `);
    return;
  }
  
  if (pathname === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <title>Liên Hệ</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 2rem; }
          h1 { color: #000000; }
          form { max-width: 500px; }
          input, textarea { width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 3px; }
          button { background: #0070f3; color: white; padding: 0.5rem 1rem; border: none; border-radius: 3px; cursor: pointer; font-weight: bold; }
          button:hover { background: #0051cc; }
          a { color: #0070f3; text-decoration: none; }
        </style>
      </head>
      <body>
        <h1>Liên Hệ</h1>
        <form>
          <input type="text" placeholder="Tên của bạn" required>
          <input type="email" placeholder="Email của bạn" required>
          <textarea placeholder="Tin nhắn của bạn" rows="5" required></textarea>
          <button type="submit">Gửi</button>
        </form>
        <p style="margin-top: 2rem;"><a href="/">← Quay lại trang chủ</a></p>
      </body>
      </html>
    `);
    return;
  }
  
  // 404 - Trang không tìm thấy
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <title>404 - Trang không tìm thấy</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 5rem; background: #f0f0f0; }
        h1 { font-size: 4rem; color: #e74c3c; }
        p { font-size: 1.2rem; }
        a { color: #46d6ce; text-decoration: none; }
      </style>
    </head>
    <body>
      <h1>404</h1>
      <p>Trang bạn tìm kiếm không tồn tại!</p>
      <p><a href="/">← Quay lại trang chủ</a></p>
    </body>
    </html>
  `);
});

// ⚠️ VERCEL-SPECIFIC CONFIGURATION
// Vercel sẽ set PORT qua environment variable
// Server phải listen trên 0.0.0.0 để chấp nhận kết nối từ bên ngoài
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Listen trên tất cả network interfaces

const path = require("path");

// Serve trang chủ
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

server.listen(PORT, HOST, () => {
  console.log(`⚡ Web Server Vercel đang chạy tại http://0.0.0.0:${PORT}`);
  console.log(`📋 Các route có sẵn:`);
  console.log(`   - GET / (Trang chủ)`);
  console.log(`   - GET /about (Giới thiệu)`);
  console.log(`   - GET /contact (Liên hệ)`);
  console.log(`   - GET /api/data (API dữ liệu)`);
  console.log(`   - GET /api/users (API danh sách người dùng)`);
  console.log(`\n⚙️  Cấu hình Vercel:`);
  console.log(`   - PORT: ${PORT}`);
  console.log(`   - HOST: ${HOST}`);
  console.log(`   - Môi trường: ${process.env.NODE_ENV || 'production'}`);
  console.log(`\nNhấn Ctrl+C để dừng server.`);
});

// Xử lý lỗi
server.on('error', (err) => {
  console.error('❌ Lỗi server:', err);
});

// Graceful shutdown - quan trọng cho Vercel
process.on('SIGTERM', () => {
  console.log('\n📴 Server đang nhận tín hiệu SIGTERM từ Vercel...');
  server.close(() => {
    console.log('✅ Server đã tắt một cách an toàn.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n📴 Server đang tắt...');
  server.close(() => {
    console.log('✅ Server đã tắt.');
    process.exit(0);
  });
});
