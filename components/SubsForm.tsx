"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";

interface Props {
  list: string[];
  setList: React.Dispatch<React.SetStateAction<string[]>>;
}

const SubsForm = ({ setList, list }: Props) => {
  const params = useParams();
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");

    const res = await fetch("/api/subs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listName: params.sub,
        listItems: [...list, input],
      }),
    });
    if (res.ok) {
      setList((prev) => [...prev, input]);
    }
  };

  const validateInput = (input: string) => {
    const regex = /^@?(\w){1,15}$/;

    return regex.test(input);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = validateInput(e.target.value);
    console.log({ isValid });
    if (isValid) {
      setInput(e.target.value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        onChange={handleInput}
        value={input}
        className="p-2 border border-gray-400"
        pattern="^@?(\w){1,15}$"
        placeholder="Write a username"
      />
      <button
        type="submit"
        className="capitalize font-semibold bg-blue-400 text-white border shadow-md p-2 rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!input}
      >
        add
      </button>
    </form>
  );
};

export default SubsForm;
