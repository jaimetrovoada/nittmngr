"use client";
import { createNitterLink } from "@/lib";
import { UserFeedsResponse } from "@/@types";
import Link from "next/link";

interface Props {
  feed: UserFeedsResponse;
  user: string;
}

const FeedItem = ({ feed, user }: Props) => {
  const url = createNitterLink(feed.subscriptions || [], feed.isNsfw);

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
          className="rounded-xl border-2 border-blue-500 p-2 text-sm capitalize aria-disabled:cursor-not-allowed aria-disabled:border-gray-400 aria-disabled:text-gray-600"
        >
          visit
        </Link>
        <Link
          href={`/users/${user}/${feed.title}`}
          className="rounded-xl border-2 border-blue-500 p-2 text-sm capitalize text-blue-600"
        >
          edit
        </Link>
      </div>
    </div>
  );
};

export default FeedItem;
