import Head from "next/head";
import Nav from "../../../components/organisms/Nav";
import ConjugationSelections from "../../../components/organisms/ConjugationSelections";

export default function Page() {
  return (
    <>
      <Head>
        <title>Italian Reference</title>
      </Head>
      <Nav />
      <main>
        <ConjugationSelections />
      </main>
    </>
  );
}
