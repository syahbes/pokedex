import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/favorites", label: "Favorites" },
  { href: "https://pokeapi.co/", label: "PokeAPI" },
];

export default function Navbar() {
  return (
    <nav className={styles.nav_bar}>
      <Image src="/logo.png" alt="Pokemon" width={220} height={100} />
      <ul className={styles.nav_bar_list}>
        {LINKS.map((link) => (
          <li key={link.href} className={styles.nav_bar_item}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
