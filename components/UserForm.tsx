"use client";
import { createUser } from "@/lib/api";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const UserForm = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [_, error] = await createUser(input);
    if (error) {
      console.log({ error });
      setError(error.message || "something went wrong");
    } else {
      router.replace(`/users/${input}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-400 p-2"
          placeholder="username"
        />
      </div>
      {error && error.length ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : null}
      <button type="submit">submit</button>
    </form>
  );
};

export default UserForm;
