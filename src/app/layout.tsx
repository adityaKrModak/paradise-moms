import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ApolloProviders } from "./providers";
import StoreProvider from "@/redux/StoreProvider";
import AuthInitializer from "@/components/Auth/AuthInitializer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Paradise Moms - Organic & Natural Products",
  description:
    "Eating organic isn't a trend, it's a return to tradition. Discover nature's way of giving you a delicious combination of organic products.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <StoreProvider>
          <ApolloProviders>
            <AuthInitializer />
            {children}
          </ApolloProviders>
        </StoreProvider>
      </body>
    </html>
  );
}
