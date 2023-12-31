import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  user: string;
}

export async function POST(request: Request, context: { params: Params }) {
  const { user: username } = context.params;

  try {
    const reqBody = await request.json();
    console.log({ reqBody });

    await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        Feeds: {
          create: {
            title: reqBody.feed,
            isNsfw: reqBody.isNsfw,
          },
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
