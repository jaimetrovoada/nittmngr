"use client";
import React, { useState } from "react";
import { createUserFeed } from "@/lib/api";
import { useRouter } from "next/navigation";
import { UserFeedsResponse } from "@/@types";

interface Props {
  username: string;
  feeds: UserFeedsResponse[] | null;
}

const FeedsForm = ({ username, feeds }: Props) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const feedsNames = feeds?.map((feed) => feed.title.toLowerCase());
  console.log({ feedsNames });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (feedsNames?.includes(input.toLowerCase())) {
      console.log("feed already exists");
      setError("feed already exists");
      return;
    }

    const [_, err] = await createUserFeed(username, input);
    if (err) {
      console.log({ err });
      return;
    } else {
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-md"
    >
      <p className="text-xl font-semibold">New Feed</p>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="rounded border border-gray-400 p-2"
          placeholder="feed name"
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button
        type="submit"
        className="rounded-xl bg-blue-500 p-2 text-sm capitalize text-white disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={!input}
      >
        create feed
      </button>
    </form>
  );
};

export default FeedsForm;
