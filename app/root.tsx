import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Provider } from "react-redux";

import stylesheet from "~/tailwind.css?url";
import { store } from "./store";
import Header from "./common/components/Header";
import CartTab from "./common/components/CartTab";
import { Suspense } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Suspense>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `{
              (function (w, d, s, l, i) {
                  w[l] = w[l] || [];
                  w[l].push({ "gtm.start": new Date().getTime(), "event": "gtm.js" });
                  var f = d.getElementsByTagName(s)[0],
                      j = d.createElement(s),
                      dl = l != "dataLayer" ? "&l=" + l : "";
                  j.async = true;
                  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
                  f.parentNode.insertBefore(j, f);
              })(window, document, "script", "dataLayer", "GTM-XXX");
                ;
            }`,
            }}
          />
        </Suspense>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <Header />
          <Outlet />
          <CartTab />
          <ScrollRestoration />
          <Scripts />
        </Provider>
      </body>
    </html>
  );
}
