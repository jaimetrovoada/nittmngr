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
    <>
      <FeedsForm username={user} />
      <FeedsList feeds={feeds} user={user} />
    </>
  );
};

export default Page;
