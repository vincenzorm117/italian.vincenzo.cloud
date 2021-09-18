import { useRouter } from "next/router";

import Head from "next/head";
import Nav from "../../../../components/organisms/Nav";
import ConjugationSelections from "../../../../components/organisms/ConjugationSelections";

export default function Page(...args) {
  const router = useRouter();

  // console.log(923, router.query.filters.split(","));

  return (
    <>
      <Head>
        <title>Italian Reference</title>
      </Head>
      <Nav />
      <main></main>
    </>
  );
}
