import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  user: string;
}

export async function GET(request: Request, context: { params: Params }) {
  const { user: username } = context.params;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      Feeds: true,
    },
  });
  console.log({ user });
  const feeds = user?.Feeds;

  return NextResponse.json(feeds);
}
