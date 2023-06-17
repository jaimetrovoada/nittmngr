"use client";
import React, { useEffect, useState, useContext } from "react";
import { createNitterLink } from "../lib";
import ListItem from "./ListItem";
import SubsForm from "./SubsForm";
import { useRouter } from "next/navigation";
import { SelectContext } from "./Select/SelectProvider";
import { removeFeedSubscription, deleteFeed } from "@/lib/api";

interface Props {
  subs: string[] | undefined;
  feedName: string;
  feedId: string;
  username: string;
}

const SubList = ({ subs, feedName, feedId, username }: Props) => {
  const [list, setList] = useState<string[]>(subs || []);
  const [url, setUrl] = useState("");
  const router = useRouter();
  const { selectedOption } = useContext(SelectContext);

  useEffect(() => {
    const url = createNitterLink(list, selectedOption);
    setUrl(url);
  }, [list, selectedOption]);

  const deleteItem = async (name: string) => {
    const newSubs = list.filter((item) => item !== name);
    const [ok, err] = await removeFeedSubscription(username, feedName, {
      feedId: feedId,
      subs: newSubs,
    });
    if (ok) {
      setList((prev) => prev.filter((item) => item !== name));
    }
  };

  const removeFeed = async () => {
    const [ok, err] = await deleteFeed(username, feedId);
    if (ok) {
      router.push(`/users/${username}`);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-lg flex-col gap-4">
      <SubsForm list={list} setList={setList} feedId={feedId} />
      <div className="mx-auto flex w-full max-w-md flex-col gap-2 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <p className="text-lg">Users in this Feed</p>
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
