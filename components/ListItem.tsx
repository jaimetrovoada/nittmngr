interface Props {
  name: string;
}

const ListItem = ({ name }: Props) => {
  return (
    <li className="list-inside py-4 px-2 border-b border-b-gray-100 hover:bg-gray-50">
      {name}
    </li>
  );
};

export default ListItem;
