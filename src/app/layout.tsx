import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";

const manrope = Manrope({
  subsets: ["vietnamese", "latin"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["vietnamese", "latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ThS.BS. Trần Minh Dũng - Chuyên khoa Tai Mũi Họng",
  description: "ThS.BS. Trần Minh Dũng với 10 năm kinh nghiệm, chuyên chẩn đoán và điều trị bệnh lý Tai Mũi Họng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} ${inter.variable} antialiased min-h-full flex flex-col bg-surface font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed`}
      >
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
