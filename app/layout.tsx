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
      <body className={inter.className + " flex h-dynamic flex-col bg-gray-50"}>
        <header className="container mx-auto p-4 lg:px-0">
          <nav className="flex flex-row items-center justify-between">
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
