import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Select, { Option } from "@/components/Select/Select";

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
  const options: Option[] = [
    { value: "random", label: "random" },
    { value: "nsfw", label: "nsfw" },
  ];
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col"}>
        <Providers>
          <header>
            <nav className="p-4 flex flex-row justify-between items-center">
              <Link href="/" className="text-3xl lg:text-6xl">
                nittmngr
              </Link>
              <div>
                Instance Type:
                <Select options={options} />
              </div>
            </nav>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
