import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex gap-4 p-4 shadow bg-white text-sm font-medium border-b">
      <Link href="/">Home</Link>
      <Link href="/chat">Chat</Link>
      <Link href="/emergency">Emergency</Link>
      <Link href="/map">Map</Link>
      <Link href="/history">History</Link>
      <Link href="/settings">Settings</Link>
      <Link href="/faq">FAQ</Link>
      <Link href="/about">About</Link>
      <Link href="/auth/login">Login</Link>
    </nav>
  );
}
