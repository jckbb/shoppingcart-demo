import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <section className="h-screen w-screen bg-slate-200">
        <h1 className="text-[5rem] text-center font-sans font-bold">
          Welcome!
        </h1>
        <div className="flex justify-center">
          <Link to="/collection">
            <h2 className="underline">See our Collection</h2>
          </Link>
        </div>
      </section>
    </div>
  );
}
