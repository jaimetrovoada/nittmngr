import { getClasses } from "@/lib/utils";

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

interface Props {
  variant?: "primary" | "secondary";
}

const Button = <C extends React.ElementType = "button">({
  variant = "primary",
  as,
  children,
  ...props
}: PolymorphicComponentProp<C, Props>) => {
  const Component = as || "button";
  return (
    <Component
      {...props}
      className={getClasses("rounded-xl p-2 text-sm capitalize", {
        "bg-blue-500 text-white disabled:cursor-not-allowed disabled:bg-gray-700 aria-disabled:cursor-not-allowed aria-disabled:border-gray-400":
          variant === "primary",
        "border-2 border-blue-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-slate-400 aria-disabled:cursor-not-allowed aria-disabled:border-gray-200 aria-disabled:text-slate-400":
          variant === "secondary",
      })}
    >
      {children}
    </Component>
  );
};

export default Button;
