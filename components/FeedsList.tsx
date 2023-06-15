import { Feeds } from "@/@types";
import FeedItem from "./FeedItem";

interface Props {
  feeds: Feeds;
}

const FeedsList = ({ feeds }: Props) => {
  return (
    <div className=" grid grid-cols-1 gap-4 md:w-full md:grid-cols-2 lg:grid-cols-3">
      {feeds.map((feed, index) => {
        return <FeedItem key={index} feedName={feed.name} />;
      })}
    </div>
  );
};

export default FeedsList;
