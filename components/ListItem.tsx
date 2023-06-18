interface Props {
  name: string;
  deleteItem: (name: string) => void;
}

const ListItem = ({ name, deleteItem }: Props) => {
  return (
    <li className="flex flex-row items-center justify-between border-b border-b-gray-800 p-2 text-sm hover:bg-zinc-900/20 lg:text-base">
      {name}
      <button onClick={() => deleteItem(name)} className="p-2 text-red-600">
        X
      </button>
    </li>
  );
};

export default ListItem;
