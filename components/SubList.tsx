"use client";
import React, { useEffect, useState } from "react";
import { createNitterLink } from "../lib";
import ListItem from "./ListItem";
import SubsForm from "./SubsForm";

interface Props {
  subs: string[];
}

const SubList = ({ subs }: Props) => {
  const [list, setList] = useState<string[]>(subs);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const url = createNitterLink(list);
    setUrl(url);
  }, [list]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xl font-semibold">SubList</p>
        <ul className="list-disc">
          {list.map((item, index) => (
            <ListItem key={index} name={item} />
          ))}
        </ul>
      </div>
      <div>
        <p>add new sub (provide username)</p>
        <SubsForm list={list} setList={setList} />
      </div>
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
    </div>
  );
};

export default SubList;