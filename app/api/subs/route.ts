import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  console.log({ body });

  cookies().set(body.listName, body.listItems.join(","));
  return new Response("ok");
}
