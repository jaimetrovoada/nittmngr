import { SubList } from "@/components";
import { cookies } from "next/headers";
import Container from "@/components/Container";

interface Props {
  params: {
    sub: string;
  };
}

const Page = ({ params }: Props) => {
  const list = cookies().get(params.sub);
  const listArr = list?.value?.split(",") || [];
  return (
    <Container className="flex flex-col gap-4">
      <SubList subs={listArr} />
    </Container>
  );
};

export default Page;
