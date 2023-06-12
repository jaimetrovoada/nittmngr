import { SubList } from "@/components";
import { cookies } from "next/headers";
import Container from "@/components/Container";

interface Props {
  params: {
    feed: string;
  };
}

const Page = ({ params }: Props) => {
  const list = cookies().get(params.feed);
  const listArr = list?.value?.split(",") || [];
  return (
    <Container className="flex flex-col gap-4">
      <SubList subs={listArr} feedName={params.feed} />
    </Container>
  );
};

export default Page;
