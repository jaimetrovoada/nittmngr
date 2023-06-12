import FeedsList from "@/components/FeedsList";
import FeedsForm from "@/components/FeedsForm";
import { cookies } from "next/headers";
import Container from "@/components/Container";

export default function Home() {
  const feeds = cookies().get("feeds");
  const feedsArr = JSON.parse(feeds?.value || "[]");
  console.log({ feedsArr });
  return (
    <Container>
      <p className="text-xl font-semibold mb-8">My Feeds</p>
      <section className="flex flex-col gap-4 md:flex-row">
        <FeedsForm list={feedsArr} />
        <FeedsList feeds={feedsArr} />
      </section>
    </Container>
  );
}
