import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pazza",
  description: "For student teacher interaction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
