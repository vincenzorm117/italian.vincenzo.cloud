import Head from "next/head";
import Nav from "../../components/organisms/Nav";
import ReferenceSearch from "../../components/organisms/ReferenceSearch";

export default function Page() {
  return (
    <>
      <Head>
        <title>Italian Reference</title>
      </Head>
      <Nav />
      <main>
        <ReferenceSearch />
      </main>
    </>
  );
}
