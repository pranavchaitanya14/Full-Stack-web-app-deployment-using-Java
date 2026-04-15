import { db } from "@/lib/db";

export async function POST(req) {
  const { email, password } = await req.json();

  await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password]);

  return Response.json({ message: "User created" });
}
