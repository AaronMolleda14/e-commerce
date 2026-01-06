import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import LayoutClientWrapper from "./layout/LayoutClientWrapper";
import AuthSessionProvider from "./providers/SessionProvider";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'E-commerce',
    template: '%s | E-commerce',
  },
  description: 'Tienda online construida con Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthSessionProvider>
          <CartProvider>
            <LayoutClientWrapper>
              {children}
            </LayoutClientWrapper>
          </CartProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
