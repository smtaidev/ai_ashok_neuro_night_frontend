// import { NextApiResponse } from "next";

// // Function to set cookie
// export const setCookie = (
//   res: NextApiResponse,
//   name: string,
//   value: string,
//   options: { maxAge: number }

// ) => {
//   const cookie = `${name}=${value}; Max-Age=${options.maxAge}; Path=/`;
//   res.setHeader("Set-Cookie", cookie);
// };
 

// utils/cookie-storage.ts

export function setCookie(
  name: string,
  value: string,
  days: number = 7
): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/; secure; samesite=strict`;
}

export function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

