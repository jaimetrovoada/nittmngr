"use client";
import { createUser } from "@/lib/api";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Form from "./Form";
import Button from "./Button";

const UserForm = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const [data, error] = await createUser(input);

    if (data || error) {
      setIsLoading(false);
    }

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
    <Form onSubmit={handleSubmit}>
      <p className="text-xl font-semibold">Login/Register</p>
      <div className="flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="rounded border border-gray-400 bg-zinc-900 p-2 placeholder:capitalize"
          placeholder="username"
        />
      </div>
      {error && error.length ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : null}
      <div className="flex flex-row items-center justify-between">
        <Button type="submit" disabled={!input || isLoading}>
          {isLoading ? "Waiting..." : "Register"}
        </Button>
        <Button
          as={Link}
          href={input && `/users/${input}`}
          aria-disabled={!input || isLoading}
          onClick={(e: React.MouseEvent) => {
            if (!input || isLoading) {
              e.preventDefault();
            }
          }}
          variant="secondary"
        >
          View User
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;
