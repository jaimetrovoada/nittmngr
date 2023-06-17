import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  user: string;
  feed: string;
}

export async function GET(request: Request, context: { params: Params }) {
  const { feed: feedname, user: username } = context.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        Feeds: true,
      },
    });

    const feed = user?.Feeds.find((feed) => feed.title === feedname);

    return NextResponse.json(feed);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const reqBody = await request.json();
  const subscriptions = reqBody.subs;
  const feedId = reqBody.feedId;

  try {
    await prisma.feed.update({
      where: {
        id: feedId,
      },
      data: {
        subscriptions: {
          push: subscriptions,
        },
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: { params: Params }) {
  const feedId = context.params.feed;

  try {
    await prisma.feed.delete({
      where: {
        id: feedId,
      },
    });
    return NextResponse.json(null);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const reqBody = await request.json();
  const feedId = reqBody.feedId;
  const subs = reqBody.subs;

  try {
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}
