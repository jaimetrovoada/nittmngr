import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = ({ children, className, ...props }: Props) => {
  return (
    <main
      className={twMerge("flex-1 container p-4 lg:px-0 mx-auto", className)}
      {...props}
    >
      {children}
    </main>
  );
};

export default Container;
