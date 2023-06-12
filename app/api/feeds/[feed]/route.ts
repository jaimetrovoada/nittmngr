import { cookies } from "next/headers";

interface Params {
  feed: string;
}

export async function POST(request: Request, context: { params: Params }) {
  const body = await request.json();
  console.log({ body });

  cookies().set(context.params.feed, JSON.stringify(body.subs));
  return new Response("ok");
}

export async function PUT(request: Request, context: { params: any }) {
  const body = await request.json();
  console.log({ body });

  cookies().set(context.params.feed, JSON.stringify(body.subs));
  return new Response("ok");
}

export async function DELETE(request: Request, context: { params: any }) {
  cookies().delete(context.params.feed);
  const feeds = cookies().get("feeds");
  const feedsArr = JSON.parse(feeds?.value || "[]");
  cookies().set(
    "feeds",
    JSON.stringify(feedsArr.filter((f: string) => f !== context.params.feed))
  );

  return new Response("ok");
}
