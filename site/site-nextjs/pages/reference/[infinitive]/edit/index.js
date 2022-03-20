import Head from "next/head";
import { useRouter } from "next/router";
import Nav from "../../../../components/organisms/Nav";
import ReferenceVerbSingleEdit from "../../../../components/organisms/ReferenceVerbSingleEdit";

export default function Page() {
  const router = useRouter();

  const { infinitive } = router.query;

  return (
    <>
      <Head>
        <title>{infinitive} - Reference</title>
      </Head>
      <Nav />
      <main className="pb-60">
        <ReferenceVerbSingleEdit verbInfinitive={infinitive} />
      </main>
    </>
  );
}
