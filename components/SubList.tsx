"use client";
import React, { useEffect, useState, useContext } from "react";
import { createNitterLink } from "../lib";
import ListItem from "./ListItem";
import SubsForm from "./SubsForm";
import { useRouter } from "next/navigation";
import { SelectContext } from "./Select/SelectProvider";

interface Props {
  subs: string[];
  feedName: string;
}

const SubList = ({ subs, feedName }: Props) => {
  const [list, setList] = useState<string[]>(subs);
  const [url, setUrl] = useState("");
  const router = useRouter();
  const { selectedOption } = useContext(SelectContext);

  useEffect(() => {
    const url = createNitterLink(list, selectedOption);
    setUrl(url);
  }, [list, selectedOption]);

  const deleteItem = async (name: string) => {
    const res = await fetch(`/api/feeds/${feedName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subs: list.filter((item) => item !== name),
      }),
    });
    if (res.ok) {
      setList((prev) => prev.filter((item) => item !== name));
    }
  };

  const deleteFeed = async () => {
    const res = await fetch(`/api/feeds/${feedName}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-lg w-full mx-auto">
      <div>
        <p className="text-xl font-semibold">SubList</p>
        <ul className="list-disc">
          {list.map((item, index) => (
            <ListItem key={index} name={item} deleteItem={deleteItem} />
          ))}
        </ul>
      </div>
      <div>
        <p>add new sub</p>
        <SubsForm list={list} setList={setList} />
      </div>
      <div className="flex flex-row justify-between items-center">
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
          className="capitalize font-semibold bg-blue-400 text-white border shadow-md p-2 rounded-xl w-fit aria-disabled:bg-gray-400 aria-disabled:cursor-not-allowed"
        >
          visit
        </a>
        <button
          onClick={deleteFeed}
          className="border border-red-400 p-2 rounded-xl"
        >
          delete feed
        </button>
      </div>
    </div>
  );
};

export default SubList;
