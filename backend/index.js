const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 4000;
const JWT_SECRET = "supersecret"; // 🔒 change this in real projects!

app.use(cors());
app.use(express.json());

// --------------------- DATABASE SETUP ---------------------

const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  // Providers table
  db.run(`CREATE TABLE IF NOT EXISTS providers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    providerName TEXT,
    serviceType TEXT,
    location TEXT,
    description TEXT,
    createdBy INTEGER,
    FOREIGN KEY(createdBy) REFERENCES users(id)
  )`);
});

// --------------------- AUTH MIDDLEWARE ---------------------

function authenticate(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ message: "Missing token" });

  const token = header.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// --------------------- ROUTES ---------------------
// Home route (for quick test)
app.get("/", (req, res) => {
  res.send("Backend is running 🎉 Use /providers or /auth routes.");
});

// Register
app.post("/auth/register", (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing email/password" });

  const hash = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    [name, email, hash, role || "PARTICIPANT"],
    function (err) {
      if (err) return res.status(400).json({ message: "Email already exists" });
      res.json({ id: this.lastID, email, role: role || "PARTICIPANT" });
    }
  );
});

// Login
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  });
});

// List providers (public)
app.get("/providers", (req, res) => {
  db.all("SELECT * FROM providers", (err, rows) => {
    if (err) return res.status(500).json({ message: "Error fetching providers" });
    res.json(rows);
  });
});

// Create provider (protected)
app.post("/providers", authenticate, (req, res) => {
  if (req.user.role !== "PROVIDER_ADMIN" && req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Not allowed" });
  }

  const { providerName, serviceType, location, description } = req.body;

  db.run(
    "INSERT INTO providers (providerName,serviceType,location,description,createdBy) VALUES (?,?,?,?,?)",
    [providerName, serviceType, location, description, req.user.id],
    function (err) {
      if (err) return res.status(400).json({ message: "Error creating provider" });
      res.json({
        id: this.lastID,
        providerName,
        serviceType,
        location,
        description,
        createdBy: req.user.id
      });
    }
  );
});

// --------------------- SERVER START ---------------------

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
