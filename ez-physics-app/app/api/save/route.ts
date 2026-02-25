import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      user_id: string;
    };

    const { problem, solution, diagram } = await req.json();

    if (!problem || !solution) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await pool.query(
      `
      INSERT INTO saved_problems (user_id, problem, solution, diagram)
      VALUES ($1, $2, $3, $4)
      `,
      [decoded.user_id, problem, solution, diagram || null],
    );

    return NextResponse.json({ message: "Saved successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
