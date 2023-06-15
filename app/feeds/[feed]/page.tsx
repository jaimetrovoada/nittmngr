import { SubList } from "@/components";
import { cookies } from "next/headers";
import Container from "@/components/Container";
import { Feeds } from "@/@types";

interface Props {
  params: {
    feed: string;
  };
}

const Page = ({ params }: Props) => {
  const feeds = cookies().get("feeds");
  const feedsArr: Feeds = JSON.parse(feeds?.value || "[]");

  const subs = feedsArr.find((feed) => {
    return feed.name === params.feed;
  })?.subs;
  console.log({ subs });

  return (
    <Container className="flex flex-col gap-4">
      <SubList subs={subs || []} feedName={params.feed} />
    </Container>
  );
};

export default Page;
