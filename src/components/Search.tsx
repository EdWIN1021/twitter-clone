import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";
import useUsers from "../hooks/useUsers";
import UserItem from "./UserItem";
import Stripe from "stripe";

const Search = () => {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState("");
  const { users } = useUsers(search);

  const handleSubscribe = async () => {
    const stripe = new Stripe(import.meta.env.VITE_STRIPE_KEY);
    const { url } = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: import.meta.env.VITE_STRIPE_PRODUCT_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${import.meta.env.VITE_BASE_URL}/success`,
      cancel_url: `${import.meta.env.VITE_BASE_URL}/cancel`,
    });
    window.location.assign(url || `${import.meta.env.VITE_BASE_URL}/home`);
  };

  return (
    <div className="hidden md:block">
      <div className="px-7 py-4">
        <div
          className={clsx("flex rounded-full bg-[rgba(247,249,249)] p-4", {
            "border-primary border": active,
          })}
        >
          <MagnifyingGlassIcon
            className={clsx("w-5 stroke-2", {
              "stroke-primary": active,
            })}
          />
          <input
            className="w-full bg-[rgba(247,249,249)] pl-2 outline-none"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
          />

          {search && (
            <XCircleIcon
              className={clsx("w-7 cursor-pointer fill-primary-blue")}
              onClick={() => {
                setSearch("");
              }}
            />
          )}
        </div>
      </div>

      <div className="mb-3 px-7">
        <div className="rounded-2xl bg-[rgba(247,249,249)] p-4">
          <h2 className="text-[20px] font-extrabold">Subscribe to Premium</h2>
          <p className="my-2">
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <button
            className="rounded-full bg-black px-3 py-1 font-bold text-white"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
      </div>

      <div className="px-7">
        <div className="w-[351px] rounded-2xl bg-[rgba(247,249,249)]">
          <h2 className="px-4 py-3 text-lg font-extrabold"> Who to follow</h2>

          <>
            {users?.map((user) => (
              <div key={user?.id}>
                <UserItem user={user} />
              </div>
            ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default Search;
