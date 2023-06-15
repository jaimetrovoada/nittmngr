"use client";
import { createNitterLink } from "@/lib";
import { useContext, useEffect, useState } from "react";
import { SelectContext } from "./Select/SelectProvider";
import { Feed } from "@/@types";

interface Props {
  feedName: string;
}

const FeedItem = ({ feedName }: Props) => {
  const { selectedOption } = useContext(SelectContext);
  const [subs, setSubs] = useState<Feed>();
  useEffect(() => {
    fetch(`/api/feeds/${feedName}`)
      .then((res) => res.json())
      .then(setSubs);
  }, [feedName]);
  console.log({ subs });
  const url = createNitterLink(subs?.subs || [], selectedOption);
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 shadow-md">
      <div>
        <p className="text-3xl font-semibold capitalize">{feedName}</p>
      </div>
      <div className="flex flex-row justify-between">
        <a
          href={subs && subs?.subs?.length > 0 ? url : ""}
          aria-disabled={subs?.subs?.length === 0}
          onClick={(e) => {
            if (subs?.subs?.length === 0) {
              e.preventDefault();
            }
          }}
          target="_blank"
          rel="noreferrer"
          className="w-fit rounded-xl border bg-blue-400 p-2 font-semibold capitalize text-white shadow-md aria-disabled:cursor-not-allowed aria-disabled:bg-gray-400"
        >
          visit
        </a>
        <a
          href={`/feeds/${feedName}`}
          className="w-fit rounded-xl border border-blue-600 p-2 font-semibold capitalize text-gray-800 aria-disabled:cursor-not-allowed aria-disabled:bg-gray-400"
        >
          edit
        </a>
      </div>
    </div>
  );
};

export default FeedItem;
