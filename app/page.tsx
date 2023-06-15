import FeedsList from "@/components/FeedsList";
import FeedsForm from "@/components/FeedsForm";
import { cookies } from "next/headers";
import Container from "@/components/Container";
import { Feeds } from "@/@types";

export default function Home() {
  const feeds = cookies().get("feeds");
  const feedsArr: Feeds = JSON.parse(feeds?.value || "[]");
  console.log({ feedsArr });
  return (
    <Container>
      <p className="mb-8 text-xl font-semibold">My Feeds</p>
      <section className="flex flex-col gap-4 md:flex-row">
        <FeedsForm feeds={feedsArr} />
        <FeedsList feeds={feedsArr} />
      </section>
    </Container>
  );
}
