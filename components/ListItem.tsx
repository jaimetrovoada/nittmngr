interface Props {
  name: string;
  deleteItem: (name: string) => void;
}

const ListItem = ({ name, deleteItem }: Props) => {
  return (
    <li className="p-2 border-b border-b-gray-100 hover:bg-gray-50 flex flex-row justify-between items-center text-sm lg:text-base">
      {name}
      <button onClick={() => deleteItem(name)} className="text-red-600 p-2">
        X
      </button>
    </li>
  );
};

export default ListItem;
