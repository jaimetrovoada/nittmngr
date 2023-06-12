"use client";
import { createNitterLink } from "@/lib";
import { useContext, useEffect, useState } from "react";
import { SelectContext } from "./Select/SelectProvider";

interface Props {
  feedName: string;
}

const FeedItem = ({ feedName }: Props) => {
  const { selectedOption } = useContext(SelectContext);
  const [subs, setSubs] = useState<string[]>([]);
  useEffect(() => {
    fetch(`/api/feeds/${feedName}`)
      .then((res) => res.json())
      .then(setSubs);
  }, [feedName]);
  console.log({ subs });
  const url = createNitterLink(subs || [], selectedOption);
  return (
    <div className="p-4 rounded-xl border border-gray-200 shadow-md flex flex-col gap-2">
      <div>
        <p className="font-semibold text-3xl capitalize">{feedName}</p>
      </div>
      <div className="flex flex-row justify-between">
        <a
          href={subs?.length > 0 ? url : ""}
          aria-disabled={subs?.length === 0}
          onClick={(e) => {
            if (subs?.length === 0) {
              e.preventDefault();
            }
          }}
          target="_blank"
          rel="noreferrer"
          className="capitalize font-semibold bg-blue-400 text-white border shadow-md p-2 rounded-xl w-fit aria-disabled:bg-gray-400 aria-disabled:cursor-not-allowed"
        >
          visit
        </a>
        <a
          href={`/feeds/${feedName}`}
          className="capitalize font-semibold border-blue-600 text-gray-800 border p-2 rounded-xl w-fit aria-disabled:bg-gray-400 aria-disabled:cursor-not-allowed"
        >
          edit
        </a>
      </div>
    </div>
  );
};

export default FeedItem;
