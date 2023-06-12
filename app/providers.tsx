import React from "react";
import SelectProvider from "@/components/Select/SelectProvider";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return <SelectProvider>{children}</SelectProvider>;
};

export default Providers;
