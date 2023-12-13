import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LCCL Cashier App",
  description: "LCCL Cashier App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="pastel" lang="en">
      <body className={nunito.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
