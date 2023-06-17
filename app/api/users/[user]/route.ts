import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  user: string;
}

export async function GET(request: Request, context: { params: Params }) {
  const { user: username } = context.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        Feeds: true,
      },
    });
    const feeds = user?.Feeds;

    return NextResponse.json(feeds);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2001") {
        return NextResponse.json(
          {
            error: "Username not found",
          },
          { status: 404 }
        );
      }
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
