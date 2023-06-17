import { SubList } from "@/components";
import Container from "@/components/Container";
import { getFeed } from "@/lib/api";

interface Props {
  params: {
    user: string;
    feed: string;
  };
}

const Page = async ({ params }: Props) => {
  const [feed, err] = await getFeed(params.user, params.feed);
  return (
    <Container className="flex flex-col gap-4">
      <SubList
        subs={feed?.subscriptions}
        feedName={params.feed}
        feedId={feed?.id as string}
        username={params.user}
      />
    </Container>
  );
};

export default Page;