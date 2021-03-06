import Head from "next/head";
import Nav from "../../components/organisms/Nav";
import FlashcardCategories from "../../components/molecules/FlashcardCategories";

export default function Page() {
  return (
    <>
      <Head>
        <title>Italian Reference</title>
      </Head>
      <Nav />
      <main>
        <FlashcardCategories />
      </main>
    </>
  );
}
