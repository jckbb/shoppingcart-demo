import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  console.log(context);
  request.headers.set("X-Your-Custom-Header", "Your custom header value");
};
// exports.handler = async (event, context) => {
//   // Set a new cookie
//   const newCookie = "myCookie=myValue; Path=/; HttpOnly; Secure; Max-Age=3600"; // Example cookie string

//   // Return a response with the Set-Cookie header
//   return {
//     statusCode: 200,
//     headers: {
//       "Set-Cookie": newCookie, // Setting the cookie in the header
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       message: "Cookie set successfully!",
//     }),
//   };
// };
