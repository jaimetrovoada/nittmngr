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
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-lg capitalize">add user</p>
        <SubsForm list={list} setList={setList} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg">Users in this Feed</p>
        <ul>
          {list?.map((item, index) => (
            <ListItem key={index} name={item} deleteItem={deleteItem} />
          ))}
        </ul>
      </div>
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
          onClick={deleteFeed}
          className="rounded-xl border border-red-400 p-2 text-sm capitalize"
        >
          delete feed
        </button>
      </div>
    </div>
  );
};

export default SubList;
