import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function getUserFromToken() {
  const token = cookies().get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      user_id: string;
    };

    return decoded.user_id;
  } catch {
    return null;
  }
}
