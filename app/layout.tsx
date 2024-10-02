import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/themeProvider";

const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "800"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Remi Law Firm",
  description: "A Law Firm Booking App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `min-h-screen text-white bg-dark-300  antialiased font-sora`,
          sora.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
