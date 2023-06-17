import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  user: string;
  feed: string;
}

export async function GET(request: Request, context: { params: Params }) {
  const { feed: feedname, user: username } = context.params;

  console.log({ feedname });
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      Feeds: true,
    },
  });

  const feed = user?.Feeds.find((feed) => feed.title === feedname);

  console.log({ feed });

  return NextResponse.json(feed);
}

export async function POST(request: Request) {
  const reqBody = await request.json();
  const subscriptions = reqBody.subs;
  const feedId = reqBody.feedId;
  console.log({ reqBody });

  const newSubscription = await prisma.feed.update({
    where: {
      id: feedId,
    },
    data: {
      subscriptions: {
        push: subscriptions,
      },
    },
  });

  console.log({ newSubscription });

  return NextResponse.json(newSubscription);
}

export async function DELETE(request: Request, context: { params: Params }) {
  const feedId = context.params.feed;

  await prisma.feed.delete({
    where: {
      id: feedId,
    },
  });

  return NextResponse.json(null);
}

export async function PUT(request: Request) {
  const reqBody = await request.json();
  const feedId = reqBody.feedId;
  const subs = reqBody.subs;

  await prisma.feed.update({
    where: {
      id: feedId,
    },
    data: {
      subscriptions: {
        set: subs,
      },
    },
  });
  return NextResponse.json(null);
}
