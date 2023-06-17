"use client";
import { createNitterLink } from "@/lib";
import { useContext } from "react";
import { SelectContext } from "./Select/SelectProvider";
import { UserFeedsResponse } from "@/@types";
import Link from "next/link";

interface Props {
  feed: UserFeedsResponse;
  user: string;
}

const FeedItem = ({ feed, user }: Props) => {
  const { selectedOption } = useContext(SelectContext);
  const url = createNitterLink(feed.subscriptions || [], selectedOption);

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 shadow-md">
      <div>
        <p className="text-3xl font-semibold capitalize">{feed.title}</p>
      </div>
      <div className="flex flex-row justify-between">
        <Link
          href={feed.subscriptions && feed.subscriptions.length > 0 ? url : ""}
          aria-disabled={feed.subscriptions && feed.subscriptions.length === 0}
          onClick={(e) => {
            if (feed.subscriptions && feed.subscriptions.length === 0) {
              e.preventDefault();
            }
          }}
          target="_blank"
          rel="noreferrer"
          className="w-fit rounded-xl border bg-blue-400 p-2 font-semibold capitalize text-white shadow-md aria-disabled:cursor-not-allowed aria-disabled:bg-gray-400"
        >
          visit
        </Link>
        <Link
          href={`/users/${user}/${feed.title}`}
          className="w-fit rounded-xl border border-blue-600 p-2 font-semibold capitalize text-gray-800 aria-disabled:cursor-not-allowed aria-disabled:bg-gray-400"
        >
          edit
        </Link>
      </div>
    </div>
  );
};

export default FeedItem;
