import express from "express";
import mysql from "mysql";
import cors from "cors";
import crypto from "crypto";
import serverless from "serverless-http";

const api = express();

const PORT = 8800;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Violetta",
});

// Создаем базу данных, если она не существует
db.query("CREATE DATABASE IF NOT EXISTS itransition", (err) => {
  if (err) {
    console.error("Error creating the database:", err);
    return;
  }
  // Выбираем базу данных для дальнейшей работы
  db.changeUser({ database: "itransition" }, (err) => {
    if (err) {
      console.error("Error when selecting a database:", err);
      return;
    }

    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
         \`id\` int NOT NULL AUTO_INCREMENT,
        \`fullName\` varchar(45) NOT NULL,
        \`email\` varchar(45) NOT NULL,
        \`lastLoginTime\` varchar(45) DEFAULT NULL,
        \`registrationTime\` varchar(45) NOT NULL,
        \`status\` varchar(45) NOT NULL,
        \`salt\` varchar(64) NOT NULL,
        \`password\` varchar(64) NOT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`id_UNIQUE\` (\`id\`)
      );
    `;

    db.query(createUsersTableQuery, (err) => {
      if (err) {
        console.error("Error creating the users table:", err);
      }
    });
  });
});

api.use(cors());

api.use(express.json());

// api.listen(PORT, (err) => {
//   err ? console.log(err) : console.log(`Listening port ${PORT}`);
// });

api.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

api.post("/user/create", (req, res) => {
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

export function calculateHMAC(key, password) {
  return crypto.createHmac("SHA256", key).update(password).digest("hex");
}

api.post("/user/login", (req, res) => {
  const { email, password, lastLoginTime } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) {
      const user = data[0];
      const hashedPassword = user.password;
      const salt = user.salt;
      if (calculateHMAC(salt, password) === hashedPassword) {
        const updateQuery = "UPDATE users SET lastLoginTime = ? WHERE id = ?";
        db.query(updateQuery, [lastLoginTime, user.id], (updateErr) => {
          if (updateErr) return res.json(updateErr);

          return res.json({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            lastLoginTime: user.lastLoginTime,
            registrationTime: user.registrationTime,
            status: user.status,
          });
        });
      } else {
        return res.status(401).json({ message: "The password is not correct" });
      }
    } else {
      return res.status(401).json({ message: "The data is not correct" });
    }
  });
});

api.patch("/user/update-status", (req, res) => {
  const { ids, status } = req.body;

  if (!Array.isArray(ids) || typeof status !== "string") {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const placeholders = ids.map(() => "?").join(",");
  const query = `UPDATE users SET status = ? WHERE id IN (${placeholders})`;

  db.query(query, [status, ...ids], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({
      message: "Status updated successfully",
      affectedRows: results.affectedRows,
    });
  });
});

api.delete("/users", (req, res) => {
  const ids = req.query.ids ? req.query.ids.split(",") : [];

  if (ids.length === 0) {
    return res.status(400).json({ message: "Invalid or missing id parameter" });
  }

  const placeholders = ids.map(() => "?").join(",");

  const query = `DELETE FROM users WHERE id IN (${placeholders})`;

  db.query(query, ids, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res
      .status(200)
      .json({ message: "Users deleted", affectedRows: result.affectedRows });
  });
});

export const handler = serverless(api);
