"use client";
import React, { useState } from "react";

interface Props {
  list: string[];
}

const FeedsForm = ({ list }: Props) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");

    const res = await fetch("/api/feeds/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        list: [...list, input],
      }),
    });
    console.log({ res });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-w-md border border-gray-200 shadow-md p-4"
    >
      <input
        type="text"
        onChange={handleInput}
        value={input}
        className="p-2 border border-gray-400"
      />
      <button
        type="submit"
        className="capitalize font-semibold bg-blue-400 text-white border shadow-md p-2 rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!input}
      >
        create feed
      </button>
    </form>
  );
};

export default FeedsForm;
