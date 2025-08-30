import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Backend এ login call
  const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!response.ok || !result?.data?.accessToken) {
    return NextResponse.json(
      { success: false, message: result.message || "Login failed" },
      { status: 401 }
    );
  }

  const accessToken = result.data.accessToken;

  // ✅ NextResponse দিয়ে cookie set
  const res = NextResponse.json({
    success: true,
    message: "Login successful",
  });

  res.cookies.set("accessToken", accessToken, {
    httpOnly: true, // JS access নেই
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 দিন
  });

  return res;
}
