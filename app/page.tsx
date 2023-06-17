import Container from "@/components/Container";
import UserForm from "@/components/UserForm";

export default async function Home() {
  return (
    <Container>
      <p className="mb-8 text-xl font-semibold">My Feeds</p>
      <section className="flex flex-col gap-4 md:flex-row">
        <UserForm />
      </section>
    </Container>
  );
}
