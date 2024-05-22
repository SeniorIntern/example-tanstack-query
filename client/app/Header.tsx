import Link from "next/link";

export const Header = () => {
  return (
    <nav className="flex gap-4 bg-primary py-2 px-4 text-white text-xl">
      <Link href="/">Home</Link>
      <Link href="/todos">Todos</Link>
    </nav>
  );
};
