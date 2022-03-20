import Head from "next/head";
import Nav from "../../../../components/organisms/Nav";
import VerbQuizzerProvider from "../../../../providers/VerbQuizzerProvider";
import { QuizServiceFactory } from "../../../../services/QuizService";
import FlashcardInfinitiveToConjugation from "../../../../components/organisms/FlashcardInfinitiveToConjugation";

export default function Page(...args) {
  return (
    <VerbQuizzerProvider.Provider value={QuizServiceFactory()}>
      <Head>
        <title>Italian Reference</title>
      </Head>
      <Nav />
      <main>
        <FlashcardInfinitiveToConjugation />
      </main>
    </VerbQuizzerProvider.Provider>
  );
}
