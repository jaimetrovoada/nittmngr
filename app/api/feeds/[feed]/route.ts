import { cookies } from "next/headers";

interface Params {
  feed: string;
}

export async function POST(request: Request, context: { params: Params }) {
  const body = await request.json();
  console.log({ body });

  cookies().set(context.params.feed, body.subs.join(","));
  return new Response("ok");
}

export async function PUT(request: Request, context: { params: any }) {
  const body = await request.json();
  console.log({ body });

  cookies().set(context.params.feed, body.subs.join(","));
  return new Response("ok");
}
