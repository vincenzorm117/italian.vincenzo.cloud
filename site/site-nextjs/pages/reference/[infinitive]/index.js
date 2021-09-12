import Head from "next/head";
import { useRouter } from "next/router";
import RoundButton from "../../../components/atoms/RoundButton";
import Nav from "../../../components/organisms/Nav";
import ReferenceVerbSingle from "../../../components/organisms/ReferenceVerbSingle";
import styles from "./styles.module.scss";

export default function Page() {
  const router = useRouter();

  const { infinitive } = router.query;

  return (
    <>
      <Head>
        <title>{infinitive} - Reference</title>
      </Head>
      <Nav />
      <main>
        <ReferenceVerbSingle verbInfinitive={infinitive} />
      </main>
    </>
  );
}
