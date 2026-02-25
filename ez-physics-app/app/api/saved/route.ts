import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      user_id: string;
    };

    const result = await pool.query(
      `
      SELECT id, problem, solution, diagram, created_at 
      FROM saved_problems 
      WHERE user_id = $1 
      ORDER BY created_at DESC
      `,
      [decoded.user_id],
    );

    return NextResponse.json({ saved: result.rows });
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
