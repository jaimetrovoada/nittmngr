import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nittmngr",
  description: "A simple app to manage your Nitter feeds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " flex h-dynamic flex-col bg-zinc-900 text-slate-200"
        }
      >
        <header className="border-b border-gray-700 bg-black">
          <nav className="container mx-auto flex flex-row items-center justify-between p-4 lg:px-0">
            <Link href="/" className="text-3xl lg:text-6xl">
              nittmngr
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
