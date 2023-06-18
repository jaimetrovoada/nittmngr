"use client";
import React, { useEffect, useState } from "react";
import { createNitterLink } from "../lib";
import ListItem from "./ListItem";
import SubsForm from "./SubsForm";
import { useRouter } from "next/navigation";
import { removeFeedSubscription, deleteFeed } from "@/lib/api";
import { UserFeedsResponse } from "@/@types";
import Button from "./Button";
import Link from "next/link";

interface Props {
  feed: UserFeedsResponse;
  username: string;
}

const SubList = ({ feed, username }: Props) => {
  const [list, setList] = useState<string[]>(feed.subscriptions || []);
  const [url, setUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    const url = createNitterLink(list, feed.isNsfw);
    setUrl(url);
  }, [list, feed.isNsfw]);

  const deleteItem = async (name: string) => {
    const newSubs = list.filter((item) => item !== name);
    const [ok, err] = await removeFeedSubscription(username, feed.title, {
      feedId: feed.id,
      subs: newSubs,
    });
    if (ok) {
      setList((prev) => prev.filter((item) => item !== name));
    }
  };

  const removeFeed = async () => {
    const [ok, err] = await deleteFeed(username, feed.id);
    if (ok) {
      router.push(`/users/${username}`);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-lg flex-col gap-4 ">
      <SubsForm list={list} setList={setList} feedId={feed.id} />
      <div className="flex flex-col gap-2 rounded-lg border border-gray-600/50 bg-neutral-950 p-4 shadow-sm">
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg">Users in this Feed</p>
          {feed.isNsfw && <p className="text-xs text-slate-300/50">(NSFW)</p>}
        </div>
        <ul className="">
          {list?.map((item, index) => (
            <ListItem key={index} name={item} deleteItem={deleteItem} />
          ))}
        </ul>
        <div className="flex flex-row items-center justify-between">
          <Button
            as={Link}
            href={list.length > 0 ? url : ""}
            aria-disabled={list.length === 0}
            onClick={(e: React.MouseEvent) => {
              if (list.length === 0) {
                e.preventDefault();
              }
            }}
            target="_blank"
            rel="noreferrer"
          >
            visit
          </Button>
          <Button
            onClick={removeFeed}
            variant="secondary"
            className="border-red-500 text-red-500"
          >
            delete feed
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SubList;
