import Link from "next/link";

interface Props {
  name: string;
  url: string;
  deleteItem: (name: string) => void;
}

const ListItem = ({ name, deleteItem, url }: Props) => {
  return (
    <li className="group flex flex-row items-center justify-between border-b border-b-gray-800 p-2 text-sm hover:bg-zinc-900/20 lg:text-base">
      <Link href={url} className="underline-offset-4 group-hover:underline">
        @{name}
      </Link>
      <button
        onClick={() => deleteItem(name)}
        className="ml-auto p-2 text-red-600"
      >
        X
      </button>
    </li>
  );
};

export default ListItem;
