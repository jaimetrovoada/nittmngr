import { getClasses } from "@/lib/utils";
type Props = React.HTMLAttributes<HTMLFormElement>;

const Form = ({ ...props }: Props) => {
  return (
    <form
      {...props}
      className={getClasses(
        "mx-auto flex w-full flex-col gap-6 rounded-lg border border-gray-600/50 bg-zinc-950 p-4 shadow-md",
        props.className
      )}
    >
      {props.children}
    </form>
  );
};

export default Form;
