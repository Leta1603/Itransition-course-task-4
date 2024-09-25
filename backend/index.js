import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const PORT = 8800;

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Violetta",
  database: "itransition",
});

app.use(express.json());

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listening port ${PORT}`);
});

app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/users", (req, res) => {
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  const insertQuery =
    "INSERT INTO users (`fullName`, `email`,`lastLoginTime`, `registrationTime`, `status`, `salt`, `password`) VALUES (?)";
  const values = [
    req.body.fullName,
    req.body.email,
    req.body.lastLoginTime,
    req.body.registrationTime,
    req.body.status,
    req.body.salt,
    req.body.password,
  ];

  db.query(checkUserQuery, [req.body.email], (err, existingUser) => {
    if (err) return res.json(err);

    if (existingUser.length > 0) {
      return res.json({ message: "User already exists" });
    }

    db.query(insertQuery, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
});
