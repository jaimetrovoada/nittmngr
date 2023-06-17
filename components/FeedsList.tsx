import { UserFeedsResponse } from "@/@types";
import FeedItem from "./FeedItem";

interface Props {
  feeds: UserFeedsResponse[] | null;
  user: string;
}

const FeedsList = ({ feeds, user }: Props) => {
  if (!feeds || !feeds.length)
    return (
      <>
        <p>No Feeds Found</p>
      </>
    );

  return (
    <div className=" grid grid-cols-1 gap-4 md:w-full md:grid-cols-2 lg:grid-cols-3">
      {feeds.map((feed, index) => {
        return <FeedItem key={index} feed={feed} user={user} />;
      })}
    </div>
  );
};

export default FeedsList;
