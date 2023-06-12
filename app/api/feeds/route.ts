import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  console.log({ body });

  cookies().set("feeds", JSON.stringify(body.list));
  return new Response("ok");
}
