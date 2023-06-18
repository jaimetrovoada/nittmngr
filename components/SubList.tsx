"use client";
import React, { useEffect, useState } from "react";
import { createNitterLink } from "../lib";
import ListItem from "./ListItem";
import SubsForm from "./SubsForm";
import { useRouter } from "next/navigation";
import { removeFeedSubscription, deleteFeed } from "@/lib/api";
import { UserFeedsResponse } from "@/@types";

interface Props {
  feed: UserFeedsResponse;
  username: string;
}

const SubList = ({ feed, username }: Props) => {
  const [list, setList] = useState<string[]>(feed.subscriptions || []);
  const [url, setUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    const url = createNitterLink(list, false);
    setUrl(url);
  }, [list]);

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
    <section className="mx-auto flex w-full max-w-lg flex-col gap-4">
      <SubsForm list={list} setList={setList} feedId={feed.id} />
      <div className="mx-auto flex w-full max-w-md flex-col gap-2 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg">Users in this Feed</p>
          {feed.isNsfw && <p className="text-sm">(NSFW)</p>}
        </div>
        <ul>
          {list?.map((item, index) => (
            <ListItem key={index} name={item} deleteItem={deleteItem} />
          ))}
        </ul>
        <div className="flex flex-row items-center justify-between">
          <a
            href={list.length > 0 ? url : ""}
            aria-disabled={list.length === 0}
            onClick={(e) => {
              if (list.length === 0) {
                e.preventDefault();
              }
            }}
            target="_blank"
            rel="noreferrer"
            className="w-fit rounded-xl border bg-blue-400 p-2 text-sm capitalize text-white shadow-md aria-disabled:cursor-not-allowed aria-disabled:bg-gray-400"
          >
            visit
          </a>
          <button
            onClick={removeFeed}
            className="rounded-xl border border-red-400 p-2 text-sm capitalize text-red-600"
          >
            delete feed
          </button>
        </div>
      </div>
    </section>
  );
};

export default SubList;
