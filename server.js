const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://frontend-demo-3bo9kgtvw-neyzentefik-7239s-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Tarayıcı dışı istekler için (curl, Postman vs.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS tarafından engellendi: " + origin));
      }
    }
  })
);

app.get("/", (req, res) => {
  res.send("API up");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
