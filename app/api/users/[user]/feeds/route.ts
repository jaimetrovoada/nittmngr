import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  user: string;
}

export async function POST(request: Request, context: { params: Params }) {
  const { user: username } = context.params;

  const reqBody = await request.json();

  const newFeed = await prisma.feed.create({
    data: {
      title: reqBody.feed,
      user: {
        connect: {
          username: username,
        },
      },
    },
  });

  console.log({ newFeed });

  return NextResponse.json(newFeed);
}
