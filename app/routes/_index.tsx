import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import ProductCart from "~/common/components/ProductCart";
import { products } from "~/products";

const hotProducts = products.splice(0, 3);

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <section>
        <h1>Hero Page</h1>
      </section>
      <section>
        <h3 className="text-[1.5rem]">Popular</h3>
        {/* <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
          {hotProducts.map((product, key) => (
            <ProductCart key={key} data={product} />
          ))}
        </div> */}
        <Link to="/collection">
          <span>See More</span>
        </Link>
      </section>
    </div>
  );
}
