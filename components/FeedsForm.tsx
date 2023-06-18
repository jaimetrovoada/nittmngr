"use client";
import React, { useState } from "react";
import { createUserFeed } from "@/lib/api";
import { useRouter } from "next/navigation";
import { UserFeedsResponse } from "@/@types";
import Form from "./Form";
import Button from "./Button";

interface Props {
  username: string;
  feeds: UserFeedsResponse[] | null;
}

const FeedsForm = ({ username, feeds }: Props) => {
  const [input, setInput] = useState("");
  const [isNsfw, setIsNsfw] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const feedsNames = feeds?.map((feed) => feed.title.toLowerCase());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (feedsNames?.includes(input.toLowerCase())) {
      console.log("feed already exists");
      setError("feed already exists");
      return;
    }

    const [_, err] = await createUserFeed(username, {
      feed: input,
      isNsfw: isNsfw,
    });
    if (err) {
      console.log({ err });
      return;
    } else {
      router.refresh();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <p className="text-xl font-semibold">New Feed</p>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="rounded border border-gray-400 bg-zinc-900 p-2 placeholder:capitalize"
          placeholder="feed name"
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex flex-row gap-2">
        <label htmlFor="nsfw">Is NSFW</label>
        <input
          type="checkbox"
          name="nsfw"
          id="nsfw"
          onChange={() => setIsNsfw((prev) => !prev)}
          checked={isNsfw}
        />
      </div>
      <Button type="submit" disabled={!input}>
        create feed
      </Button>
    </Form>
  );
};

export default FeedsForm;
