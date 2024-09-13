import {
  json,
  LinksFunction,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import { Provider } from "react-redux";

import stylesheet from "~/tailwind.css?url";
import { store } from "./store";
import Header from "./common/components/Header";
import CartTab from "./common/components/CartTab";
import { Suspense, useEffect } from "react";
import PurchasedMessage from "./common/components/PurchasedMessage";
import { pushToDatalayer } from "./utils/axon";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const myCookieData = cookieHeader
    ? Object.fromEntries(cookieHeader.split("; ").map((c) => c.split("=")))
    : {};

  const expirationTime = new Date(Date.now() + 31536000000);
  let cookie = {};
  if (myCookieData._axwrt) {
    // add cookie without underscore
    cookie = {
      "Set-Cookie": `axwrt=${myCookieData._axwrt}; Path=/; HttpOnly; Expires=${expirationTime}; Domain=.getfeedbackcare.com; SameSite=Lax;`,
    };
  }

  return json(
    {},
    {
      headers: {
        ...cookie,
      },
    }
  );
};

const sendPageview = () => {
  pushToDatalayer("page_view", {});
};

export default function App() {
  const location = useLocation();

  useEffect(() => {
    sendPageview(location.pathname);
  }, [location.pathname]);

  return (
    <html lang="en">
      <head>
        <Suspense>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `{
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NCZFPV7S');
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
        <noscript>
          <iframe
            title="noscript"
            src="https://www.googletagmanager.com/ns.html?id=GTM-NCZFPV7S"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Provider store={store}>
          <Header />
          <Outlet />
          <CartTab />
          <PurchasedMessage />
          <ScrollRestoration />
          <Scripts />
        </Provider>
      </body>
    </html>
  );
}
