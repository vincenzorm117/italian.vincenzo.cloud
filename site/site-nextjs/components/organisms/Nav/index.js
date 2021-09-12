import Link from "next/link";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();

  const links = [
    {
      title: "Flashcards",
      href: "/flashcards",
      test: (path) => /^\/flashcards/.test(path),
    },
    {
      title: "Reference",
      href: "/reference",
      test: (path) => /^\/reference/.test(path),
    },
  ];

  return (
    <nav className="px-3 py-2 flex bg-green-default">
      <div className={styles.btnGroup}>
        {links.map((link) => (
          <Link key={link.title} href={link.href} as={link.href}>
            <a
              className={
                link.test(router.asPath) ? styles.btnActive : styles.btn
              }
            >
              {link.title}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
