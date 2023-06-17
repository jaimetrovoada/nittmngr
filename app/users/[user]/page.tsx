import Container from "@/components/Container";
import FeedsForm from "@/components/FeedsForm";
import FeedsList from "@/components/FeedsList";
import { getUserFeeds } from "@/lib/api";

interface Props {
  params: {
    user: string;
  };
}

const Page = async ({ params }: Props) => {
  const user = params.user;
  const [feeds, _] = await getUserFeeds(user);
  return (
    <Container className="flex flex-col gap-3">
      <FeedsForm username={user} feeds={feeds} />
      <FeedsList feeds={feeds} user={user} />
    </Container>
  );
};

export default Page;
