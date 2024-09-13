import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const axwrtCookie = createCookie("axwrt", {
  expires: new Date(Date.now() + 31536000000), // 1 year from now
  // domain: ".localhost:8888",
  path: "/",
  // secure: true,
  httpOnly: true,
});

export const _axwrtpCookie = createCookie("_axwrt");
