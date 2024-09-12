import type { Context } from "@netlify/edge-functions";

export default (request: Request, context: Context) => {
  const url = new URL(request.url);

  const value = context.cookies.get("_axwrt");
  context.cookies.set({
    name: "axwrt",
    value,
    expires: new Date().getTime() + 31536000000,
    domain: ".getfeedbackcare.com",
    secure: true, // for prod only
  });
  // request.headers.delete("cookie");
};

export const config = {
  path: "/",
};
