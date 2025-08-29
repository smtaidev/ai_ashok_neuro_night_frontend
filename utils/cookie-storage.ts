import { NextApiResponse } from "next";

// Function to set cookie
export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options: { maxAge: number }

) => {
  const cookie = `${name}=${value}; Max-Age=${options.maxAge}; Path=/`;
  res.setHeader("Set-Cookie", cookie);
};
 