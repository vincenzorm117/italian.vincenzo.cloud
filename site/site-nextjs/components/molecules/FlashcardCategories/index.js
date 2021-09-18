import Link from "next/link";
import styles from "./styles.module.scss";

export default function FlashcardCategories() {
  const categories = [
    { title: "Infinitive to Conjugations", slug: "infinitive-to-conjugations" },
    { title: "Tense Endings", slug: "tense-endings" },
    { title: "Worksheet", slug: "worksheet" },
  ];

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.slug} className={styles.item}>
            <Link href={`/flashcards/${category.slug}`}>{category.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
