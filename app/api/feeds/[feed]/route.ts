import { Feeds, Feed } from "@/@types";
import { cookies } from "next/headers";

interface Params {
  feed: string;
}

export async function GET(request: Request, context: { params: Params }) {
  const feeds = cookies().get("feeds");
  const feedsArr: Feeds = JSON.parse(feeds?.value || "[]");

  const feed = feedsArr.find((f) => f.name === context.params.feed);

  return new Response(JSON.stringify(feed));
}

export async function POST(request: Request, context: { params: Params }) {
  const body = await request.json();
  console.log({ body });
  const feeds = cookies().get("feeds");
  const feedsArr: Feeds = JSON.parse(feeds?.value || "[]");
  const toChange = feedsArr.find((f) => f.name === context.params.feed);
  const unchanged = feedsArr.filter((f) => f.name !== context.params.feed);
  if (toChange) {
    toChange.subs = body.subs;
  }
  const newFeeds = [...unchanged, toChange];

  cookies().set("feeds", JSON.stringify(newFeeds));
  return new Response("ok");
}

export async function PUT(request: Request, context: { params: Params }) {
  const body = await request.json();
  console.log({ body });
  const feeds = cookies().get("feeds");
  const feedsArr: Feeds = JSON.parse(feeds?.value || "[]");
  const toChange = feedsArr.find((f) => f.name === context.params.feed);
  const unchanged = feedsArr.filter((f) => f.name !== context.params.feed);
  if (toChange) {
    toChange.subs = body.subs;
  }
  const newFeeds = [...unchanged, toChange];

  cookies().set("feeds", JSON.stringify(newFeeds));
  return new Response("ok");
}

export async function DELETE(request: Request, context: { params: Params }) {
  const feeds = cookies().get("feeds");
  const feedsArr: Feeds = JSON.parse(feeds?.value || "[]");

  const newFeeds = feedsArr.filter((f) => f.name !== context.params.feed);

  cookies().set("feeds", JSON.stringify(newFeeds));

  return new Response("ok");
}
