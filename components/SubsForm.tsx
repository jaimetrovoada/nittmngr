"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { getClasses } from "@/lib/utils";

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

    const res = await fetch(`/api/feeds/${params.feed}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subs: [...list, input],
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

  const isValid = validateInput(input);

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
          "p-2 border border-gray-400 focus-visible:outline-none",
          {
            "border-red-600": input && !isValid,
          }
        )}
        pattern="^@?(\w){1,15}$"
        placeholder="username"
      />
      {input && !isValid && <p className="text-red-600">invalid username</p>}
      <button
        type="submit"
        className="capitalize text-sm bg-blue-400 text-white border shadow-md p-2 rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!isValid}
      >
        add
      </button>
    </form>
  );
};

export default SubsForm;
