interface Props {
  name: string;
  deleteItem: (name: string) => void;
}

const ListItem = ({ name, deleteItem }: Props) => {
  return (
    <li className="list-inside py-4 px-2 border-b border-b-gray-100 hover:bg-gray-50 flex flex-row justify-between items-center">
      {name}
      <button onClick={() => deleteItem(name)} className="text-red-600 p-2">
        x
      </button>
    </li>
  );
};

export default ListItem;
