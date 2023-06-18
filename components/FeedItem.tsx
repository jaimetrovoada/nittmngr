"use client";
import { createNitterLink } from "@/lib";
import { UserFeedsResponse } from "@/@types";
import Link from "next/link";
import Button from "./Button";

interface Props {
  feed: UserFeedsResponse;
  user: string;
}

const FeedItem = ({ feed, user }: Props) => {
  const url = createNitterLink(feed.subscriptions || [], feed.isNsfw);

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-600/50 bg-neutral-950 p-4 shadow-sm">
      <div>
        <p className="text-3xl font-semibold capitalize">{feed.title}</p>
      </div>
      <div className="flex flex-row justify-between">
        <Button
          as={Link}
          href={feed.subscriptions && feed.subscriptions.length > 0 ? url : ""}
          aria-disabled={feed.subscriptions && feed.subscriptions.length === 0}
          onClick={(e: React.MouseEvent) => {
            if (feed.subscriptions && feed.subscriptions.length === 0) {
              e.preventDefault();
            }
          }}
          target="_blank"
          rel="noreferrer"
        >
          visit
        </Button>
        <Button
          as={Link}
          href={`/users/${user}/${feed.title}`}
          variant="secondary"
        >
          edit
        </Button>
      </div>
    </div>
  );
};

export default FeedItem;
