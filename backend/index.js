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
  const query = "INSERT INTO users (`name`, `email`) VALUES (?)";
  const values = [req.body.name, req.body.email];
  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
