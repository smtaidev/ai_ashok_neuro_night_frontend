// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode"; // 👈 আপনার utils/jwt থেকেও ব্যবহার করতে পারেন

export function middleware(req: NextRequest) {
  // 🍪 1) Cookie থেকে token নিন
  const token = req.cookies.get("accessToken")?.value;

  // 🍪 2) Token না থাকলে → Login এ redirect করুন
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // 🍪 3) Token decode করুন
    const decoded: any = jwtDecode(token);

    // 🍪 4) Role-based protection
    if (
      decoded.companyRole === "company Admin" &&
      (decoded.role === "companyAdmin" || decoded.role === "companyEmployee")
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // 🍪 5) সব ঠিক থাকলে request চালিয়ে দিন
    return NextResponse.next();
  } catch (err) {
    // Invalid token হলে → Login এ redirect করুন
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// কোন কোন route প্রোটেক্ট হবে
export const config = {
  matcher: ["/dashboard/:path*"], // ✅ শুধু dashboard protect হবে
};
