import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import cn from "@/utils/cn";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlgoTrain",
  description: "Trainiere deine Algorithmen und Datenstrukturen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={cn(inter.className, 'w-[100vw] h-[100vh] flex flex-col')}>
        <div className="w-full h-[50px] bg-emerald-700 flex items-center px-5 shrink-0">
          <h1 className="text-2xl"><Link href="/">AlgoTrain</Link></h1>
        </div>
        <div className="w-full h-[10px] bg-emerald-900 shrink-0"></div>
        {children}
      </body>
    </html>
  );
}
