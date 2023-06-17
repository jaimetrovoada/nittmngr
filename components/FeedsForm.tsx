"use client";
import React, { useState } from "react";
import { createUserFeed } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Props {
  username: string;
}

const FeedsForm = ({ username }: Props) => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [_, err] = await createUserFeed(username, input);
    if (err) {
      console.log({ err });
      return;
    } else {
      router.refresh();
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
