import { db } from "@/lib/db";

export async function GET() {
  const [rows] = await db.query("SELECT * FROM tasks");
  return Response.json(rows);
}

export async function POST(req) {
  const { task } = await req.json();
  await db.query("INSERT INTO tasks (task) VALUES (?)", [task]);
  return Response.json({ message: "Task added" });
}
