import { cookies } from "next/headers";
import { createNitterLink } from "@/lib";

interface Props {
  feeds: string[];
}

const FeedsList = ({ feeds }: Props) => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:w-full">
      {feeds.map((item, index) => {
        const list = cookies().get(item);
        const listArr = list?.value?.split(",") || [];

        const url = createNitterLink(listArr);
        return (
          <div
            className="p-4 rounded-xl border border-gray-200 shadow-md flex flex-col gap-2"
            key={index}
          >
            <div>
              <p className="font-semibold text-3xl capitalize">{item}</p>
              <p className="text-xs text-gray-500">{listArr.join(", ")}</p>
            </div>
            <div className="flex flex-row justify-between">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="capitalize font-semibold bg-blue-600 text-white border p-2 rounded-xl w-fit aria-disabled:bg-gray-400 aria-disabled:cursor-not-allowed"
              >
                visit
              </a>
              <a
                href={`/feeds/${item}`}
                target="_blank"
                rel="noreferrer"
                className="capitalize font-semibold border-blue-600 text-gray-800 border p-2 rounded-xl w-fit aria-disabled:bg-gray-400 aria-disabled:cursor-not-allowed"
              >
                edit
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeedsList;
