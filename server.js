const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// Firebase Mini - Lưu trữ dữ liệu JSON đơn giản
class FirebaseMini {
  constructor(dbPath = "./database.json") {
    this.dbPath = dbPath;
    this.initDB();
  }

  initDB() {
    if (!fs.existsSync(this.dbPath)) {
      fs.writeFileSync(this.dbPath, JSON.stringify({}, null, 2));
    }
  }

  read() {
    try {
      const data = fs.readFileSync(this.dbPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Lỗi đọc database:", error);
      return {};
    }
  }

  write(data) {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error("Lỗi ghi database:", error);
      return false;
    }
  }

  set(key, value) {
    const data = this.read();
    data[key] = value;
    return this.write(data);
  }

  get(key) {
    const data = this.read();
    return data[key] || null;
  }

  delete(key) {
    const data = this.read();
    delete data[key];
    return this.write(data);
  }

  getAll() {
    return this.read();
  }

  clear() {
    return this.write({});
  }
}

// Khởi tạo Firebase Mini
const db = new FirebaseMini("./database.json");

// Thêm dữ liệu mẫu
db.set("users", [
  { id: 1, name: "Nguyễn Văn A", email: "a@example.com" },
  { id: 2, name: "Trần Thị B", email: "b@example.com" }
]);

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });

  // API endpoints
  if (pathname === "/api/data" && req.method === "GET") {
    // Lấy tất cả dữ liệu
    res.end(JSON.stringify({ success: true, data: db.getAll() }));
  } 
  else if (pathname === "/api/get" && req.method === "GET") {
    // Lấy một key cụ thể
    const key = query.key;
    if (!key) {
      res.end(JSON.stringify({ success: false, error: "Key không được để trống" }));
      return;
    }
    const value = db.get(key);
    res.end(JSON.stringify({ success: true, key, value }));
  } 
  else if (pathname === "/api/set" && req.method === "POST") {
    // Thêm/cập nhật dữ liệu
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const { key, value } = JSON.parse(body);
        if (!key || value === undefined) {
          res.end(JSON.stringify({ success: false, error: "Key và value không được để trống" }));
          return;
        }
        db.set(key, value);
        res.end(JSON.stringify({ success: true, message: "Dữ liệu đã được lưu" }));
      } catch (error) {
        res.end(JSON.stringify({ success: false, error: "Dữ liệu không hợp lệ" }));
      }
    });
  } 
  else if (pathname === "/api/delete" && req.method === "DELETE") {
    // Xóa một key
    const key = query.key;
    if (!key) {
      res.end(JSON.stringify({ success: false, error: "Key không được để trống" }));
      return;
    }
    db.delete(key);
    res.end(JSON.stringify({ success: true, message: "Dữ liệu đã được xóa" }));
  } 
  else if (pathname === "/api/clear" && req.method === "DELETE") {
    // Xóa tất cả dữ liệu
    db.clear();
    res.end(JSON.stringify({ success: true, message: "Tất cả dữ liệu đã được xóa" }));
  } 
  else {
    res.end(JSON.stringify({ 
      success: true, 
      message: "Firebase Mini API",
      endpoints: {
        "GET /api/data": "Lấy tất cả dữ liệu",
        "GET /api/get?key=": "Lấy một key cụ thể",
        "POST /api/set": "Thêm/cập nhật dữ liệu (gửi {key, value})",
        "DELETE /api/delete?key=": "Xóa một key",
        "DELETE /api/clear": "Xóa tất cả dữ liệu"
      }
    }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
  console.log(`Firebase Mini đã khởi tạo`);
});
