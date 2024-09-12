import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const userPrefs = createCookie("mycookies", {
  expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // 1 week from now
  // domain: ".localhost:8888",
  path: "/",
  secure: false,
  httpOnly: true,
});
