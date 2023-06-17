"use client";
import { createUser } from "@/lib/api";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserForm = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [data, error] = await createUser(input);
    if (error) {
      setError(error.message || "something went wrong");
      return;
    }
    if (data.status === 409) {
      setError("Username already taken");
      return;
    }
    if (data.ok) {
      router.replace(`/users/${input}`);
      return;
    }
    return;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-md"
    >
      <p className="text-xl font-semibold">Login/Register</p>
      <div className="flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="rounded border border-gray-400 p-2"
          placeholder="username"
        />
      </div>
      {error && error.length ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : null}
      <div className="flex flex-row items-center justify-between">
        <button
          type="submit"
          className="rounded-xl bg-blue-500 p-2 text-sm capitalize text-white disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={!input}
        >
          Register
        </button>
        <Link
          href={input && `/users/${input}`}
          aria-disabled={!input}
          onClick={(e) => {
            if (!input) {
              e.preventDefault();
            }
          }}
          className="rounded-xl border-2 border-blue-500 p-2 text-sm capitalize aria-disabled:cursor-not-allowed aria-disabled:border-gray-400 aria-disabled:text-gray-600"
        >
          View User
        </Link>
      </div>
    </form>
  );
};

export default UserForm;
