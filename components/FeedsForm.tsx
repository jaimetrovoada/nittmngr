"use client";
import { Feeds } from "@/@types";
import React, { useState } from "react";

interface Props {
  feeds: Feeds;
}

const FeedsForm = ({ feeds }: Props) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const feed = {
      name: input,
      subs: [],
    };

    const res = await fetch("/api/feeds/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feeds: [...feeds, feed],
      }),
    });

    console.log({ res });
    if (res.ok) {
      setInput("");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-md flex-col gap-2 border border-gray-200 p-4 shadow-md"
    >
      <input
        type="text"
        onChange={handleInput}
        value={input}
        className="border border-gray-400 p-2"
      />
      <button
        type="submit"
        className="rounded-xl border bg-blue-400 p-2 font-semibold capitalize text-white shadow-md disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={!input}
      >
        create feed
      </button>
    </form>
  );
};

export default FeedsForm;
