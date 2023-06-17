import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username } = await request.json();
  try {
    await prisma.user.create({
      data: {
        username,
      },
    });
    return NextResponse.json({ status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            error: "Username already taken",
          },
          { status: 409 }
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
