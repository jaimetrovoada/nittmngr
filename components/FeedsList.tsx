import FeedItem from "./FeedItem";

interface Props {
  feeds: string[];
}

const FeedsList = ({ feeds }: Props) => {

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:w-full">
      {feeds.map((item, index) => {
        return (
          <FeedItem
            key={index}
            feedName={item}
          />
        );
      })}
    </div>
  );
};

export default FeedsList;
