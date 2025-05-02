import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import "./globals.css";
import localFont from "next/font/local";
import QueryProvider from "./queryProvider";
import SeasonProvider from "@/hooks/useMyContext";

const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Trendy",
  description: "Where you get all the latest information about new and trending movies",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={satoshi.className}>
        <QueryProvider >
          <Provider>
            <SeasonProvider>
              {children} 
            </SeasonProvider>
          </Provider>
        </QueryProvider>
      </body>
    </html>
  );
}
