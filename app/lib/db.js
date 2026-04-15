import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "YOUR_RDS_ENDPOINT",
  user: "admin",
  password: "password123",
  database: "appdb"
});
