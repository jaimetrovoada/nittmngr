import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = ({ children, className, ...props }: Props) => {
  return (
    <main
      className={twMerge("container mx-auto flex-1 p-4 lg:px-0", className)}
      {...props}
    >
      {children}
    </main>
  );
};

export default Container;
