"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { getClasses } from "@/lib/utils";
import { addFeedSubscription } from "@/lib/api";

interface Props {
  list: string[];
  setList: React.Dispatch<React.SetStateAction<string[]>>;
  feedId: string;
}

const SubsForm = ({ setList, list, feedId }: Props) => {
  const params = useParams();
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const username = params.user;
  const feed = params.feed;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");

    let subs: string[] = [];
    if (input.includes(",")) {
      const trim = input.trim();
      subs = trim.split(",").map((item) => item.trim());
    } else {
      subs = [input];
    }

    for (let i = 0; i < subs.length; i++) {
      if (!validateInput(subs[i])) {
        setIsValid(false);
        return;
      }
    }

    console.log({ subs, isValid });
    if (isValid) {
      const [_, err] = await addFeedSubscription(username, feed, {
        feedId: feedId,
        subs: subs,
      });

      if (!err) {
        setList((prev) => [...prev, ...subs]);
      }
    }
  };

  const validateInput = (input: string) => {
    const regex = /^@?(\w){1,15}$/;

    return regex.test(input);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        onChange={handleInput}
        value={input}
        className={getClasses(
          "border border-gray-400 p-2 focus-visible:outline-none",
          {
            "border-red-600": input && isValid === false,
          }
        )}
        placeholder="username"
      />
      {input && isValid === false && (
        <p className="text-red-600">invalid username</p>
      )}
      <button
        type="submit"
        className="rounded-xl border bg-blue-400 p-2 text-sm capitalize text-white shadow-md disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={!input}
      >
        add
      </button>
    </form>
  );
};

export default SubsForm;
